
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <img 
            src="/lovable-uploads/57b8ac86-d316-4567-b417-d00b7fe1129c.png" 
            alt="Kaleidoscope Logo" 
            className="w-24 h-auto mx-auto mb-6 opacity-80"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            You're Not Alone
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto leading-relaxed">
            Every story matters. Every person matters. If you're struggling, 
            please reach out for support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-8 h-8 text-red-300" />
                <h3 className="text-2xl font-bold">Emergency Support</h3>
              </div>
              <div className="space-y-4 text-amber-200">
                <div className="border-l-4 border-red-400 pl-4">
                  <p className="font-semibold text-red-200">Suicide Prevention Lifeline</p>
                  <p className="text-2xl font-bold">988</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <p className="font-semibold text-red-200">Crisis Text Line</p>
                  <p className="text-xl font-bold">Text HOME to 741741</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <p className="font-semibold text-red-200">Emergency</p>
                  <p className="text-2xl font-bold">911</p>
                </div>
              </div>
              <Button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg">
                Get Help Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-8 h-8 text-amber-300" />
                <h3 className="text-2xl font-bold">General Support</h3>
              </div>
              <div className="space-y-4 text-amber-200">
                <div className="border-l-4 border-amber-400 pl-4">
                  <p className="font-semibold">NAMI Helpline</p>
                  <p className="text-xl font-bold">1-800-950-6264</p>
                  <p className="text-sm text-amber-300">Mon-Fri 10am-10pm EST</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <p className="font-semibold">SAMHSA</p>
                  <p className="text-xl font-bold">1-800-662-4357</p>
                  <p className="text-sm text-amber-300">24/7 Treatment Referral</p>
                </div>
                <div className="border-l-4 border-amber-400 pl-4">
                  <p className="font-semibold">Email</p>
                  <p className="text-lg">support@kaleidoscope.org</p>
                </div>
              </div>
              <Button variant="outline" className="mt-6 w-full border-white text-white hover:bg-white/10 font-bold py-3 text-lg">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <Heart className="w-12 h-12 text-amber-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold mb-6">A Message of Hope</h3>
            <p className="text-lg text-amber-200 leading-relaxed mb-6">
              "Just like a kaleidoscope, your life may seem fragmented right now, 
              but those pieces can come together to create something beautiful. 
              Healing takes time, and it's okay to take it one day at a time."
            </p>
            <p className="text-sm text-amber-300 italic">
              — The Kaleidoscope Community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
