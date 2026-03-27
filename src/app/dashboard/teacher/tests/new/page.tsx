
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_SUBJECTS } from '@/lib/mock-data';
import { createTest } from '@/lib/services';
import { User } from '@/lib/types';
import { generateMCQQuestions } from '@/ai/flows/generate-mcq-questions';
import { aiAssistedCodingSetup } from '@/ai/flows/ai-assisted-coding-setup';
import { Plus, Trash2, Sparkles, Loader2, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function NewTestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    subject: '',
    timeLimit: '60',
    questions: [] as any[]
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('codehub_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleAddQuestion = (type: 'mcq' | 'coding') => {
    const newQuestion = type === 'mcq' 
      ? { id: Date.now().toString(), type: 'mcq', text: '', options: ['', '', '', ''], correctAnswer: '' }
      : { id: Date.now().toString(), type: 'coding', text: '', language: 'javascript', boilerplate: '', testCases: [{ input: '', output: '' }] };
    
    setTestData({ ...testData, questions: [...testData.questions, newQuestion] });
  };

  const handleRemoveQuestion = (id: string) => {
    setTestData({ ...testData, questions: testData.questions.filter(q => q.id !== id) });
  };

  const handleAiGenMCQ = async () => {
    if (!testData.subject) {
      toast({ title: "Select a subject first", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await generateMCQQuestions({
        subject: testData.subject,
        topic: testData.description || 'General',
        difficulty: 'Medium',
        numQuestions: 3
      });
      
      const newQuestions = result.questions.map((q: any) => ({
        id: Date.now().toString() + Math.random(),
        type: 'mcq',
        text: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      }));
      
      setTestData({ ...testData, questions: [...testData.questions, ...newQuestions] });
      toast({ title: "Generated 3 AI questions!" });
    } catch (e) {
      toast({ title: "Failed to generate questions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAiGenCoding = async (index: number) => {
    const question = testData.questions[index];
    if (!question.text) {
      toast({ title: "Please write a problem description first", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await aiAssistedCodingSetup({
        problemDescription: question.text,
        programmingLanguage: question.language || 'javascript',
        difficultyLevel: 'Medium'
      });
      
      const updatedQuestions = [...testData.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        boilerplate: result.boilerplateCode,
        testCases: result.testCases
      };
      
      setTestData({ ...testData, questions: updatedQuestions });
      toast({ title: "AI Setup complete!" });
    } catch (e) {
      toast({ title: "Failed to setup coding question", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!testData.title || !testData.subject || testData.questions.length === 0) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await createTest({
        title: testData.title,
        description: testData.description,
        subject: testData.subject,
        timeLimit: parseInt(testData.timeLimit),
        questions: testData.questions,
        createdBy: user?.id || 'unknown',
        createdAt: new Date().toISOString()
      });
      toast({ title: "Test published to Firestore!" });
      router.push('/dashboard/teacher/tests');
    } catch (error) {
      toast({ title: "Error saving test", description: "Please check your database permissions.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-headline font-bold">Create New Test</h2>
        <Button onClick={handleSave} disabled={loading} className="gap-2">
           {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
           Save Test
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Test Title</Label>
              <Input 
                placeholder="e.g. DSA Midterm" 
                value={testData.title}
                onChange={(e) => setTestData({...testData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select onValueChange={(v) => setTestData({...testData, subject: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_SUBJECTS.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description / Topics</Label>
            <Textarea 
              placeholder="Provide context for AI question generation..." 
              value={testData.description}
              onChange={(e) => setTestData({...testData, description: e.target.value})}
            />
          </div>
          <div className="space-y-2 w-32">
            <Label>Time Limit (min)</Label>
            <Input 
              type="number" 
              value={testData.timeLimit}
              onChange={(e) => setTestData({...testData, timeLimit: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-semibold">Questions</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleAddQuestion('mcq')}>+ MCQ</Button>
            <Button variant="outline" size="sm" onClick={() => handleAddQuestion('coding')}>+ Coding</Button>
            <Button variant="secondary" size="sm" className="gap-2" onClick={handleAiGenMCQ} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} 
              AI Bulk Generate MCQ
            </Button>
          </div>
        </div>

        {testData.questions.length === 0 && (
          <div className="p-12 border-2 border-dashed rounded-xl text-center text-muted-foreground">
            No questions added yet. Use the buttons above to start.
          </div>
        )}

        {testData.questions.map((q: any, idx: number) => (
          <Card key={q.id} className="border-none shadow-sm animate-in slide-in-from-bottom-2">
            <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/30">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Question {idx + 1} - {q.type.toUpperCase()}</span>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleRemoveQuestion(q.id)}>
                <Trash2 size={16} />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Question Text</Label>
                <Textarea 
                  value={q.text}
                  onChange={(e) => {
                    const newQs = [...testData.questions];
                    newQs[idx].text = e.target.value;
                    setTestData({...testData, questions: newQs});
                  }}
                  placeholder="Type your question here..."
                />
              </div>

              {q.type === 'mcq' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt: string, optIdx: number) => (
                    <div key={optIdx} className="flex gap-2 items-center">
                      <span className="text-sm font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                      <Input 
                        placeholder={`Option ${optIdx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newQs = [...testData.questions];
                          newQs[idx].options[optIdx] = e.target.value;
                          setTestData({...testData, questions: newQs});
                        }}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2 space-y-2">
                    <Label>Correct Answer</Label>
                    <Select onValueChange={(v) => {
                      const newQs = [...testData.questions];
                      newQs[idx].correctAnswer = v;
                      setTestData({...testData, questions: newQs});
                    }} defaultValue={q.correctAnswer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct option" />
                      </SelectTrigger>
                      <SelectContent>
                        {q.options.map((opt: string, i: number) => opt && <SelectItem key={i} value={opt}>Option {String.fromCharCode(65 + i)}: {opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="javascript">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="secondary" className="gap-2" onClick={() => handleAiGenCoding(idx)} disabled={loading}>
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                      AI Boilerplate & Test Cases
                    </Button>
                  </div>
                  
                  {q.boilerplate && (
                    <div className="space-y-2">
                      <Label className="font-code">Boilerplate Code</Label>
                      <pre className="p-4 bg-muted rounded-lg font-code text-sm whitespace-pre-wrap">
                        {q.boilerplate}
                      </pre>
                    </div>
                  )}

                  {q.testCases.length > 0 && (
                    <div className="space-y-2">
                      <Label>Test Cases</Label>
                      <div className="space-y-2">
                        {q.testCases.map((tc: any, tcIdx: number) => (
                          <div key={tcIdx} className="grid grid-cols-2 gap-2 p-2 border border-border rounded-md">
                            <div className="text-xs">Input: <code className="bg-muted px-1">{tc.input}</code></div>
                            <div className="text-xs">Output: <code className="bg-muted px-1">{tc.expectedOutput || tc.output}</code></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
