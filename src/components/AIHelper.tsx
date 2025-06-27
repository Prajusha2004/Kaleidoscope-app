
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, MessageCircle, Settings } from 'lucide-react';
import OpenAI from 'openai';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

type AIProvider = 'openai' | 'gemini';

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
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [aiProvider, setAiProvider] = useState<AIProvider>('openai');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const quickPrompts = [
    "I'm feeling anxious",
    "I can't sleep",
    "I'm feeling overwhelmed",
    "I need motivation",
    "I'm having a bad day",
    "I need coping strategies"
  ];

  const generateOpenAIResponse = async (userMessage: string): Promise<string> => {
    if (!openaiApiKey) {
      return "Please provide your OpenAI API key to enable AI responses.";
    }

    try {
      const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a compassionate AI mental health companion. Provide supportive, empathetic responses that offer gentle guidance and coping strategies. Always encourage professional help when needed. Keep responses warm, understanding, and helpful. If someone seems in crisis, gently suggest they contact emergency services or a crisis helpline."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || "I'm here to listen. Can you tell me more about what you're experiencing?";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "I'm having trouble connecting right now. Please check your API key or try again later. In the meantime, remember that professional support is always available if you need immediate help.";
    }
  };

  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    if (!geminiApiKey) {
      return "Please provide your Gemini API key to enable AI responses.";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
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

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm here to listen. Can you tell me more about what you're experiencing?";
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm having trouble connecting right now. Please check your API key or try again later. In the meantime, remember that professional support is always available if you need immediate help.";
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (aiProvider === 'openai') {
      return generateOpenAIResponse(userMessage);
    } else {
      return generateGeminiResponse(userMessage);
    }
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

    try {
      const aiResponseContent = await generateAIResponse(inputMessage);
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
        content: "I'm sorry, I'm having trouble responding right now. Please try again or contact a mental health professional if you need immediate support.",
        isAI: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }

    setIsLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleApiKeySubmit = () => {
    const currentKey = aiProvider === 'openai' ? openaiApiKey : geminiApiKey;
    if (currentKey.trim()) {
      setShowApiKeyInput(false);
      localStorage.setItem(`${aiProvider}_api_key`, currentKey);
    }
  };

  const isApiKeyConfigured = () => {
    return aiProvider === 'openai' ? openaiApiKey.trim() !== '' : geminiApiKey.trim() !== '';
  };

  // Load API keys from localStorage on component mount
  React.useEffect(() => {
    const savedOpenAIKey = localStorage.getItem('openai_api_key');
    const savedGeminiKey = localStorage.getItem('gemini_api_key');
    
    if (savedOpenAIKey) {
      setOpenaiApiKey(savedOpenAIKey);
    }
    if (savedGeminiKey) {
      setGeminiApiKey(savedGeminiKey);
    }
    
    // Show input if no keys are configured
    if (!savedOpenAIKey && !savedGeminiKey) {
      setShowApiKeyInput(true);
    } else {
      setShowApiKeyInput(false);
      // Set default provider based on available keys
      if (savedOpenAIKey) {
        setAiProvider('openai');
      } else if (savedGeminiKey) {
        setAiProvider('gemini');
      }
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            AI Mental Health Companion
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Powered by AI - A supportive AI helper to listen, guide, and provide gentle mental health support
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {showApiKeyInput && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-stone-50 to-amber-50 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-amber-900">
                  <Brain className="w-6 h-6" />
                  Setup Required
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-amber-800 mb-4">
                  Choose your AI provider and enter the corresponding API key. Your key will be stored locally in your browser.
                </p>
                
                <div className="mb-4">
                  <label className="text-sm font-medium text-amber-900 mb-2 block">AI Provider</label>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setAiProvider('openai')}
                      className={`px-4 py-2 rounded-lg border ${aiProvider === 'openai' 
                        ? 'bg-amber-200 border-amber-500 text-amber-900' 
                        : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'}`}
                    >
                      OpenAI (GPT-4)
                    </button>
                    <button
                      onClick={() => setAiProvider('gemini')}
                      className={`px-4 py-2 rounded-lg border ${aiProvider === 'gemini' 
                        ? 'bg-amber-200 border-amber-500 text-amber-900' 
                        : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'}`}
                    >
                      Google Gemini
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="password"
                    value={aiProvider === 'openai' ? openaiApiKey : geminiApiKey}
                    onChange={(e) => {
                      if (aiProvider === 'openai') {
                        setOpenaiApiKey(e.target.value);
                      } else {
                        setGeminiApiKey(e.target.value);
                      }
                    }}
                    placeholder={`Enter your ${aiProvider === 'openai' ? 'OpenAI' : 'Gemini'} API key...`}
                    className="flex-1 px-4 py-2 border border-amber-300 rounded-lg focus:border-amber-500 bg-white/70"
                  />
                  <Button
                    onClick={handleApiKeySubmit}
                    className="bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-800 hover:to-stone-800 text-white"
                  >
                    Save Key
                  </Button>
                </div>
                <p className="text-xs text-amber-700 mt-2">
                  {aiProvider === 'openai' 
                    ? <>Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Platform</a></>
                    : <>Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></>
                  }
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-lg bg-gradient-to-br from-stone-50 to-amber-50">
            <CardHeader className="border-b border-amber-200">
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <Brain className="w-6 h-6" />
                Your AI Companion
                <span className="text-xs bg-amber-100 px-2 py-1 rounded-full">
                  {aiProvider === 'openai' ? 'OpenAI GPT-4' : 'Google Gemini'}
                </span>
                {!showApiKeyInput && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKeyInput(true)}
                    className="ml-auto text-xs border-amber-300 text-amber-800 hover:bg-amber-100"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Settings
                  </Button>
                )}
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
                      disabled={!isApiKeyConfigured()}
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
                  disabled={!isApiKeyConfigured()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || !isApiKeyConfigured()}
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
