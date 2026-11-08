export default function Loading() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center py-20"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Modern glowing spinner matching sunset theme */}
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{
            borderColor: "var(--c-gold)",
            borderTopColor: "transparent",
            boxShadow: "0 0 15px rgba(254, 208, 120, 0.2)",
          }}
        />
        <p
          className="text-xs font-medium tracking-wider uppercase animate-pulse"
          style={{ color: "var(--c-muted)" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
