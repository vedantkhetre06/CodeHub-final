"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Info, AlertTriangle, Terminal, Clock, User } from 'lucide-react';

const LOGS = [
  { id: 1, type: 'info', action: 'User Login', user: 'alex@codehub.edu', time: '2 mins ago', details: 'Successful login from Chrome / Windows' },
  { id: 2, type: 'warning', action: 'Unauthorized Access', user: 'unknown-ip', time: '15 mins ago', details: 'Attempted access to admin/logs from 192.168.1.5' },
  { id: 3, type: 'info', action: 'Test Created', user: 'sarah@codehub.edu', time: '1 hour ago', details: 'Midterm DSA assessment published to Section A' },
  { id: 4, type: 'danger', action: 'System Error', user: 'system', time: '3 hours ago', details: 'Failed to process AI Bulk Generation request #542' },
  { id: 5, type: 'info', action: 'Password Changed', user: 'emily@codehub.edu', time: 'Yesterday', details: 'Student updated profile security settings' },
];

export default function AdminLogsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold">System Audit Logs</h2>
        <p className="text-muted-foreground">Monitor platform activities and security events.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {LOGS.map(log => (
          <Card key={log.id} className="border-none shadow-sm overflow-hidden">
            <div className={`h-1 w-full ${
              log.type === 'info' ? 'bg-blue-500' : 
              log.type === 'warning' ? 'bg-orange-500' : 'bg-destructive'
            }`} />
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                log.type === 'info' ? 'bg-blue-50 text-blue-600' : 
                log.type === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
              }`}>
                {log.type === 'info' ? <Info size={20} /> : 
                 log.type === 'warning' ? <AlertTriangle size={20} /> : <ShieldAlert size={20} />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">{log.action}</h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {log.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{log.details}</p>
                <div className="pt-2 flex items-center gap-3">
                  <Badge variant="outline" className="text-[10px] py-0 h-5 flex items-center gap-1 font-normal">
                    <User size={10} /> {log.user}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] py-0 h-5 font-normal uppercase">
                    {log.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm bg-slate-950 text-slate-300 font-code p-6">
        <div className="flex items-center gap-2 text-slate-500 mb-4 border-b border-slate-800 pb-2">
          <Terminal size={16} /> <span className="text-xs uppercase tracking-widest font-bold">Real-time Stream</span>
        </div>
        <div className="space-y-2 text-xs">
          <p><span className="text-green-500">[2024-05-20 14:32:01]</span> INFO: API endpoint /v1/tests/get-all latency 45ms</p>
          <p><span className="text-green-500">[2024-05-20 14:32:15]</span> INFO: Genkit flow 'provideCodeFeedbackFlow' initiated by user_3</p>
          <p><span className="text-orange-400">[2024-05-20 14:32:45]</span> WARN: Rate limit near threshold for client 192.168.1.102</p>
          <p><span className="text-slate-500 animate-pulse">_</span></p>
        </div>
      </Card>
    </div>
  );
}