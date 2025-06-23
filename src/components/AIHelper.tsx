
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

const AIHelper = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI mental health companion. I'm here to listen, provide support, and offer gentle guidance. How are you feeling today?",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "I'm feeling anxious",
    "I can't sleep",
    "I'm feeling overwhelmed",
    "I need motivation",
    "I'm having a bad day",
    "I need coping strategies"
  ];

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety')) {
      return "I understand you're feeling anxious. Here are some gentle techniques that might help:\n\n• Try the 4-7-8 breathing technique: Breathe in for 4, hold for 7, exhale for 8\n• Ground yourself using the 5-4-3-2-1 method: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• Remember that anxiety is temporary and you have the strength to get through this\n\nWould you like to talk about what's making you feel anxious?";
    }
    
    if (message.includes('sleep') || message.includes('insomnia')) {
      return "Sleep troubles can be really challenging. Here are some gentle suggestions:\n\n• Create a calming bedtime routine 30 minutes before sleep\n• Try progressive muscle relaxation: tense and release each muscle group\n• Keep your bedroom cool, dark, and quiet\n• Avoid screens 1 hour before bed\n• If your mind is racing, try writing down your thoughts\n\nWhat do you think might be affecting your sleep?";
    }
    
    if (message.includes('overwhelmed') || message.includes('stressed')) {
      return "Feeling overwhelmed is completely valid. Let's break things down:\n\n• Take three deep breaths right now\n• List your tasks and prioritize just 1-3 for today\n• Remember: you don't have to do everything at once\n• It's okay to ask for help or say no to additional commitments\n• Take breaks - even 5 minutes can help reset your mind\n\nWhat feels most overwhelming right now?";
    }
    
    if (message.includes('motivation') || message.includes('unmotivated')) {
      return "Lack of motivation happens to everyone. Here's how to gently restart:\n\n• Start with the smallest possible step - even 2 minutes counts\n• Celebrate tiny wins - they build momentum\n• Connect with your 'why' - what matters to you?\n• Be kind to yourself - motivation comes and goes naturally\n• Sometimes rest is what you need, not more doing\n\nWhat's one small thing you could do today that would feel good?";
    }
    
    if (message.includes('bad day') || message.includes('sad') || message.includes('down')) {
      return "I'm sorry you're having a difficult day. Your feelings are valid and temporary:\n\n• This feeling will pass - bad days don't last forever\n• Try to do one small thing that usually brings you comfort\n• Reach out to someone you trust if you feel able\n• Be extra gentle with yourself today\n• Remember past difficult days you've overcome - you're stronger than you know\n\nWhat would feel most comforting right now?";
    }
    
    if (message.includes('coping') || message.includes('help') || message.includes('strategies')) {
      return "Here are some gentle coping strategies you can try:\n\n• Mindfulness: Focus on the present moment without judgment\n• Journaling: Write down your thoughts and feelings\n• Movement: Even a short walk can shift your energy\n• Connection: Reach out to supportive friends or family\n• Creative expression: Draw, write, or listen to music\n• Professional support: Consider talking to a counselor or therapist\n\nWhich of these feels most accessible to you right now?";
    }
    
    // Default responses for general messages
    const defaultResponses = [
      "Thank you for sharing that with me. It takes courage to reach out. Can you tell me more about how you're feeling?",
      "I hear you, and I want you to know that your feelings are valid. What kind of support would be most helpful right now?",
      "It sounds like you're going through something difficult. Remember that seeking help is a sign of strength. What's been on your mind lately?",
      "I'm here to listen and support you. Sometimes just talking about what we're experiencing can help. How has your day been?",
      "Thank you for trusting me with your thoughts. Everyone deserves support and care. What would make you feel a little better right now?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        isAI: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            AI Mental Health Companion
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            A supportive AI helper to listen, guide, and provide gentle mental health support
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-stone-50 to-amber-50">
            <CardHeader className="border-b border-amber-200">
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <Brain className="w-6 h-6" />
                Your AI Companion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-6 space-y-4 bg-white/50 rounded-lg p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.isAI
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-stone-600 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.isAI && <Brain className="w-4 h-4" />}
                        {!message.isAI && <MessageCircle className="w-4 h-4" />}
                        <span className="text-xs opacity-75">
                          {message.isAI ? 'AI Companion' : 'You'}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-amber-100 text-amber-900 border border-amber-200 px-4 py-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        <span className="text-xs opacity-75">AI Companion</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="mb-4">
                <p className="text-sm text-amber-800 mb-2">Quick prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="border-amber-300 text-amber-800 hover:bg-amber-100 text-xs"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="border-amber-300 focus:border-amber-500 bg-white/70"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-800 hover:to-stone-800 text-white self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-4 p-3 bg-amber-100/50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> This AI companion provides general support and is not a replacement for professional mental health treatment. If you're experiencing a mental health crisis, please contact a mental health professional or emergency services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIHelper;
