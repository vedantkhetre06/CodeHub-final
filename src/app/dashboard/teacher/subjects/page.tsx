"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, FileText, ArrowRight, Plus } from 'lucide-react';
import { MOCK_SUBJECTS } from '@/lib/mock-data';

export default function TeacherSubjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">My Subjects</h2>
          <p className="text-muted-foreground">Manage your assigned courses and curriculum.</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} /> Add New Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SUBJECTS.map(subject => (
          <Card key={subject.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-primary/5 pb-6">
              <Badge className="w-fit mb-2">{subject.code}</Badge>
              <CardTitle className="font-headline">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Users size={14} /> Enrolled</span>
                <span className="font-medium">142 Students</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><FileText size={14} /> Total Tests</span>
                <span className="font-medium">8 Assessments</span>
              </div>
              <Button variant="outline" className="w-full justify-between">
                View Subject Details <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}