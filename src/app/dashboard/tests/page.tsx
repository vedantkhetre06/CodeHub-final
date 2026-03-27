"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
import { MOCK_TESTS } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

export default function StudentTestsPage() {
  const router = useRouter();
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold">Upcoming Tests</h2>
        <p className="text-muted-foreground">Tests assigned to you by your instructors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TESTS.map(test => (
          <Card key={test.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">{test.subject}</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={14} /> {test.timeLimit} mins
                </div>
              </div>
              <CardTitle className="font-headline">{test.title}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 text-sm text-muted-foreground">
                 <div className="flex items-center gap-1">
                   <BookOpen size={16} /> {test.questions.length} Questions
                 </div>
                 <div className="flex items-center gap-1">
                   <AlertCircle size={16} /> Evaluation: AI-Powered
                 </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" onClick={() => router.push(`/dashboard/tests/${test.id}`)}>
                Start Test <ChevronRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}

        {MOCK_TESTS.length === 0 && (
          <div className="md:col-span-2 p-12 bg-card rounded-2xl text-center border border-dashed border-border text-muted-foreground">
            No upcoming tests at the moment.
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mt-12 mb-4">Past Submissions</h2>
        <Card className="border-none shadow-sm overflow-hidden">
           <div className="p-0">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="p-4 text-left font-semibold">Test Title</th>
                   <th className="p-4 text-left font-semibold">Date</th>
                   <th className="p-4 text-left font-semibold">Score</th>
                   <th className="p-4 text-right font-semibold">Status</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { title: 'DSA Practice Quiz', date: '2024-04-15', score: '18/20', status: 'Completed' },
                   { title: 'DBMS Fundamentals', date: '2024-03-22', score: '42/50', status: 'Completed' },
                 ].map((sub, i) => (
                   <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                     <td className="p-4 font-medium">{sub.title}</td>
                     <td className="p-4">{sub.date}</td>
                     <td className="p-4">{sub.score}</td>
                     <td className="p-4 text-right">
                       <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                         {sub.status}
                       </Badge>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </Card>
      </div>
    </div>
  );
}