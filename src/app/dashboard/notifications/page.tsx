"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Trash2, BookOpen, FileText, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const NOTIFICATIONS = [
    { id: 1, title: 'New Test Assigned', msg: 'Dr. Sarah has assigned "Midterm DSA" to your section.', type: 'test', time: '10 mins ago', unread: true },
    { id: 2, title: 'Assignment Graded', msg: 'Your submission for "Normalization Exercise" has been graded.', type: 'grade', time: '2 hours ago', unread: true },
    { id: 3, title: 'Resource Uploaded', msg: 'New PDF notes for Computer Architecture are now available.', type: 'resource', time: 'Yesterday', unread: false },
    { id: 4, title: 'System Maintenance', msg: 'The platform will be offline for 2 hours this Saturday.', type: 'admin', time: '2 days ago', unread: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your academic activities.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><CheckCircle size={16} /> Mark all read</Button>
          <Button variant="outline" size="sm" className="gap-2 text-destructive"><Trash2 size={16} /> Clear all</Button>
        </div>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map(note => (
          <Card key={note.id} className={`border-none shadow-sm transition-colors ${note.unread ? 'bg-primary/5' : 'bg-card'}`}>
            <CardContent className="p-4 flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                note.type === 'test' ? 'bg-blue-100 text-blue-600' : 
                note.type === 'grade' ? 'bg-green-100 text-green-600' : 
                note.type === 'resource' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {note.type === 'test' ? <FileText size={20} /> : 
                 note.type === 'grade' ? <CheckCircle size={20} /> : 
                 note.type === 'resource' ? <BookOpen size={20} /> : <AlertCircle size={20} />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm">{note.title}</h4>
                    {note.unread && <Badge className="h-2 w-2 rounded-full p-0" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{note.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{note.msg}</p>
                <div className="pt-2">
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}