import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const res = await fetch("http://localhost:1337/api/articles?populate=image", {
    cache: "no-store",
  });
  const { data } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12">
        Latest <span className="text-indigo-600">Blogs</span>
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => {
          const { title, description, slug, image } = article;

          // Strapi image URL (with backend base URL)
          const imageUrl = image?.url
            ? `http://localhost:1337${image.url}`
            : null;

          return (
            <Link
              key={slug}
              href={`/blogpost/${slug}`}
              className="group block rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 bg-white"
            >
              {/* Show image if exists */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {title.charAt(0)}
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-indigo-600 transition">
                  {title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{description}</p>
                <span className="mt-4 inline-block text-indigo-600 font-medium">
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
