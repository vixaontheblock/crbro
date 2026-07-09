export default function Marquee() {
  const names = [
    "SECH",
    "J BALVIN",
    "ROSALÍA",
    "FARRUKO",
    "WISIN & YANDEL",
  ];

  return (
    <section className="collab-strip">
      <div className="container">
        <div className="collab-strip-inner">
          <span className="collab-strip-label">Trusted by</span>
          <div className="collab-strip-names">
            {names.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
