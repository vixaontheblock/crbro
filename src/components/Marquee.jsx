export default function Marquee() {
  const items = [
    "SECH",
    "J BALVIN",
    "ROSALÍA",
    "FARRUKO",
    "WISIN & YANDEL",
    "MUSIC",
    "PANAMA",
    "CRBRO",
  ];

  const row = [...items, ...items];

  return (
    <section className="marquee">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}