
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      color: "from-red-100 to-pink-100",
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
      color: "from-blue-100 to-purple-100"
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
      color: "from-green-100 to-blue-100"
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
      color: "from-yellow-100 to-orange-100"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Mental Health <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Resources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive resources to support your mental health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${resource.color} ${resource.urgent ? 'ring-2 ring-red-300' : ''}`}>
              <CardHeader>
                <CardTitle className={`text-2xl ${resource.urgent ? 'text-red-700' : 'text-gray-800'} flex items-center gap-2`}>
                  {resource.title}
                  {resource.urgent && <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-full">Urgent</span>}
                </CardTitle>
                <p className="text-gray-600">{resource.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={resource.urgent ? "default" : "outline"}
                  className={resource.urgent ? "bg-red-600 hover:bg-red-700 text-white" : "border-purple-300 text-purple-700 hover:bg-purple-50"}
                >
                  {resource.urgent ? "Get Help Now" : "Learn More"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Remember</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seeking help is a sign of strength, not weakness. You are not alone in this journey, 
            and there are people who care about your well-being and want to help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Resources;
