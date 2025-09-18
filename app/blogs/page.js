import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const res = await fetch("http://localhost:1337/api/articles?populate=image", {
    cache: "no-store",
  });

  const json = await res.json();
  const data = json.data || []; // <-- fallback to empty array

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">No articles found.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-12">
        Latest <span className="text-indigo-600">Blogs</span>
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => {
          const { id, title, description, slug, image } = article;
          const imageUrl = image?.url
            ? `http://localhost:1337${image.url}`
            : "https://via.placeholder.com/600x400.png?text=No+Image";

          return (
            <Link
              key={id}
              href={`/blogpost/${slug}`}
              className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-44">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition">
                  {title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
