
import Hero from "@/components/Hero";
import About from "@/components/About";
import MoodTracker from "@/components/MoodTracker";
import AIHelper from "@/components/AIHelper";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <MoodTracker />
      <AIHelper />
      <Resources />
      <Contact />
    </div>
  );
};

export default Index;
