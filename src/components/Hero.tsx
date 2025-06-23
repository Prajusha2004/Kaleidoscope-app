
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-yellow-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-amber-400 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-amber-700 mr-4 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-700 via-orange-700 to-yellow-700 bg-clip-text text-transparent">
              Kaleidoscope
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-amber-800 mb-8 font-light">
            Every pattern tells a story. Every story matters.
          </p>
          
          <p className="text-lg text-amber-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Mental health is like a kaleidoscope - complex, beautiful, and constantly changing. 
            We're here to help you see the beauty in every pattern of your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Find Support
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-500 text-amber-800 hover:bg-amber-50 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
