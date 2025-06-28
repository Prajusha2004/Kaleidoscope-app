
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Resources = () => {
  const resources = [
    {
      title: "Crisis Support",
      description: "Immediate help when you need it most. Available 24/7.",
      items: [
        "National Suicide Prevention Lifeline: 988",
        "Crisis Text Line: Text HOME to 741741",
        "SAMHSA National Helpline: 1-800-662-4357"
      ],
      color: "from-red-100 to-orange-100",
      urgent: true
    },
    {
      title: "Mental Health Resources",
      description: "Professional support and treatment options.",
      items: [
        "Find a therapist in your area",
        "Online therapy platforms",
        "Support groups and communities",
        "Mental health apps and tools"
      ],
      color: "from-amber-100 to-orange-100"
    },
    {
      title: "Self-Care & Wellness",
      description: "Tools and techniques for daily mental wellness.",
      items: [
        "Mindfulness and meditation guides",
        "Stress management techniques",
        "Sleep hygiene tips",
        "Exercise and mental health"
      ],
      color: "from-yellow-100 to-amber-100"
    },
    {
      title: "Educational Content",
      description: "Learn more about mental health conditions and treatments.",
      items: [
        "Understanding anxiety and depression",
        "Recognizing warning signs",
        "How to support a loved one",
        "Myths vs. facts about mental health"
      ],
      color: "from-orange-100 to-yellow-100"
    }
  ];

  return (
    <section className="py-20 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Mental Health <span className="bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Resources</span>
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Access comprehensive resources to support your mental health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${resource.color} ${resource.urgent ? 'ring-2 ring-red-400' : ''}`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${resource.urgent ? 'text-red-800' : 'text-amber-900'} flex items-center gap-2`}>
                  {resource.title}
                  {resource.urgent && <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-full">Urgent</span>}
                </CardTitle>
                <p className="text-amber-800">{resource.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-amber-900">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                {resource.urgent ? (
                  <Link to="/find-support">
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white w-full"
                    >
                      Get Help Now
                    </Button>
                  </Link>
                ) : (
                  <Link to="/learn-more">
                    <Button 
                      variant="outline"
                      className="border-amber-600 text-amber-900 hover:bg-amber-50 w-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-amber-50 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">Remember</h3>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Seeking help is a sign of strength, not weakness. You are not alone in this journey, 
            and there are people who care about your well-being and want to help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Resources;
