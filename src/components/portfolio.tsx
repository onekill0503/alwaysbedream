import { HeroParallax } from "./ui/hero-parallax";

const portfolioProjects = [
  {
    title: "E-Commerce Platform",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Task Management App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Social Media Dashboard",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Real Estate Website",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Food Delivery App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Fitness Tracking App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Banking Dashboard",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Learning Management System",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Travel Booking Platform",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Music Streaming App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Portfolio Website",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Weather App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Chat Application",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "CRM System",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center",
  },
  {
    title: "Video Conference App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600&h=400&fit=crop&crop=center",
  },
];

export default function Portfolio() {
  return (
    <section className="bg-white dark:bg-neutral-900">
      <HeroParallax products={portfolioProjects} />
    </section>
  );
}