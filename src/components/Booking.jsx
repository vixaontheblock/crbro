export default function Booking() {
  return (
    <section id="booking" className="section">
      <div className="container booking-grid">
        <div>
          <p className="eyebrow">Booking</p>

          <h2 className="title">
            Let’s create something iconic.
          </h2>

          <p className="body" style={{ marginTop: "26px", maxWidth: "460px" }}>
            For production, DJ sets, studio sessions, collaborations and
            official inquiries.
          </p>

          <div style={{ marginTop: "34px", display: "grid", gap: "12px" }}>
            <a className="body" href="mailto:crbrobooking@gmail.com">
              crbrobooking@gmail.com
            </a>

            <a className="body" href="https://instagram.com/crbro_">
              @crbro_
            </a>
          </div>
        </div>

        <form className="booking-card glass">
          <div className="form-grid">
            <input className="field" type="text" placeholder="Name" />
            <input className="field" type="email" placeholder="Email" />

            <select className="field" defaultValue="">
              <option value="" disabled>
                Inquiry Type
              </option>
              <option>Production</option>
              <option>DJ Set</option>
              <option>Studio Session</option>
              <option>Collaboration</option>
              <option>Press / Media</option>
            </select>

            <textarea
              className="field"
              placeholder="Tell us about the project"
            />

            <button className="btn btn-primary" type="button">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}