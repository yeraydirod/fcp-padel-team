interface CourtGridBackgroundProps {
  opacity?: number
}

export function CourtGridBackground({ opacity = 0.06 }: CourtGridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          'linear-gradient(to right, var(--color-primary) 2px, transparent 2px), linear-gradient(to bottom, var(--color-primary) 2px, transparent 2px)',
        backgroundSize: '80px 80px',
      }}
    />
  )
}
