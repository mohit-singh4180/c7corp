/** Hub location data for the dotted globe and hubs strip */
export const HUBS = [
  {
    id:      "dubai",
    label:   "Dubai",
    role:    "Business Hub",
    lat:     25.2048,
    lng:     55.2708,
    flag:    "🇦🇪",
    color:   "var(--c-coral)",
  },
  {
    id:      "delhi",
    label:   "Delhi",
    role:    "Engineering Hub",
    lat:     28.6139,
    lng:     77.2090,
    flag:    "🇮🇳",
    color:   "var(--c-gold)",
  },
] as const;

export type Hub = (typeof HUBS)[number];
