const workModes = [
  {
    title: "Production",
    description:
      "Original records, beat direction, sonic identity and production for artists building a serious sound.",
    tag: "01",
  },
  {
    title: "DJ Sets",
    description:
      "Curated live energy for clubs, private events, festivals and brand experiences.",
    tag: "02",
  },
  {
    title: "Studio Sessions",
    description:
      "Creative sessions focused on hooks, rhythm, atmosphere and records with replay value.",
    tag: "03",
  },
  {
    title: "Creative Direction",
    description:
      "Helping artists define the sound, mood and musical direction behind a project.",
    tag: "04",
  },
];

export default function WorkModes() {
  return (
    <section className="work-section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Work Modes</p>

            <h2 className="title">
              Built for records, sessions and stages.
            </h2>
          </div>

          <p className="body" style={{ maxWidth: "430px" }}>
            CRBRO’s work moves across production, live energy, studio direction
            and artist-focused sound design.
          </p>
        </div>

        <div className="work-grid">
          {workModes.map((item) => (
            <article className="work-card" key={item.title}>
              <div className="work-card-top">
                <span>{item.tag}</span>
                <span>CRBRO</span>
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}