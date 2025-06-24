
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-stone-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-amber-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-stone-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-amber-400 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/57b8ac86-d316-4567-b417-d00b7fe1129c.png" 
              alt="Kaleidoscope - Mental Health Support"
              className="w-32 h-auto max-w-sm mx-auto"
            />
          </div>
          
          <p className="text-xl md:text-2xl text-amber-800 mb-8 font-light">
            Every pattern tells a story. Every story matters.
          </p>
          
          <p className="text-lg text-amber-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Mental health is like a kaleidoscope - complex, beautiful, and constantly changing. 
            We're here to help you see the beauty in every pattern of your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/find-support" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white px-10 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label="Find mental health support resources"
              >
                Find Support
              </Button>
            </Link>
            <Link to="/learn-more" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-amber-500 text-amber-800 hover:bg-amber-50 px-10 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label="Learn more about mental health"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
