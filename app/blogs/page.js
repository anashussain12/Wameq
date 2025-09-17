import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const res = await fetch("http://localhost:1337/api/articles?populate=*");

  const { data } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 leading-snug bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block">
          Welcome to Our Blog
        </h1>


        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest news, tutorials, and insights.
          Stay updated with our fresh content on technology, design, and development.
        </p>
      </div>

      {/* Blog Cards */}
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Latest <span className="text-black">Articles</span>
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => {
          const { id, title, description, slug, cover, author, createdAt } = article;

          const imageUrl = cover?.url
            ? `http://localhost:1337${cover.url}`
            : "https://via.placeholder.com/400x250.png?text=No+Image";

          return (
            <div
              key={id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              <Image
              width={200}
              height={200}
                src={imageUrl}
                alt={title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className=" text-xl font-bold text-black mb-2 ">
                  {title}
                </h2>
                <p className="text-gray-600 flex-grow">{description}</p>

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
                  href={`/blogpost/${article.slug}`}
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
