import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // ✅ define it here

export default async function BlogPage() {
  // Fetch all blogs (no slug here)
  const res = await fetch(`${API_URL}/api/articles?populate=image`, {
    cache: "no-store",
  });

  const { data } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
          Our Latest Blogs
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore tutorials, insights, and stories crafted with care.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => {
          const { id, title, description, slug, image } = article;
          const imageUrl = image?.url
            ? `${API_URL}${image.url}`
            : "https://via.placeholder.com/1200x500.png?text=No+Image";

          return (
            <Link
              key={id}
              href={`/blogpost/${slug}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-indigo-600 transition">
                  {title}
                </h2>
                <p className="text-gray-600 flex-grow line-clamp-3">{description}</p>
                <span className="mt-4 inline-block text-indigo-600 font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
