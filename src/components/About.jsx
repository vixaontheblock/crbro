import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">About</p>

          <h2 className="title">
            Built from Panama.
            <br />
            Heard worldwide.
          </h2>
        </div>

        <div className="editorial-card glass">
          <p className="body">
            CRBRO is a Panamanian producer and DJ behind some of Latin musics
            most impactful records — working with artists like Sech, J Balvin,
            Rosalía, Farruko and Wisin &amp; Yandel across 1.4B+ combined streams.
          </p>

          <p className="body" style={{ marginTop: "22px" }}>
            The focus has always been the same: create sound that feels
            cinematic, memorable and built for global impact. Not a genre — a
            standard.
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

          <div style={{ marginTop: "32px" }}>
            <Link href="/#booking" className="btn btn-primary">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
