const recognitions = [
  {
    value: "1.4B+",
    label: "Streams / Views",
  },
  {
    value: "Multi",
    label: "Platinum Records",
  },
  {
    value: "PA",
    label: "Panama to Global",
  },
  {
    value: "BMI",
    label: "Industry Recognition",
  },
];

export default function Recognition() {
  return (
    <section className="recognition-section">
      <div className="container recognition-grid">
        <div className="section-intro">
          <span className="tag-label">Recognition</span>

          <h2 className="title">
            The sound behind the movement.
          </h2>

          <p className="body recognition-copy">
            From Panama to global Latin music, CRBRO’s credits and creative
            direction connect with records built for cultural impact.
          </p>
        </div>

        <div className="stat-bar glass">
          {recognitions.map((item) => (
            <div className="stat-item" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
