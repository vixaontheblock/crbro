import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-intro">
          <p className="eyebrow">About</p>

          <h2 className="title">
            Built from Panama.
            <br />
            Heard worldwide.
          </h2>

          <div className="about-photo-frame">
            <Image
              src="/images/crbro-about.jpg"
              alt="CRBRO portrait"
              fill
              sizes="(max-width: 900px) 100vw, 520px"
              className="about-photo"
              priority={false}
            />

            <div className="about-photo-caption">
              <span>CRBRO</span>
              <p>Producer · DJ · Hitmaker</p>
            </div>
          </div>
        </div>

        <div className="editorial-card glass about-card">
          <p className="body">
            CRBRO is a Panamanian producer and DJ behind some of Latin music’s
            most impactful records — working with artists like Sech, J Balvin,
            Rosalía, Farruko and Wisin &amp; Yandel across 1.4B+ combined
            streams.
          </p>

          <p className="body about-body-spaced">
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

          <div className="about-cta">
            <Link href="/#booking" className="btn btn-primary">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}