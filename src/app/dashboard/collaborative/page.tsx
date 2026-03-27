"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users2, Plus, Copy, Video } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function CollaborativeEditor() {
  const [roomId, setRoomId] = useState('DSA-ROOM-101');
  const [participants, setParticipants] = useState(['Alex', 'Emily', 'Sarah']);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Collaborative Coding</h2>
          <p className="text-muted-foreground">Pair program with your peers in real-time.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border border-border">
            <span className="text-xs font-bold">Room ID:</span>
            <code className="text-xs font-bold text-primary">{roomId}</code>
            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy size={12} /></Button>
          </div>
          <Button variant="secondary" className="gap-2"><Plus size={16} /> New Room</Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700"><Video size={16} /> Join Call</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
        <Card className="lg:col-span-3 border-none shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
             <Badge variant="outline" className="gap-2 px-3 py-1">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Session
             </Badge>
             <span className="text-xs text-muted-foreground font-code">shared_workspace.js</span>
          </div>
          <div className="flex-1 relative bg-slate-950">
            <Textarea 
              className="w-full h-full font-code text-sm text-slate-100 border-none focus-visible:ring-0 p-8 resize-none bg-transparent"
              placeholder="// Write collaborative code here..."
              defaultValue={`function solveProblem(input) {\n  // Collaborative coding session\n  console.log("Hello Room!");\n}`}
            />
            <div className="absolute top-10 right-10 flex -space-x-2">
               {participants.map(p => (
                 <div key={p} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-950">
                   {p.charAt(0)}
                 </div>
               ))}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-1 border-none shadow-sm flex flex-col h-full">
           <CardHeader>
             <CardTitle className="text-lg flex items-center gap-2">
               <Users2 size={20} /> Active Peers
             </CardTitle>
           </CardHeader>
           <CardContent className="flex-1 space-y-4">
              {participants.map(p => (
                <div key={p} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                       {p.charAt(0)}
                     </div>
                     <span className="text-sm font-medium">{p}</span>
                   </div>
                   <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                 <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">Session Chat</p>
                 <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    <p className="text-xs bg-muted p-2 rounded"><strong>Alex:</strong> Let's fix the loop condition.</p>
                    <p className="text-xs bg-muted p-2 rounded"><strong>Emily:</strong> I updated the base case.</p>
                 </div>
                 <div className="flex gap-2">
                    <Input className="h-8 text-xs" placeholder="Say something..." />
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
