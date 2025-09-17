import Link from "next/link";

export default async function BlogPostPage({ params }) {
  // Fetch single article by slug
  const res = await fetch(
    `http://localhost:1337/api/articles?filters[slug][$eq]=${params.slug}&populate=*`,
    { cache: "no-store" }
  );
  const { data } = await res.json();

  // If no article found
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Article not found 😢
      </div>
    );
  }

  const article = data[0];
  const { id, title, description, createdAt, author, cover, blocks } = article;

  const imageUrl = cover?.url
    ? `http://localhost:1337${cover.url}`
    : "https://via.placeholder.com/800x400.png?text=No+Image";

  // Fetch all articles for related blogs
  const relatedRes = await fetch(
    "http://localhost:1337/api/articles?populate=*&pagination[pageSize]=6",
    { cache: "no-store" }
  );
  const relatedData = await relatedRes.json();
  const relatedBlogs = relatedData.data
    .filter((blog) => blog.id !== id) // exclude current blog
    .slice(0, 3); // show only 3 related blogs

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Blog Article */}
      <article className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent leading-snug inline-block">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="font-medium bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {author?.name || "Unknown Author"}
          </span>
        </div>

        {/* Cover Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-9/12 object-cover rounded-xl shadow mb-8"
        />

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Content Blocks */}
        <div className="prose max-w-none">
          {blocks?.map((block, index) => (
            <div key={index}>
              {block.__component === "shared.rich-text" && (
                <div dangerouslySetInnerHTML={{ __html: block.body }} />
              )}
            </div>
          ))}
        </div>
      </article>

      {/* Related Blogs */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block">
          Related Blogs
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedBlogs.map((blog) => {
            const { id, title, slug, description, cover } = blog;
            const relatedImg = cover?.url
              ? `http://localhost:1337${cover.url}`
              : "https://via.placeholder.com/400x250.png?text=No+Image";

            return (
              <div
                key={id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <img
                  src={relatedImg}
                  alt={title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block">
                    {title}
                  </h3>
                  <p className="text-gray-600 flex-grow line-clamp-3">
                    {description}
                  </p>
                  <Link
                    href={`/blogpost/${slug}`}
                    className="mt-4 inline-block bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-center hover:opacity-90 transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
