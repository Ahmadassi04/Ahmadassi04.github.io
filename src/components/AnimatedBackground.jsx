export default function AnimatedBackground() {
  return (
    <div className="animated-background fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="animated-background__wash" />
      <div className="animated-background__grid" />
      <div className="animated-background__particles animated-background__particles--near" />
      <div className="animated-background__particles animated-background__particles--far" />
      <div className="animated-background__signal animated-background__signal--one" />
      <div className="animated-background__signal animated-background__signal--two" />
    </div>
  );
}
