import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Brain, Moon, TrendingUp, Calendar, Watch, Smartphone, Wifi, WifiOff } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  emoji: string;
  notes: string;
  sleepHours: number;
  sleepQuality: number;
  bedTime: string;
  wakeUpTime: string;
  sleepDisturbances: string[];
  fitnessData?: {
    steps?: number;
    heartRate?: number;
    activeMinutes?: number;
  };
}

interface FitnessDevice {
  id: string;
  name: string;
  type: 'fitbit' | 'apple' | 'garmin' | 'samsung' | 'other';
  connected: boolean;
  lastSync?: string;
}

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('😐');
  const [notes, setNotes] = useState<string>('');
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [bedTime, setBedTime] = useState<string>('22:00');
  const [wakeUpTime, setWakeUpTime] = useState<string>('07:00');
  const [sleepDisturbances, setSleepDisturbances] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [connectedDevices, setConnectedDevices] = useState<FitnessDevice[]>([]);

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

  const sleepDisturbanceOptions = [
    'Noise',
    'Light',
    'Temperature',
    'Stress/Anxiety',
    'Physical discomfort',
    'Bathroom breaks',
    'Partner movement',
    'Nightmares',
    'None'
  ];

  const fitnessDeviceTypes = [
    { id: 'fitbit', name: 'Fitbit', icon: '⌚' },
    { id: 'apple', name: 'Apple Watch', icon: '⌚' },
    { id: 'garmin', name: 'Garmin', icon: '⌚' },
    { id: 'samsung', name: 'Samsung Galaxy Watch', icon: '⌚' },
    { id: 'other', name: 'Other Fitness Tracker', icon: '📱' }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    const savedDevices = localStorage.getItem('connectedDevices');
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    }
    if (savedDevices) {
      setConnectedDevices(JSON.parse(savedDevices));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem('connectedDevices', JSON.stringify(connectedDevices));
  }, [connectedDevices]);

  const handleSleepDisturbanceChange = (disturbance: string, checked: boolean) => {
    if (disturbance === 'None') {
      setSleepDisturbances(checked ? ['None'] : []);
    } else {
      setSleepDisturbances(prev => {
        const filtered = prev.filter(item => item !== 'None');
        return checked 
          ? [...filtered, disturbance]
          : filtered.filter(item => item !== disturbance);
      });
    }
  };

  const addMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      emoji: selectedEmoji,
      notes,
      sleepHours,
      sleepQuality,
      bedTime,
      wakeUpTime,
      sleepDisturbances,
      fitnessData: {
        steps: Math.floor(Math.random() * 5000) + 5000, // Mock data
        heartRate: Math.floor(Math.random() * 40) + 60,
        activeMinutes: Math.floor(Math.random() * 60) + 30
      }
    };

    setMoodEntries(prev => [newEntry, ...prev]);
    setNotes('');
    setSleepDisturbances([]);
    generateAIAnalysis([newEntry, ...moodEntries.slice(0, 6)]);
  };

  const connectDevice = (deviceType: string) => {
    const deviceName = fitnessDeviceTypes.find(d => d.id === deviceType)?.name || 'Unknown Device';
    
    // Simulate connection process
    const newDevice: FitnessDevice = {
      id: Date.now().toString(),
      name: deviceName,
      type: deviceType as any,
      connected: true,
      lastSync: new Date().toISOString()
    };

    setConnectedDevices(prev => [...prev, newDevice]);
  };

  const disconnectDevice = (deviceId: string) => {
    setConnectedDevices(prev => prev.filter(device => device.id !== deviceId));
  };

  const generateAIAnalysis = (entries: MoodEntry[]) => {
    if (entries.length < 3) {
      setAiAnalysis("Track your mood and sleep for a few more days to get personalized insights!");
      return;
    }

    const recentEntries = entries.slice(0, 7);
    const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length;
    const avgSleep = recentEntries.reduce((sum, entry) => sum + entry.sleepHours, 0) / recentEntries.length;
    const avgSleepQuality = recentEntries.reduce((sum, entry) => sum + entry.sleepQuality, 0) / recentEntries.length;
    
    let analysis = "";
    let suggestions = [];

    // Mood pattern analysis
    if (avgMood < 4) {
      analysis = "I notice you've been experiencing lower moods recently. ";
      suggestions.push("Consider talking to a trusted friend or counselor");
      suggestions.push("Try a 10-minute daily walk in nature");
    } else if (avgMood > 7) {
      analysis = "Your mood has been quite positive lately! ";
      suggestions.push("Keep up the activities that bring you joy");
    } else {
      analysis = "Your mood has been relatively stable. ";
      suggestions.push("Maintain your current self-care routine");
    }

    // Sleep analysis
    if (avgSleep < 7) {
      analysis += "Your sleep duration suggests you might benefit from more rest. ";
      suggestions.push("Aim for 7-9 hours of sleep nightly");
    }

    if (avgSleepQuality < 3) {
      analysis += "Your sleep quality could be improved. ";
      suggestions.push("Create a relaxing bedtime routine");
      suggestions.push("Consider reducing screen time before bed");
    }

    // Sleep disturbance analysis
    const commonDisturbances = recentEntries
      .flatMap(entry => entry.sleepDisturbances)
      .filter(disturbance => disturbance !== 'None');
    
    if (commonDisturbances.length > 0) {
      const mostCommon = commonDisturbances.reduce((a, b, i, arr) => 
        arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
      );
      analysis += `Your most common sleep disturbance is ${mostCommon.toLowerCase()}. `;
      
      if (mostCommon === 'Stress/Anxiety') {
        suggestions.push("Practice relaxation techniques before bed");
      } else if (mostCommon === 'Noise') {
        suggestions.push("Consider using earplugs or white noise");
      }
    }

    const finalAnalysis = analysis + "\n\nPersonalized suggestions:\n• " + suggestions.slice(0, 4).join("\n• ");
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
        sleep: entry ? entry.sleepHours : null,
        sleepQuality: entry ? entry.sleepQuality : null
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
    sleepQuality: {
      label: "Sleep Quality",
      color: "#10b981",
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-800 mb-4">
            Mood & Wellness Tracker
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Track your daily mood, sleep, and connect fitness devices for comprehensive wellness insights
          </p>
        </div>

        <Tabs defaultValue="track" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="track" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Track
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Sleep
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              <Watch className="w-4 h-4" />
              Devices
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
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-stone-200 hover:border-amber-400'
                        }`}
                      >
                        <div className="text-3xl mb-1">{mood.emoji}</div>
                        <div className="text-xs text-stone-600">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sleep-hours">Hours of sleep:</Label>
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
                    <Label>Sleep quality (1-5):</Label>
                    <RadioGroup value={sleepQuality.toString()} onValueChange={(value) => setSleepQuality(parseInt(value))} className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-1">
                          <RadioGroupItem value={rating.toString()} id={`quality-${rating}`} />
                          <Label htmlFor={`quality-${rating}`} className="text-sm">{rating}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bed-time">Bedtime:</Label>
                    <Input
                      id="bed-time"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="wake-time">Wake up time:</Label>
                    <Input
                      id="wake-time"
                      type="time"
                      value={wakeUpTime}
                      onChange={(e) => setWakeUpTime(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Sleep disturbances:</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {sleepDisturbanceOptions.map((disturbance) => (
                      <label key={disturbance} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sleepDisturbances.includes(disturbance)}
                          onChange={(e) => handleSleepDisturbanceChange(disturbance, e.target.checked)}
                          className="rounded border-stone-300"
                        />
                        <span className="text-sm text-stone-700">{disturbance}</span>
                      </label>
                    ))}
                  </div>
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
                  className="w-full bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-800 hover:to-stone-800"
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
                            {entry.notes && <div className="text-sm text-stone-600">{entry.notes}</div>}
                          </div>
                        </div>
                        <div className="text-sm text-stone-500">
                          {entry.sleepHours}h sleep • Quality: {entry.sleepQuality}/5
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
                  Detailed Sleep Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                {moodEntries.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {(moodEntries.slice(0, 7).reduce((sum, entry) => sum + entry.sleepHours, 0) / Math.min(7, moodEntries.length)).toFixed(1)}h
                        </div>
                        <div className="text-sm text-stone-600">Avg Sleep</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {(moodEntries.slice(0, 7).reduce((sum, entry) => sum + entry.sleepQuality, 0) / Math.min(7, moodEntries.length)).toFixed(1)}/5
                        </div>
                        <div className="text-sm text-stone-600">Avg Quality</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-amber-600">
                          {moodEntries[0]?.bedTime || '--:--'}
                        </div>
                        <div className="text-sm text-stone-600">Last Bedtime</div>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-stone-600">
                          {moodEntries[0]?.wakeUpTime || '--:--'}
                        </div>
                        <div className="text-sm text-stone-600">Last Wake</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-stone-800">Recent Sleep Patterns</h4>
                      {moodEntries.slice(0, 7).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                            <span className="text-sm text-stone-600">{entry.bedTime} - {entry.wakeUpTime}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">{entry.sleepHours}h</span>
                            <span className="text-sm">Quality: {entry.sleepQuality}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-stone-600">Start tracking your mood to see sleep patterns!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Watch className="w-5 h-5" />
                  Fitness Device Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {connectedDevices.length > 0 && (
                  <div>
                    <h4 className="font-medium text-stone-800 mb-3">Connected Devices</h4>
                    <div className="space-y-2">
                      {connectedDevices.map((device) => (
                        <div key={device.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-3">
                            <Wifi className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium text-stone-800">{device.name}</div>
                              <div className="text-sm text-stone-600">
                                Last sync: {device.lastSync ? new Date(device.lastSync).toLocaleString() : 'Never'}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => disconnectDevice(device.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Disconnect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-stone-800 mb-3">Connect New Device</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fitnessDeviceTypes.map((deviceType) => (
                      <Button
                        key={deviceType.id}
                        variant="outline"
                        onClick={() => connectDevice(deviceType.id)}
                        className="flex items-center gap-3 p-4 h-auto justify-start border-stone-200 hover:border-amber-400 hover:bg-amber-50"
                        disabled={connectedDevices.some(device => device.type === deviceType.id)}
                      >
                        <span className="text-2xl">{deviceType.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{deviceType.name}</div>
                          <div className="text-sm text-stone-500">
                            {connectedDevices.some(device => device.type === deviceType.id) ? 'Connected' : 'Connect'}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-amber-800 mb-1">How it works</h5>
                      <p className="text-sm text-amber-700">
                        Connect your fitness device to automatically sync sleep data, heart rate, and activity metrics. 
                        This helps provide more accurate wellness insights and mood correlations.
                      </p>
                    </div>
                  </div>
                </div>
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
                  <div className="bg-gradient-to-r from-stone-50 to-amber-50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-stone-700 leading-relaxed">
                      {aiAnalysis}
                    </pre>
                  </div>
                ) : (
                  <p className="text-stone-600">Track your mood for a few days to get personalized insights and suggestions!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="graph" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Weekly Wellness Chart
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
                        <Line 
                          type="monotone" 
                          dataKey="sleepQuality" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                          connectNulls={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <p className="text-stone-600">Start tracking your mood to see your weekly patterns!</p>
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
