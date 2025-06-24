
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Users, BookOpen, Lightbulb, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  const topics = [
    {
      title: "Understanding Mental Health",
      icon: Brain,
      color: "from-blue-100 to-indigo-100",
      items: [
        "What is mental health?",
        "Common mental health conditions",
        "Signs and symptoms to watch for",
        "The mind-body connection"
      ]
    },
    {
      title: "Self-Care & Wellness",
      icon: Heart,
      color: "from-pink-100 to-rose-100",
      items: [
        "Daily self-care practices",
        "Stress management techniques",
        "Building healthy habits",
        "Sleep and mental health"
      ]
    },
    {
      title: "Supporting Others",
      icon: Users,
      color: "from-green-100 to-emerald-100",
      items: [
        "How to help a friend in crisis",
        "Active listening skills",
        "Recognizing warning signs",
        "When to seek professional help"
      ]
    },
    {
      title: "Treatment Options",
      icon: Shield,
      color: "from-purple-100 to-violet-100",
      items: [
        "Types of therapy",
        "Medication options",
        "Alternative treatments",
        "Finding the right therapist"
      ]
    }
  ];

  const myths = [
    {
      myth: "Mental health problems are a sign of weakness",
      fact: "Mental health conditions are medical conditions, just like diabetes or heart disease. They're not a character flaw or sign of weakness."
    },
    {
      myth: "Therapy is only for 'crazy' people",
      fact: "Therapy is a tool for anyone who wants to improve their mental health, work through challenges, or develop better coping skills."
    },
    {
      myth: "Mental health problems are rare",
      fact: "1 in 5 adults experience mental health issues each year. You're not alone, and help is available."
    },
    {
      myth: "You can just 'snap out of' depression",
      fact: "Mental health conditions require proper treatment and support. They can't be overcome through willpower alone."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/962bfd35-0dab-4e4c-a024-fea4b4ad7ed9.png" 
                alt="Kaleidoscope Logo"
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-stone-700 via-amber-700 to-stone-600 bg-clip-text text-transparent">
                Kaleidoscope
              </span>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-amber-500 text-amber-800 hover:bg-amber-50">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <BookOpen className="w-16 h-16 text-amber-600 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            Learn <span className="bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">More</span>
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Knowledge is power. Understanding mental health helps us take better care of ourselves and support others.
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Explore Mental Health Topics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {topics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${topic.color}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                      <IconComponent className="w-8 h-8" />
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {topic.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                          <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 bg-amber-600 hover:bg-amber-700 text-white w-full">
                      Explore This Topic
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
            Breaking Down <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Myths</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {myths.map((item, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      MYTH
                    </span>
                    <p className="text-gray-700 italic">"{item.myth}"</p>
                  </div>
                  <div>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      FACT
                    </span>
                    <p className="text-gray-800">{item.fact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Recognizing Warning Signs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Emotional Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Persistent sadness or anxiety</li>
                  <li>• Extreme mood swings</li>
                  <li>• Increased irritability</li>
                  <li>• Feelings of hopelessness</li>
                  <li>• Loss of interest in activities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Physical Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Changes in sleep patterns</li>
                  <li>• Appetite changes</li>
                  <li>• Fatigue or low energy</li>
                  <li>• Unexplained aches and pains</li>
                  <li>• Frequent illnesses</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Behavioral Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Social withdrawal</li>
                  <li>• Decline in performance</li>
                  <li>• Increased substance use</li>
                  <li>• Risky behaviors</li>
                  <li>• Difficulty concentrating</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-orange-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Action?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Knowledge is the first step. If you or someone you know needs support, help is available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-support">
              <Button size="lg" className="bg-white text-amber-800 hover:bg-gray-100 px-8 py-3">
                Find Support Now
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
