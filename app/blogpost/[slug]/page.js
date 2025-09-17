import Image from "next/image";
import Link from "next/link";

export default async function BlogPostPage({ params }) {
  const slug = params?.slug; // optional chaining to avoid crash

  if (!slug) {
    return <div className="text-center py-20">Slug not found 😢</div>;
  }

  // Fetch single article by slug
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const res = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
  const { data } = await res.json();

  if (!data || data.length === 0) {
    return <div className="text-center py-20">Article not found 😢</div>;
  }
  const article = data[0];
  const { id, title, description, createdAt, author, cover, blocks } = article;

  const imageUrl = cover?.url
    ? `http://localhost:1337${cover.url}`
    : "https://via.placeholder.com/800x400.png?text=No+Image";

  // Fetch all articles for related blogs
  // const relatedRes = await fetch(
  //   "http://localhost:1337/api/articles?populate=*&pagination[pageSize]=6"
  // );

const relatedRes = await fetch(
  `${API_URL}/api/articles?populate=*&pagination[pageSize]=6`
);


  const relatedData = await relatedRes.json();
  const relatedBlogs = relatedData.data
    .filter((blog) => blog.id !== id) // exclude current blog
    .slice(0, 3); // show only 3 related blogs

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Blog Article */}
      <article className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent leading-snug inline-block">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-6">
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
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover rounded-xl shadow mb-8"
          width={800}
          height={400}
        />

        {/* Description */}
        <div
          className="prose prose-sm sm:prose-lg max-w-full text-gray-700 leading-relaxed mb-6 break-words"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Content Blocks */}
        <div className="prose prose-sm sm:prose-lg max-w-full break-words">
          {blocks?.map((block ,index) => (
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block">
          Related Blogs
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                <Image
                  src={relatedImg}
                  alt={title}
                  className="w-full h-40 sm:h-48 lg:h-40 object-cover"
                  width={400}
                  height={250}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block">
                    {title}
                  </h3>
                  <p className="text-gray-600 flex-grow line-clamp-3 break-words">
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
