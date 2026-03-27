"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Hash, Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const CHANNELS = ['General', 'DSA Doubts', 'Assignments', 'Job Alerts'];

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState('General');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Dr. Sarah', text: 'Has everyone submitted the DBMS assignment?', time: '10:30 AM' },
    { id: 2, user: 'Alex', text: 'I am stuck on Question 3. Can someone help?', time: '10:45 AM' },
    { id: 3, user: 'Emily', text: 'I can help! Meet in the lab.', time: '10:50 AM' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'You', text: newMsg, time: 'Now' }]);
    setNewMsg('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      <Card className="w-64 border-none shadow-sm hidden md:flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Channels</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-2">
          {CHANNELS.map(ch => (
            <Button
              key={ch}
              variant={activeChannel === ch ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2 mb-1"
              onClick={() => setActiveChannel(ch)}
            >
              <Hash size={16} /> {ch}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="flex-1 border-none shadow-sm flex flex-col overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/20 flex flex-row items-center justify-between">
           <div>
             <CardTitle className="text-xl">#{activeChannel}</CardTitle>
             <p className="text-xs text-muted-foreground">Chatting with the class</p>
           </div>
           <div className="relative w-48">
              <Search className="absolute left-2 top-2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-8 h-8 text-xs" placeholder="Search messages..." />
           </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full p-6">
            <div className="space-y-6">
              {messages.map(m => (
                <div key={m.id} className="flex gap-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {m.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{m.user}</span>
                      <span className="text-[10px] text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 p-3 rounded-2xl rounded-tl-none">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t border-border bg-muted/10">
          <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); sendMsg(); }}>
            <Input 
              placeholder={`Message #${activeChannel}`} 
              value={newMsg} 
              onChange={(e) => setNewMsg(e.target.value)} 
            />
            <Button type="submit" size="icon"><Send size={18} /></Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
