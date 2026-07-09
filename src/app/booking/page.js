import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <main className="site-main">
      <Navbar />

      <section className="section" style={{ paddingTop: "180px" }}>
        <div className="container">
          <div className="section-intro">
            <span className="kicker">Booking</span>
            <h1 className="title">Work with CRBRO.</h1>
          </div>

          <form className="booking-card glass" style={{ marginTop: "56px", maxWidth: "620px" }}>
            <div className="form-grid">
              <input className="field" type="text" placeholder="Name" />
              <input className="field" type="email" placeholder="Email" />
              <textarea
                className="field"
                rows="6"
                placeholder="Tell us about the project"
              />
              <button className="btn btn-primary" type="submit">
                Send Request
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
