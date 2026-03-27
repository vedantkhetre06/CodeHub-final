"use client";

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, FileText, MoreVertical } from 'lucide-react';
import { MOCK_TESTS } from '@/lib/mock-data';

export default function TeacherTestsPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">Manage Tests</h2>
          <p className="text-muted-foreground">Create, edit, and monitor student assessments.</p>
        </div>
        <Button onClick={() => router.push('/dashboard/teacher/tests/new')} className="gap-2">
          <Plus size={20} /> Create New Test
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_TESTS.map(test => (
          <Card key={test.id} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{test.subject}</Badge>
                    <span className="text-xs text-muted-foreground">Created on: {new Date(test.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline">{test.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{test.description}</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold">42</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Users size={12} /> Submissions</p>
                  </div>
                  <div className="text-center border-l border-border pl-8">
                    <p className="text-2xl font-bold">{test.questions.length}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><FileText size={12} /> Questions</p>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <Button variant="outline" size="icon"><Edit size={16} /></Button>
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive"><Trash2 size={16} /></Button>
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