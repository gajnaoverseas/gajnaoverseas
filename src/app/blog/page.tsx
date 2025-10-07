import Link from 'next/link';
import Image from 'next/image';
import blogData from '@/data/blogData';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F9F5F0]">
      <div className="pt-32 pb-16 bg-[#F2F7E8]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-semibold mb-6 text-coffee-brown text-center">
            Coffee Knowledge Hub
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-coffee-brown">
            Explore our collection of articles about coffee cultivation, processing, and the unique characteristics of Indian coffee.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <Image 
                  src={post.featureImage} 
                  alt={post.title} 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                <h2 className="text-2xl font-serif mb-3 text-coffee-brown">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="inline-block text-coffee-brown font-medium hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}