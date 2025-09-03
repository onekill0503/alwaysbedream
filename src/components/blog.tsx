import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    description: "Learn the best practices for creating maintainable and scalable React applications with modern tools and techniques.",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop&crop=center",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    id: 2,
    title: "The Future of Web Development",
    description: "Exploring upcoming trends and technologies that will shape the future of web development.",
    date: "March 12, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
    className: "",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Essential design principles every developer should know to create better user experiences.",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop&crop=center",
    className: "",
  },
  {
    id: 4,
    title: "Performance Optimization Tips",
    description: "Practical techniques to improve your web application's performance and user experience.",
    date: "March 8, 2024",
    readTime: "7 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    id: 5,
    title: "Getting Started with TypeScript",
    description: "A beginner's guide to TypeScript and how it can improve your JavaScript development workflow.",
    date: "March 5, 2024",
    readTime: "4 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop&crop=center",
    className: "",
  },
];

const BlogHeader = ({ image, category }: { image: string; category: string }) => (
  <div className="relative w-full h-28 sm:h-32 mb-3 sm:mb-4 overflow-hidden rounded-lg">
    <img
      src={image}
      alt="Blog post"
      className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
    />
    <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2">
      <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
        {category}
      </span>
    </div>
  </div>
);

const BlogMeta = ({ date, readTime }: { date: string; readTime: string }) => (
  <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-400">
    <div className="flex items-center space-x-1">
      <CalendarDays className="w-3 h-3" />
      <span>{date}</span>
    </div>
    <div className="flex items-center space-x-1">
      <Clock className="w-3 h-3" />
      <span>{readTime}</span>
    </div>
  </div>
);

export default function Blog() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto px-4">
            Discover insights, tutorials, and thoughts on web development, design, and technology
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <BentoGridItem
              key={post.id}
              title={
                <div className="flex items-center justify-between">
                  <span className="text-lg">{post.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-200" />
                </div>
              }
              description={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{post.description}</p>
                  <BlogMeta date={post.date} readTime={post.readTime} />
                </div>
              }
              header={<BlogHeader image={post.image} category={post.category} />}
              className={`${post.className} cursor-pointer hover:shadow-2xl transition-all duration-300`}
            />
          ))}
        </BentoGrid>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            View All Posts
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}