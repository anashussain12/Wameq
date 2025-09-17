import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://enduring-chickens-9db6f070aa.strapiapp.com/admin";

  let data = [];
  try {
    const res = await fetch(`${API_URL}/api/articles?populate=*`);
    const json = await res.json();
    data = json.data || [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 px-2 sm:px-0">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-snug bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block">
          Welcome to Our Blog
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest news, tutorials, and insights. Stay updated with our fresh content on technology, design, and development.
        </p>
      </div>

      {/* Blog Cards */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Latest <span className="text-black">Articles</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => {
          const { id, title, description, slug, cover, author, createdAt } = article;
          const imageUrl = cover?.url
            ? `${API_URL}${cover.url}`
            : "https://via.placeholder.com/400x250.png?text=No+Image";

          return (
            <div
              key={id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              <Image
                width={400}
                height={250}
                src={imageUrl}
                alt={title}
                className="w-full h-48 sm:h-56 object-cover"
              />

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl font-bold text-black mb-2 break-words">
                  {title}
                </h2>
                <p className="text-gray-600 flex-grow line-clamp-3">
                  {description}
                </p>

                {/* Meta Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-medium bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    {author?.name || "Unknown"}
                  </span>
                </div>

                {/* Read More */}
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
    </div>
  );
}
