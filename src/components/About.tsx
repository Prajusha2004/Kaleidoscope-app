
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Smile, SmilePlus } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We believe in treating every individual with kindness, empathy, and understanding."
    },
    {
      icon: Smile,
      title: "Hope",
      description: "Mental health challenges are temporary. Recovery and healing are always possible."
    },
    {
      icon: SmilePlus,
      title: "Growth",
      description: "Every experience, even difficult ones, can contribute to personal growth and resilience."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Kaleidoscope</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Just as a kaleidoscope transforms broken glass into beautiful patterns, 
            we believe that every aspect of your mental health journey can contribute 
            to a more complete and beautiful you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <value.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To create a supportive community where mental health is openly discussed, 
            stigma is reduced, and everyone feels empowered to seek help when needed. 
            We provide resources, support, and hope to those navigating their mental health journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
