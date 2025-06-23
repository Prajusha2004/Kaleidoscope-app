
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Brain, Moon, TrendingUp, Calendar } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  emoji: string;
  notes: string;
  sleepHours: number;
}

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('😐');
  const [notes, setNotes] = useState<string>('');
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');

  const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Sad' },
    { value: 2, emoji: '😔', label: 'Sad' },
    { value: 3, emoji: '😕', label: 'Down' },
    { value: 4, emoji: '😐', label: 'Neutral' },
    { value: 5, emoji: '🙂', label: 'Okay' },
    { value: 6, emoji: '😊', label: 'Good' },
    { value: 7, emoji: '😄', label: 'Happy' },
    { value: 8, emoji: '😁', label: 'Very Happy' },
    { value: 9, emoji: '🤩', label: 'Excited' },
    { value: 10, emoji: '🥳', label: 'Euphoric' }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const addMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      emoji: selectedEmoji,
      notes,
      sleepHours
    };

    setMoodEntries(prev => [newEntry, ...prev]);
    setNotes('');
    generateAIAnalysis([newEntry, ...moodEntries.slice(0, 6)]);
  };

  const generateAIAnalysis = (entries: MoodEntry[]) => {
    if (entries.length < 3) {
      setAiAnalysis("Track your mood for a few more days to get personalized insights!");
      return;
    }

    const recentEntries = entries.slice(0, 7);
    const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length;
    const avgSleep = recentEntries.reduce((sum, entry) => sum + entry.sleepHours, 0) / recentEntries.length;
    
    let analysis = "";
    let suggestions = [];

    // Mood pattern analysis
    if (avgMood < 4) {
      analysis = "I notice you've been experiencing lower moods recently. ";
      suggestions.push("Consider talking to a trusted friend or counselor");
      suggestions.push("Try a 10-minute daily walk in nature");
      suggestions.push("Practice deep breathing exercises when feeling overwhelmed");
    } else if (avgMood > 7) {
      analysis = "Your mood has been quite positive lately! ";
      suggestions.push("Keep up the activities that bring you joy");
      suggestions.push("Share your positive energy with others");
      suggestions.push("Document what's working well for future reference");
    } else {
      analysis = "Your mood has been relatively stable. ";
      suggestions.push("Maintain your current self-care routine");
      suggestions.push("Try adding one new positive activity to your day");
      suggestions.push("Connect with supportive people in your life");
    }

    // Sleep pattern analysis
    if (avgSleep < 7) {
      analysis += "Your sleep pattern suggests you might benefit from more rest. ";
      suggestions.push("Establish a consistent bedtime routine");
      suggestions.push("Limit screen time 1 hour before bed");
      suggestions.push("Try relaxation techniques before sleep");
    } else if (avgSleep > 9) {
      analysis += "You're getting plenty of sleep, which is great for mental health. ";
    }

    const finalAnalysis = analysis + "\n\nHere are some personalized suggestions:\n• " + suggestions.slice(0, 3).join("\n• ");
    setAiAnalysis(finalAnalysis);
  };

  const getWeeklyData = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo && entryDate <= today;
    });

    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const entry = weeklyEntries.find(e => e.date === dateStr);
      
      chartData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: entry ? entry.mood : null,
        sleep: entry ? entry.sleepHours : null
      });
    }

    return chartData;
  };

  const chartConfig = {
    mood: {
      label: "Mood",
      color: "#8b5cf6",
    },
    sleep: {
      label: "Sleep Hours",
      color: "#06b6d4",
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Mood & Wellness Tracker
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your daily mood, sleep, and discover patterns to improve your mental wellness
          </p>
        </div>

        <Tabs defaultValue="track" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="track" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Track
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Sleep
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="graph" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Weekly Graph
            </TabsTrigger>
          </TabsList>

          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-4 block">Select your mood:</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {moodEmojis.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => {
                          setSelectedMood(mood.value);
                          setSelectedEmoji(mood.emoji);
                        }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedMood === mood.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-3xl mb-1">{mood.emoji}</div>
                        <div className="text-xs text-gray-600">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="sleep-hours">Hours of sleep last night:</Label>
                  <Input
                    id="sleep-hours"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optional):</Label>
                  <Input
                    id="notes"
                    placeholder="What's on your mind today?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button 
                  onClick={addMoodEntry}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Save Today's Entry
                </Button>
              </CardContent>
            </Card>

            {moodEntries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {moodEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{entry.emoji}</span>
                          <div>
                            <div className="font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                            {entry.notes && <div className="text-sm text-gray-600">{entry.notes}</div>}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.sleepHours}h sleep
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sleep" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Sleep Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                {moodEntries.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {(moodEntries.slice(0, 7).reduce((sum, entry) => sum + entry.sleepHours, 0) / Math.min(7, moodEntries.length)).toFixed(1)}h
                        </div>
                        <div className="text-sm text-gray-600">Average sleep (7 days)</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {moodEntries[0]?.sleepHours || 0}h
                        </div>
                        <div className="text-sm text-gray-600">Last night</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {moodEntries.slice(0, 7).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <span className="font-medium">{entry.sleepHours} hours</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Start tracking your mood to see sleep patterns!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {aiAnalysis ? (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {aiAnalysis}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-600">Track your mood for a few days to get personalized insights and suggestions!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="graph" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Weekly Mood & Sleep Chart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {moodEntries.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getWeeklyData()}>
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 12]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                          connectNulls={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sleep" 
                          stroke="#06b6d4" 
                          strokeWidth={3}
                          dot={{ fill: '#06b6d4', strokeWidth: 2, r: 6 }}
                          connectNulls={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <p className="text-gray-600">Start tracking your mood to see your weekly patterns!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MoodTracker;
