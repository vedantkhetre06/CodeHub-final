"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_TESTS } from '@/lib/mock-data';
import { Test, Question } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Send, 
  AlertTriangle,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function TestEnvironment() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState(0);

  useEffect(() => {
    const found = MOCK_TESTS.find(t => t.id === id);
    if (found) {
      setTest(found);
      setTimeLeft(found.timeLimit * 60);
    } else {
      router.push('/dashboard/tests');
    }

    // Tab switch detection (Simple anti-cheating)
    const handleBlur = () => {
      setWarnings(prev => {
        const next = prev + 1;
        toast({
          title: "Warning: Window Focus Lost",
          description: `Tab switching detected. Warning #${next}. Persistent switching may be reported.`,
          variant: "destructive"
        });
        return next;
      });
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [id, router, toast]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = test?.questions[currentIdx];
  const progress = test ? ((currentIdx + 1) / test.questions.length) * 100 : 0;

  const handleSubmit = () => {
    toast({ title: "Test Submitted Successfully!" });
    router.push('/dashboard');
  };

  if (!test || !currentQuestion) return null;

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <header className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-headline font-bold">{test.title}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
             <span className="flex items-center gap-1 font-medium text-foreground">
                <Clock size={16} className={timeLeft < 300 ? "text-destructive" : "text-primary"} />
                {formatTime(timeLeft)}
             </span>
             <span>{test.subject}</span>
             {warnings > 0 && <span className="text-destructive font-bold flex items-center gap-1"><AlertTriangle size={14} /> Warnings: {warnings}</span>}
          </div>
        </div>
        <Button onClick={handleSubmit} className="gap-2 shadow-lg">
           <Send size={18} /> Submit Test
        </Button>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Sidebar: Question Navigation */}
        <aside className="lg:col-span-1 bg-card rounded-xl border border-border p-4 flex flex-col h-fit">
          <h4 className="font-semibold text-sm mb-4">Question Progress</h4>
          <div className="grid grid-cols-4 gap-2">
            {test.questions.map((_, i) => (
              <Button
                key={i}
                variant={currentIdx === i ? 'default' : answers[test.questions[i].id] ? 'secondary' : 'outline'}
                className="w-full h-10 text-xs p-0"
                onClick={() => setCurrentIdx(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between text-xs mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="mt-auto pt-6 space-y-2">
             <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-primary rounded-sm"></div> Current
             </div>
             <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-secondary rounded-sm"></div> Attempted
             </div>
             <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 border border-border rounded-sm"></div> Not Attempted
             </div>
          </div>
        </aside>

        {/* Main Content Area: Question Display */}
        <main className="lg:col-span-3 flex flex-col overflow-y-auto">
          <Card className="flex-1 border-none shadow-sm flex flex-col">
            <CardHeader className="border-b border-border bg-muted/20">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Question {currentIdx + 1}</span>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <Flag size={14} /> Mark for Review
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-8 space-y-8">
              <div className="text-lg leading-relaxed font-medium">
                {currentQuestion.text}
              </div>

              {currentQuestion.type === 'mcq' ? (
                <RadioGroup 
                  value={answers[currentQuestion.id] || ''} 
                  onValueChange={(v) => setAnswers({...answers, [currentQuestion.id]: v})}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
                      <RadioGroupItem value={opt} id={`q-${currentIdx}-opt-${i}`} className="text-primary" />
                      <Label 
                        htmlFor={`q-${currentIdx}-opt-${i}`} 
                        className="flex-1 cursor-pointer font-normal text-base"
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground font-code">
                        <Code2 size={16} /> solution.{currentQuestion.language === 'javascript' ? 'js' : 'py'}
                     </div>
                     <Button variant="outline" size="sm" onClick={() => toast({ title: "Evaluation Triggered", description: "Running predefined test cases..." })}>
                        Run Code
                     </Button>
                  </div>
                  <Textarea
                    className="font-code text-sm h-64 bg-[#1e1e1e] text-white border-none focus-visible:ring-1 focus-visible:ring-primary p-6"
                    placeholder="// Write your solution here"
                    value={answers[currentQuestion.id] || currentQuestion.boilerplate}
                    onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                  />
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                     <h5 className="text-sm font-semibold mb-2">Predefined Test Cases</h5>
                     <div className="space-y-2">
                       {currentQuestion.testCases.map((tc, i) => (
                         <div key={i} className="text-xs flex items-center justify-between p-2 bg-background rounded border border-border">
                           <span>Input: <code className="bg-muted px-1">{tc.input}</code></span>
                           <span>Expected Output: <code className="bg-muted px-1">{tc.output}</code></span>
                           <CheckCircle2 size={14} className="text-muted-foreground" />
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-6 border-t border-border flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="gap-2"
              >
                <ChevronLeft size={18} /> Previous
              </Button>
              <Button 
                onClick={() => {
                  if (currentIdx === test.questions.length - 1) {
                    handleSubmit();
                  } else {
                    setCurrentIdx(prev => prev + 1);
                  }
                }}
                className="gap-2"
              >
                {currentIdx === test.questions.length - 1 ? 'Finish & Submit' : 'Next Question'} 
                {currentIdx < test.questions.length - 1 && <ChevronRight size={18} />}
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}