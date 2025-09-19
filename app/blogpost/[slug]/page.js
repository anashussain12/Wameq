// app/blogpost/[slug]/page.js
import Image from "next/image";
import React from "react";

// Helper to render rich content from Strapi
const renderContent = (content) => {
  if (!content) return null;

  return content.map((block, index) => {
    const children = block.children?.map((child, i) => {
      let text = child.text;

      // Inline formatting
      if (child.bold) text = <strong key={i}>{text}</strong>;
      if (child.italic) text = <em key={i}>{text}</em>;
      if (child.underline) text = <u key={i}>{text}</u>;
      if (child.href) text = (
        <a key={i} href={child.href} className="text-indigo-600 underline">
          {text}
        </a>
      );

      return text;
    });

    // Block types
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 text-gray-700">
            {children}
          </p>
        );
      case "heading1":
        return (
          <h1 key={index} className="text-4xl font-bold mb-4">
            {children}
          </h1>
        );
      case "heading2":
        return (
          <h2 key={index} className="text-3xl font-semibold mb-4">
            {children}
          </h2>
        );
      case "heading3":
        return (
          <h3 key={index} className="text-2xl font-semibold mb-3">
            {children}
          </h3>
        );
      case "list-item":
        return (
          <li key={index} className="ml-6 list-disc mb-2">
            {children}
          </li>
        );
      default:
        return null;
    }
  });
};

export default async function BlogPostPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `https://determined-success-d23d66e1df.strapiapp.com/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p className="text-center text-red-500">Failed to load blog post.</p>;
  }

  const { data } = await res.json();

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">Blog post not found.</p>;
  }

  const blog = data[0];
  const { title, description, content, author, image } = blog;

  const imageUrl = image?.url
    ? image.url
    : "https://via.placeholder.com/1200x500.png?text=No+Image";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">By {author || "Unknown"}</p>

      <div className="relative w-full h-96 mb-8">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="prose max-w-none">
        {renderContent(content)}
      </div>
    </div>
  );
}
