const Loading = () => {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d1a14]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="h-4 w-40 animate-pulse rounded-full bg-[#efe2da]" />

        <div className="mt-8 animate-pulse rounded-[38px] border border-[#ead7cb] bg-white/70 p-8">
          <div className="h-4 w-48 rounded-full bg-[#efe2da]" />
          <div className="mt-4 h-12 max-w-3xl rounded-2xl bg-[#efe2da]" />
          <div className="mt-4 h-4 max-w-2xl rounded-full bg-[#f5ebe5]" />
          <div className="mt-8 h-16 rounded-full bg-[#f5ebe5]" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <div className="animate-pulse rounded-[30px] border border-[#ead9cf] bg-white p-6">
          <div className="h-4 w-32 rounded-full bg-[#efe2da]" />
          <div className="mt-6 h-12 rounded-2xl bg-[#f5ebe5]" />
          <div className="mt-4 h-24 rounded-[24px] bg-[#f5ebe5]" />
        </div>

        <div className="space-y-6">
          <div className="animate-pulse rounded-[30px] border border-[#ead9cf] bg-white p-6">
            <div className="h-4 w-40 rounded-full bg-[#efe2da]" />
            <div className="mt-4 h-8 w-80 rounded-2xl bg-[#f5ebe5]" />
            <div className="mt-4 h-4 max-w-3xl rounded-full bg-[#f5ebe5]" />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-[30px] border border-[#ead9cf] bg-white"
              >
                <div className="aspect-[4/3] bg-[#f5ebe5]" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 rounded-full bg-[#efe2da]" />
                  <div className="h-6 w-4/5 rounded-2xl bg-[#f5ebe5]" />
                  <div className="h-4 w-full rounded-full bg-[#f5ebe5]" />
                  <div className="h-4 w-2/3 rounded-full bg-[#f5ebe5]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
