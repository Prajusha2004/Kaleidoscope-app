import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Users, MapPin, Clock, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FindSupport = () => {
  const supportOptions = [
    {
      title: "Crisis Hotlines",
      icon: Phone,
      urgent: true,
      items: [
        { name: "National Suicide Prevention Lifeline", contact: "988", available: "24/7" },
        { name: "Crisis Text Line", contact: "Text HOME to 741741", available: "24/7" },
        { name: "SAMHSA National Helpline", contact: "1-800-662-4357", available: "24/7" },
        { name: "National Sexual Assault Hotline", contact: "1-800-656-4673", available: "24/7" }
      ]
    },
    {
      title: "Text & Chat Support",
      icon: MessageCircle,
      items: [
        { name: "Crisis Text Line", contact: "Text HOME to 741741", available: "24/7" },
        { name: "NAMI HelpLine", contact: "1-800-950-6264", available: "Mon-Fri 10am-10pm EST" },
        { name: "LGBT National Hotline", contact: "1-888-843-4564", available: "Mon-Fri 4pm-12am, Sat 12pm-5pm EST" }
      ]
    },
    {
      title: "Support Groups",
      icon: Users,
      items: [
        { name: "NAMI Support Groups", contact: "Find local groups at nami.org", available: "Varies by location" },
        { name: "Depression and Bipolar Support Alliance", contact: "dbsalliance.org", available: "Online & In-person" },
        { name: "Anxiety and Depression Association", contact: "adaa.org", available: "Online resources" }
      ]
    },
    {
      title: "Find Local Help",
      icon: MapPin,
      items: [
        { name: "Psychology Today Therapist Finder", contact: "psychologytoday.com", available: "Search by location" },
        { name: "SAMHSA Treatment Locator", contact: "findtreatment.gov", available: "Online directory" },
        { name: "Community Health Centers", contact: "findahealthcenter.hrsa.gov", available: "Sliding scale fees" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" aria-label="Return to Kaleidoscope homepage">
              <img 
                src="/lovable-uploads/57b8ac86-d316-4567-b417-d00b7fe1129c.png" 
                alt="Kaleidoscope Logo"
                className="h-8 w-auto"
              />
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-amber-500 text-amber-800 hover:bg-amber-50 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <Heart className="w-16 h-16 text-amber-600 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Find <span className="bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Support</span>
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto mb-8 leading-relaxed">
            You don't have to face this alone. Help is available 24/7, and reaching out is a sign of strength.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-red-800 font-semibold">If you're in immediate danger:</p>
                <p className="text-red-700 text-lg font-bold">Call 911 or go to your nearest emergency room</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Available Support Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${option.urgent ? 'ring-2 ring-red-400 bg-red-50' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl flex items-center gap-3 ${option.urgent ? 'text-red-800' : 'text-amber-900'}`}>
                      <IconComponent className="w-8 h-8" />
                      {option.title}
                      {option.urgent && <span className="text-sm bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium">Urgent</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {option.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="border-l-4 border-amber-300 pl-4 py-3 hover:bg-amber-50/50 transition-colors rounded-r">
                          <h4 className="font-semibold text-amber-900 mb-1">{item.name}</h4>
                          <p className="text-amber-800 font-mono text-lg font-bold">{item.contact}</p>
                          <div className="flex items-center gap-2 text-sm text-amber-700 mt-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{item.available}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Online Therapy</h3>
                <p className="text-amber-800 mb-4">Professional counseling from the comfort of your home</p>
                <ul className="text-left space-y-2 text-amber-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    BetterHelp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Talkspace
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    MDLIVE
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Amwell
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Mental Health Apps</h3>
                <p className="text-amber-800 mb-4">Tools for daily mental wellness support</p>
                <ul className="text-left space-y-2 text-amber-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Headspace
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Calm
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Mood Meter
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Sanvello
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Specialized Support</h3>
                <p className="text-amber-800 mb-4">Targeted help for specific situations</p>
                <ul className="text-left space-y-2 text-amber-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Veterans Crisis Line
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    LGBTQ+ Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Teen Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Addiction Recovery
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindSupport;
