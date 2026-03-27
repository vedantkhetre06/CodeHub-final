"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, ChevronRight, FileText } from 'lucide-react';
import { MOCK_ASSIGNMENTS } from '@/lib/mock-data';

export default function AssignmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold">Assignments</h2>
        <p className="text-muted-foreground">Manage and submit your coursework.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ASSIGNMENTS.map(assignment => (
          <Card key={assignment.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="mb-2">{assignment.subject}</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={14} /> Due: {assignment.dueDate}
                </div>
              </div>
              <CardTitle className="font-headline">{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 text-sm text-muted-foreground">
                 <div className="flex items-center gap-1">
                   <FileText size={16} /> Max Marks: 100
                 </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                Submit Assignment <ChevronRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mt-12 mb-4">Submission History</h2>
        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="p-4 text-left font-semibold">Title</th>
                   <th className="p-4 text-left font-semibold">Submitted On</th>
                   <th className="p-4 text-left font-semibold">Status</th>
                   <th className="p-4 text-right font-semibold">Grade</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { title: 'Array Manipulation Lab', date: 'May 10, 2024', status: 'Graded', grade: 'A+' },
                   { title: 'SQL Queries Part 1', date: 'May 05, 2024', status: 'Graded', grade: 'B' },
                 ].map((sub, i) => (
                   <tr key={i} className="border-b border-border last:border-0">
                     <td className="p-4 font-medium">{sub.title}</td>
                     <td className="p-4">{sub.date}</td>
                     <td className="p-4">
                       <Badge variant="outline" className="text-green-600 bg-green-50">{sub.status}</Badge>
                     </td>
                     <td className="p-4 text-right font-bold">{sub.grade}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}