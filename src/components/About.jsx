export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">About</p>

          <h2 className="title">
            Built from Panama. Heard worldwide.
          </h2>
        </div>

        <div className="editorial-card glass">
          <p className="body">
            CRBRO is a Panamanian producer and DJ shaping the sound of Latin
            music through rhythm, atmosphere and high-level collaborations.
          </p>

          <p className="body" style={{ marginTop: "22px" }}>
            From studio sessions to global records, the focus is simple: create
            sound that feels cinematic, memorable and built for impact.
          </p>

          <div className="capabilities">
            <div className="capability">
              <strong>Production</strong>
              <span>Records / Singles</span>
            </div>

            <div className="capability">
              <strong>DJ Sets</strong>
              <span>Events / Clubs</span>
            </div>

            <div className="capability">
              <strong>Studio Sessions</strong>
              <span>Artists / Labels</span>
            </div>

            <div className="capability">
              <strong>Creative Direction</strong>
              <span>Artist Sound</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}