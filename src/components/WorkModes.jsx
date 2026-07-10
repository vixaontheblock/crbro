const workModes = [
  {
    title: "Production",
    description:
      "Original records, beat direction, sonic identity and production for artists building a serious sound.",
  },
  {
    title: "DJ Sets",
    description:
      "Curated live energy for clubs, private events, festivals and brand experiences.",
  },
  {
    title: "Studio Sessions",
    description:
      "Creative sessions focused on hooks, rhythm, atmosphere and records with replay value.",
  },
  {
    title: "Creative Direction",
    description:
      "Helping artists define the sound, mood and musical direction behind a project.",
  },
];

export default function WorkModes() {
  return (
    <section className="work-section">
      <div className="container">
        <div className="section-head">
          <div className="section-intro">
            <span className="tag-label">Work Modes</span>

            <h2 className="title">
              Built for records, sessions and stages.
            </h2>
          </div>

          <div className="section-head-aside">
            <p className="body">
              CRBRO’s work moves across production, live energy, studio direction
              and artist-focused sound design.
            </p>
          </div>
        </div>

        <div className="work-grid">
          {workModes.map((item) => (
            <article className="work-card" key={item.title}>
              <div className="work-card-top">CRBRO</div>

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
