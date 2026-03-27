"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/lib/store';
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, ShieldCheck } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = authStore.getUser();
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
             <GraduationCap size={32} />
          </div>
          <h1 className="text-5xl font-headline font-bold text-primary tracking-tight">CodeHub</h1>
        </div>
        
        <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
          The all-in-one digital hub for college academic activities. 
          Manage tests, assignments, and practice code with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 mx-auto">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-headline font-semibold text-lg mb-2">Student</h3>
            <p className="text-sm text-muted-foreground mb-6">Take tests, upload assignments, and track your progress.</p>
            <Button onClick={() => router.push('/auth/login?role=student')} className="w-full">Student Portal</Button>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
             <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4 mx-auto">
              <BookOpen size={24} />
            </div>
            <h3 className="font-headline font-semibold text-lg mb-2">Teacher</h3>
            <p className="text-sm text-muted-foreground mb-6">Create tests, manage subjects, and analyze student performance.</p>
            <Button variant="secondary" onClick={() => router.push('/auth/login?role=teacher')} className="w-full">Teacher Portal</Button>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground mb-4 mx-auto">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-headline font-semibold text-lg mb-2">Admin</h3>
            <p className="text-sm text-muted-foreground mb-6">Manage users, moderate content, and monitor the system.</p>
            <Button variant="outline" onClick={() => router.push('/auth/login?role=admin')} className="w-full">Admin Panel</Button>
          </div>
        </div>

        <div className="pt-12 text-sm text-muted-foreground">
          Built with focus on performance and accessibility.
        </div>
      </div>
    </div>
  );
}