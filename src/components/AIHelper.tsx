
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Brain, Send, MessageCircle, Key, Eye, EyeOff } from 'lucide-react';

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
      content: "Hello! I'm your AI mental health companion. I'm here to listen, provide support, and offer gentle guidance. Please enter your Gemini API key to get started.",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
    }
  }, []);

  const handleApiKeySave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsApiKeySet(true);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Great! Your API key has been saved securely. How are you feeling today?",
        isAI: true,
        timestamp: new Date()
      }]);
    }
  };

  const handleApiKeyRemove = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsApiKeySet(false);
    setMessages([{
      id: '1',
      content: "Your API key has been removed. Please enter a new Gemini API key to continue using the AI companion.",
      isAI: true,
      timestamp: new Date()
    }]);
  };

  const quickPrompts = [
    "I'm feeling anxious",
    "I can't sleep",
    "I'm feeling overwhelmed",
    "I need motivation",
    "I'm having a bad day",
    "I need coping strategies"
  ];

  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "Please enter your Gemini API key first to use the AI companion.";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a compassionate AI mental health companion. Provide supportive, empathetic responses that offer gentle guidance and coping strategies. Always encourage professional help when needed. Keep responses warm, understanding, and helpful. If someone seems in crisis, gently suggest they contact emergency services or a crisis helpline.

User message: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          return "Invalid API key. Please check your Gemini API key and try again.";
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm here to listen. Can you tell me more about what you're experiencing?";
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm sorry, I'm having trouble responding right now. Please check your API key and try again, or contact a mental health professional if you need immediate support.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isApiKeySet) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponseContent = await generateGeminiResponse(inputMessage);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        isAI: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please check your API key and try again, or contact a mental health professional if you need immediate support.",
        isAI: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }

    setIsLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isApiKeySet) {
      setInputMessage(prompt);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            AI Mental Health Companion
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Powered by Google Gemini - A supportive AI helper to listen, guide, and provide gentle mental health support
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-stone-50 to-amber-50">
            <CardHeader className="border-b border-amber-200">
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <Brain className="w-6 h-6" />
                Your AI Companion
                <span className="text-xs bg-amber-100 px-2 py-1 rounded-full">
                  Google Gemini
                </span>
                {isApiKeySet && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Secure
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* API Key Configuration */}
              {!isApiKeySet ? (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-5 h-5 text-amber-700" />
                    <h3 className="font-semibold text-amber-900">Secure API Key Setup</h3>
                  </div>
                  <p className="text-sm text-amber-800 mb-3">
                    Enter your Google Gemini API key. It will be stored securely in your browser's local storage.
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button onClick={handleApiKeySave} disabled={!apiKey.trim()}>
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-amber-700 mt-2">
                    Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
                  </p>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-green-700" />
                    <span className="text-sm text-green-800">API key configured securely</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApiKeyRemove}
                    className="text-red-700 border-red-300 hover:bg-red-50"
                  >
                    Remove Key
                  </Button>
                </div>
              )}

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
              {isApiKeySet && (
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
              )}

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isApiKeySet ? "Share what's on your mind..." : "Please configure your API key first"}
                  className="border-amber-300 focus:border-amber-500 bg-white/70"
                  disabled={!isApiKeySet}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && isApiKeySet) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || !isApiKeySet}
                  className="bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-800 hover:to-stone-800 text-white self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-4 p-3 bg-amber-100/50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800">
                  <strong>Privacy & Security:</strong> Your API key is stored locally in your browser and never transmitted to our servers. This AI companion provides general support and is not a replacement for professional mental health treatment. If you're experiencing a mental health crisis, please contact a mental health professional or emergency services.
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
