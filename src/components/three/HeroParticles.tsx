"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────
   HeroParticles — Celestial stardust & subtle sky rings.
   Features:
   • 3 delicate, smaller gradient orbital rings in the high sky
   • Ambient particle dust field (subtle twinkling stardust)
   • Mouse-reactive parallax camera
   • Auto-resize & reduced-motion awareness
   ───────────────────────────────────────────────────── */

/* ── 3 Sky rings positioned safely in the upper celestial sky ── */
interface SkyRingConfig {
  pos: [number, number, number];
  color: string;
  coreRadius: number;
  innerRing: [number, number]; // [inner, outer]
  outerRing?: [number, number];
  tilt: [number, number];
}

const SKY_RINGS: SkyRingConfig[] = [
  {
    // Ring 1: High in the upper-right sky above Delhi
    pos: [2.7, 2.1, -1.0],
    color: "#f5be6c", // warm radiant gold
    coreRadius: 0.05,
    innerRing: [0.14, 0.17],
    outerRing: [0.22, 0.25],
    tilt: [Math.PI * 0.38, 0.4],
  },
  {
    // Ring 2: High in the upper-left sky above the title
    pos: [-2.9, 2.4, -1.2],
    color: "#a855f7", // soft amethyst violet
    coreRadius: 0.045,
    innerRing: [0.13, 0.16],
    outerRing: [0.20, 0.23],
    tilt: [Math.PI * 0.45, -0.3],
  },
  {
    // Ring 3: High in the upper-center sky between the hubs
    pos: [0.7, 2.65, -1.5],
    color: "#ff7a59", // warm celestial coral
    coreRadius: 0.04,
    innerRing: [0.12, 0.15],
    outerRing: [0.19, 0.22],
    tilt: [Math.PI * 0.4, 0.6],
  },
];

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Respect reduced-motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 80 : 180;
    const xMult = isMobile ? 0.42 : 1.0;
    const yOffset = isMobile ? 0.35 : 0;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    /* ── Sky gradient rings (small, delicate, high in the sky) ── */
    const sphereGeom = new THREE.SphereGeometry(1, 20, 20);

    interface SkyRingData {
      group: THREE.Group;
      basePos: THREE.Vector3;
      phase: number;
      rings: THREE.Mesh[];
      glow: THREE.Mesh;
      baseGlowScale: number;
    }

    const ringObjects: SkyRingData[] = [];

    SKY_RINGS.forEach((cfg, i) => {
      const group = new THREE.Group();
      const posX = cfg.pos[0] * xMult;
      const posY = cfg.pos[1] + yOffset;
      const posZ = cfg.pos[2];
      group.position.set(posX, posY, posZ);

      const color = new THREE.Color(cfg.color);

      // Core sphere
      const coreMat = new THREE.MeshBasicMaterial({ color });
      const core = new THREE.Mesh(sphereGeom, coreMat);
      core.scale.setScalar(cfg.coreRadius);
      group.add(core);

      // Soft glow halo
      const glowMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22,
      });
      const glow = new THREE.Mesh(sphereGeom, glowMat);
      const baseGlowScale = cfg.coreRadius * 3.4;
      glow.scale.setScalar(baseGlowScale);
      group.add(glow);

      const rings: THREE.Mesh[] = [];

      // Inner orbital ring
      const innerGeom = new THREE.RingGeometry(
        cfg.innerRing[0],
        cfg.innerRing[1],
        48
      );
      const innerMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.42,
        side: THREE.DoubleSide,
      });
      const innerRing = new THREE.Mesh(innerGeom, innerMat);
      innerRing.rotation.x = cfg.tilt[0];
      innerRing.rotation.y = cfg.tilt[1];
      group.add(innerRing);
      rings.push(innerRing);

      // Outer orbital ring
      if (cfg.outerRing) {
        const outerGeom = new THREE.RingGeometry(
          cfg.outerRing[0],
          cfg.outerRing[1],
          48
        );
        const outerMat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.24,
          side: THREE.DoubleSide,
        });
        const outerRing = new THREE.Mesh(outerGeom, outerMat);
        outerRing.rotation.x = cfg.tilt[0];
        outerRing.rotation.y = cfg.tilt[1];
        group.add(outerRing);
        rings.push(outerRing);
      }

      scene.add(group);

      ringObjects.push({
        group,
        basePos: new THREE.Vector3(posX, posY, posZ),
        phase: i * 1.5,
        rings,
        glow,
        baseGlowScale,
      });
    });

    /* ── Particle dust field (instanced) ── */
    const particleGeom = new THREE.SphereGeometry(0.015, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f1e2d3"),
      transparent: true,
      opacity: 0.55,
    });
    const instancedParticles = new THREE.InstancedMesh(
      particleGeom,
      particleMat,
      particleCount
    );
    scene.add(instancedParticles);

    const particlesData = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 8 - 2,
      speed: 0.08 + Math.random() * 0.25,
      offset: Math.random() * Math.PI * 2,
      scale: 0.3 + Math.random() * 0.8,
    }));
    const dummy = new THREE.Object3D();

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── Resize ── */
    const onResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* Camera parallax — smooth lerp */
      targetCam.x += (mouse.x * 0.3 - targetCam.x) * 0.025;
      targetCam.y += (mouse.y * 0.2 - targetCam.y) * 0.025;
      camera.position.x = targetCam.x;
      camera.position.y = targetCam.y;
      camera.lookAt(0, 0, 0);

      /* Sky rings animation: subtle floating & slow orbital rotation */
      ringObjects.forEach((ro) => {
        const p = ro.phase;
        ro.group.position.x = ro.basePos.x + Math.sin(t * 0.35 + p) * 0.08;
        ro.group.position.y =
          ro.basePos.y + Math.sin(t * 0.5 + p * 0.7) * 0.06;
        ro.group.position.z =
          ro.basePos.z + Math.cos(t * 0.3 + p * 1.1) * 0.04;

        // Pulse glow
        const glowPulse =
          ro.baseGlowScale * (1 + Math.sin(t * 0.8 + p * 2) * 0.15);
        ro.glow.scale.setScalar(glowPulse);

        // Slow orbital ring rotation
        ro.rings.forEach((r, idx) => {
          r.rotation.z += 0.0015 * (idx === 0 ? 1 : -0.7);
        });
      });

      /* Particle field */
      particlesData.forEach((p, i) => {
        dummy.position.set(
          p.x + Math.sin(t * p.speed + p.offset) * 0.4,
          p.y + Math.cos(t * p.speed * 0.6 + p.offset) * 0.3,
          p.z + Math.sin(t * 0.2 + p.offset * 2) * 0.15
        );
        const twinkle = p.scale * (0.7 + Math.sin(t * 1.5 + p.offset * 3) * 0.3);
        dummy.scale.setScalar(twinkle);
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      });
      instancedParticles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      sphereGeom.dispose();
      particleGeom.dispose();
      particleMat.dispose();

      ringObjects.forEach((ro) => {
        ro.group.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else if (obj.material) {
              obj.material.dispose();
            }
          }
        });
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ pointerEvents: "none", opacity: 0.85 }}
    />
  );
}
