export default async function BlogPostPage({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${params.slug}`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const article = json.data[0];

  if (!article) {
    return <h1 className="text-center text-2xl mt-20">Article not found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        {article.title}
      </h1>

      {/* Author + Date */}
      <div className="flex items-center gap-3 text-gray-500 text-sm mb-8">
        <span className="font-medium">By {article.author || "Admin"}</span>
        <span>•</span>
        <span>
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Hero Banner */}
      <div className="h-64 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl mb-8 flex items-center justify-center text-white text-2xl font-bold">
        {article.title.charAt(0)}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {article.description}
        {article.description}
      </p>
    </div>
  );
}
