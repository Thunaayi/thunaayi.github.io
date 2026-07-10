export function MonogramAvatar({ name, size = "large" }: { name: string; size?: "small" | "large" }) {
  const initial = name.charAt(0).toUpperCase();
  const dimensions = size === "large" ? "h-16 w-16 md:h-20 md:w-20" : "h-10 w-10";
  const fontSize = size === "large" ? "text-2xl md:text-3xl" : "text-lg";

  return (
    <div
      className={`flex items-center justify-center rounded-[var(--card-radius)] ${dimensions} font-bold ${fontSize} select-none`}
      style={{ backgroundColor: "var(--accent-blue)" }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}