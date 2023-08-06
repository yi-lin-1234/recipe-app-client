function Error({ error }: { error: any }) {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">
          {error.response.status}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {error.response.data.message}
        </h1>
      </div>
    </main>
  );
}

export default Error;
