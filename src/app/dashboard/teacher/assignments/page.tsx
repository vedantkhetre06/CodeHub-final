"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, Users, FileCheck } from 'lucide-react';
import { MOCK_ASSIGNMENTS } from '@/lib/mock-data';

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">Manage Assignments</h2>
          <p className="text-muted-foreground">Review submissions and grade coursework.</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} /> New Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ASSIGNMENTS.map(assignment => (
          <Card key={assignment.id} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{assignment.subject}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} /> Due: {assignment.dueDate}</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold">128</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Users size={12} /> Submitted</p>
                  </div>
                  <div className="text-center border-l border-border pl-8">
                    <p className="text-2xl font-bold text-orange-500">12</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><FileCheck size={12} /> Pending Graded</p>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <Button variant="outline" size="sm">Grade All</Button>
                    <Button variant="ghost" size="icon"><Edit size={16} /></Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}