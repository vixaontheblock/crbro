export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">

      <div className="mx-auto max-w-5xl">

        <p className="text-xs tracking-[0.4em] text-neutral-500">
          BOOKING
        </p>

        <h1 className="mt-6 text-6xl font-black leading-none md:text-8xl">
          WORK WITH CRBRO.
        </h1>

        <form className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

          <div className="grid gap-5">

            <input
              type="text"
              placeholder="Name"
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 outline-none"
            />

            <textarea
              rows="6"
              placeholder="Tell us about the project"
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4 outline-none"
            />

            <button
              className="rounded-full bg-white px-8 py-4 text-sm font-black text-black"
            >
              SEND REQUEST
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}