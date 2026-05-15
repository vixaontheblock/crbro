export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-32 text-black">
      <div className="mx-auto max-w-7xl">

        <p className="text-xs tracking-[0.4em] text-neutral-500">
          CREDITS
        </p>

        <h1 className="mt-6 text-6xl font-black leading-none md:text-8xl">
          SELECTED WORKS.
        </h1>

        <div className="mt-20 grid gap-4 md:grid-cols-3">

          {[
            "RELACIÓN REMIX",
            "LA LUZ",
            "GIRL LIKE YOU",
            "911 REMIX",
            "SAL Y PERREA",
            "LLUEVE",
          ].map((track) => (

            <div
              key={track}
              className="rounded-[2rem] border border-black/10 bg-neutral-100 p-6"
            >
              <h3 className="text-3xl font-black">
                {track}
              </h3>

              <p className="mt-4 text-neutral-500">
                Production Credit
              </p>
            </div>

          ))}

        </div>
      </div>
    </main>
  );
}