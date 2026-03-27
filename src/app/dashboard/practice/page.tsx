"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, Play, CheckCircle2, List } from 'lucide-react';

const QUESTIONS = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'DSA', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.' },
  { id: 2, title: 'Reverse Linked List', difficulty: 'Medium', category: 'DSA', description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.' },
  { id: 3, title: 'Select All Students', difficulty: 'Easy', category: 'PSQL', description: 'Write a query to fetch all columns from the Students table.' },
  { id: 4, title: 'Find Missing Number', difficulty: 'Medium', category: 'DSA', description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.' },
];

export default function PracticePage() {
  const [selectedQ, setSelectedQ] = useState(QUESTIONS[0]);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here...');

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">Coding Practice</h2>
          <p className="text-muted-foreground">DSA, SQL, and Language specific compiler practice.</p>
        </div>
        <div className="flex gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="psql">PostgreSQL</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Play size={16} /> Run Code
          </Button>
          <Button variant="outline" className="gap-2">
            <CheckCircle2 size={16} /> Submit
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        <aside className="lg:col-span-1 bg-card rounded-xl border border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
            <List size={18} />
            <span className="font-bold text-sm">Question Library</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQ(q)}
                  className={`w-full text-left p-4 rounded-lg transition-colors flex flex-col gap-1 ${
                    selectedQ.id === q.id ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{q.title}</span>
                    <Badge variant="outline" className="text-[10px] h-5">{q.category}</Badge>
                  </div>
                  <span className={`text-xs ${q.difficulty === 'Easy' ? 'text-green-600' : 'text-orange-600'}`}>
                    {q.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
          <Card className="flex-1 border-none shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/10">
              <h3 className="text-xl font-bold font-headline">{selectedQ.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{selectedQ.description}</p>
            </div>
            <div className="flex-1 p-0 relative">
              <Textarea
                className="w-full h-full font-code text-sm bg-slate-950 text-slate-100 border-none focus-visible:ring-0 p-6 resize-none rounded-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </Card>
          
          <Card className="h-48 border-none shadow-sm flex flex-col overflow-hidden">
             <div className="px-4 py-2 border-b border-border bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Code2 size={14} /> Output Console
             </div>
             <div className="flex-1 bg-slate-900 text-slate-300 p-4 font-code text-xs overflow-auto">
                <p>$ Running solution...</p>
                <p className="text-green-400 mt-2">✓ Compilation Successful</p>
                <p className="mt-1">Output: [Passed 0/0 tests - Run code to see results]</p>
             </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
