export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      <div className="text-center">

        <p className="text-xs tracking-[0.4em] text-neutral-500">
          CONTACT
        </p>

        <h1 className="mt-6 text-6xl font-black md:text-8xl">
          LET’S TALK.
        </h1>

        <div className="mt-12 space-y-4">

          <a
            href="mailto:crbrobooking@gmail.com"
            className="block text-xl text-neutral-300"
          >
            crbrobooking@gmail.com
          </a>

          <a
            href="https://instagram.com/crbro_"
            className="block text-xl text-neutral-300"
          >
            @crbro_
          </a>

        </div>

      </div>

    </main>
  );
}