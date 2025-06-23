
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Heart className="w-16 h-16 text-pink-300 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            You're Not Alone
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every story matters. Every person matters. If you're struggling, 
            please reach out for support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
              <div className="space-y-3 text-gray-200">
                <p><strong>Suicide Prevention Lifeline:</strong> 988</p>
                <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                <p><strong>Emergency:</strong> 911</p>
              </div>
              <Button className="mt-6 bg-red-600 hover:bg-red-700 text-white">
                Get Help Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">General Support</h3>
              <div className="space-y-3 text-gray-200">
                <p><strong>NAMI Helpline:</strong> 1-800-950-6264</p>
                <p><strong>SAMHSA:</strong> 1-800-662-4357</p>
                <p><strong>Email:</strong> support@kaleidoscope.org</p>
              </div>
              <Button variant="outline" className="mt-6 border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">A Message of Hope</h3>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              "Just like a kaleidoscope, your life may seem fragmented right now, 
              but those pieces can come together to create something beautiful. 
              Healing takes time, and it's okay to take it one day at a time."
            </p>
            <p className="text-sm text-gray-300 italic">
              — The Kaleidoscope Community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
