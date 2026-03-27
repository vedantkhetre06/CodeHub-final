"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, ChevronRight, Clock, BookOpen, Star } from 'lucide-react';

const PACKS = [
  { id: 1, title: 'Quantitative Aptitude', questions: 45, level: 'Beginner', time: '60 min', icon: 'Q' },
  { id: 2, title: 'Logical Reasoning', questions: 30, level: 'Intermediate', time: '45 min', icon: 'L' },
  { id: 3, title: 'Verbal Ability', questions: 50, level: 'Advanced', time: '40 min', icon: 'V' },
  { id: 4, title: 'Data Interpretation', questions: 25, level: 'Intermediate', time: '30 min', icon: 'D' },
];

export default function AptitudePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">Aptitude Training</h2>
          <p className="text-muted-foreground">Master placement tests with timed practice sessions.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg border border-primary/10">
           <Trophy className="text-yellow-500" size={20} />
           <div>
             <p className="text-[10px] font-bold uppercase text-muted-foreground leading-none">Global Rank</p>
             <p className="text-sm font-bold">#142 / 12,000</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKS.map(pack => (
          <Card key={pack.id} className="border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                {pack.icon}
              </div>
              <CardTitle className="text-lg font-headline leading-tight">{pack.title}</CardTitle>
              <Badge variant="secondary" className="w-fit mt-2">{pack.level}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between text-xs">
                   <span className="text-muted-foreground flex items-center gap-1"><BookOpen size={12} /> Questions</span>
                   <span className="font-bold">{pack.questions}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                   <span className="text-muted-foreground flex items-center gap-1"><Clock size={12} /> Time Limit</span>
                   <span className="font-bold">{pack.time}</span>
                 </div>
               </div>
            </CardContent>
            <CardFooter>
               <Button className="w-full gap-2">Start Pack <ChevronRight size={16} /></Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Daily Challenge</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="p-6 bg-slate-900 text-white rounded-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors" />
                <div className="relative z-10 flex items-center justify-between">
                   <div className="space-y-2">
                      <p className="text-xs font-bold text-primary tracking-widest uppercase">Limited Time</p>
                      <h4 className="text-2xl font-bold font-headline">Mixed Bag Blitz</h4>
                      <p className="text-sm text-white/70">15 Questions | 10 Minutes | Double XP</p>
                   </div>
                   <Button size="lg" className="bg-white text-black hover:bg-slate-200">Solve Now</Button>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {[
               { title: 'Logical Pack 1', score: '85%', date: 'Yesterday' },
               { title: 'Verbal Set B', score: '92%', date: '2 days ago' },
             ].map((s, i) => (
               <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-bold">{s.title}</p>
                    <p className="text-[10px] text-muted-foreground">{s.date}</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    <Star size={14} fill="currentColor" /> {s.score}
                  </div>
               </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
