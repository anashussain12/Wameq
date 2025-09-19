import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = process.env.NEXT_PUBLIC_API_URL;


function renderRichText(content) {
  if (!content) return null;

  return content.map((block, i) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={i} className="mb-5 text-gray-700 leading-relaxed">
            {block.children.map((child, j) => {
              if (child.bold) return <strong key={j}>{child.text}</strong>;
              if (child.italic) return <em key={j}>{child.text}</em>;
              return child.text;
            })}
          </p>
        );
      case "list":
        const ListTag = block.format === "unordered" ? "ul" : "ol";
        return (
          <ListTag
            key={i}
            className={`pl-6 mb-5 space-y-2 text-gray-700 ${block.format === "unordered" ? "list-disc" : "list-decimal"
              }`}
          >
            {block.children.map((li, j) => (
              <li key={j}>{li.children.map((c) => c.text)}</li>
            ))}
          </ListTag>
        );
      default:
        return null;
    }
  });
}

export default async function BlogPostPage({ params }) {
  const res = await fetch(
    `${API_URL}/api/articles?filters[slug][$eq]=${params.slug}&populate=image`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const data = json.data || [];
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-20">Blog not found.</p>;
  }

  const article = data[0]; // safe now
  const { id, title, description, content, image, author, createdAt } = article;

  const imageUrl = image?.url
    ? `${API_URL}${image.url}`
    : "https://via.placeholder.com/1200x500.png?text=No+Image";

  // Fetch related blogs excluding current one
  const relatedRes = await fetch(
    `${API_URL}/api/articles?filters[id][$ne]=${id}&pagination[limit]=3&populate=image`,
    { cache: "no-store" }
  );
  const relatedJson = await relatedRes.json();
  const relatedBlogs = relatedJson.data || [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Image */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg mb-10">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Title & Meta */}
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{title}</h1>
      <p className="text-lg text-gray-600 mb-6">{description}</p>

      <div className="flex items-center justify-between mb-12 text-sm text-gray-500">
        <span>✍️ {author || "Anonymous"}</span>
        <span>
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Rich Content */}
      <article className="prose prose-lg max-w-none mb-16">
        {renderRichText(content)}
      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Related Blogs
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((blog) => {
              const { id, title, description, slug, image } = blog;
              const relatedImage = image?.url
                ? `${API_URL}${image.url}`
                : "https://via.placeholder.com/600x400.png?text=No+Image";
              return (
                <Link
                  key={id}
                  href={`/blogpost/${slug}`}
                  className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-44">
                    <Image
                      src={relatedImage}
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
      )}
    </div>
  );
}
