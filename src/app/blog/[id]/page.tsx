import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogData from '@/data/blogData';

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id,
  }));
}

// Define the BlogPostPage component
export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Find the blog post with the matching ID
  const post = blogData.find((post) => post.id === params.id);
  
  // If the post doesn't exist, return a 404 page
  if (!post) {
    notFound();
  }
  
  // Function to convert markdown content to HTML
  const renderMarkdown = (content: string) => {
    // This is a simple implementation - for a real site, use a markdown library
    const htmlContent = content
      .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-serif font-semibold mb-6 text-coffee-brown">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-serif font-semibold mt-8 mb-4 text-coffee-brown">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-serif font-semibold mt-6 mb-3 text-coffee-brown">$1</h3>')
      .replace(/^\- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-800">');
    
    return `<p class="mb-4 text-gray-800">${htmlContent}</p>`;
  };

  return (
    <main className="min-h-screen bg-[#F9F5F0]">
      <div className="pt-32 pb-16 bg-[#F2F7E8]">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-block mb-6 text-coffee-brown hover:underline">
            &larr; Back to all articles
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-coffee-brown">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-6">{post.date}</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 ">
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image 
            src={post.featureImage} 
            alt={post.title} 
            fill 
            className="object-contain"
            priority
          />
        </div>
        
        <article className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-md">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
        </article>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-serif mb-6 text-coffee-brown">Read more articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {blogData
              .filter(relatedPost => relatedPost.id !== post.id)
              .slice(0, 3)
              .map((relatedPost, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={relatedPost.featureImage} 
                      alt={relatedPost.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-1">{relatedPost.date}</p>
                    <h4 className="text-xl font-serif mb-2 text-coffee-brown">{relatedPost.title}</h4>
                    <Link href={`/blog/${relatedPost.id}`} className="text-coffee-brown font-medium hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}