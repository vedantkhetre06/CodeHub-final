"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bug, AlertCircle, CheckCircle2, Search, Filter, MessageSquare } from 'lucide-react';

const ISSUES = [
  { id: 'ISS-001', title: 'Compiler Timeout on Python 3', status: 'Open', priority: 'High', reporter: 'alex@codehub.edu', time: '2 hours ago' },
  { id: 'ISS-002', title: 'SQL Result Set Mismatch', status: 'In Progress', priority: 'Medium', reporter: 'sarah@codehub.edu', time: '5 hours ago' },
  { id: 'ISS-003', title: 'Dark Mode Contrast in Sidebar', status: 'Resolved', priority: 'Low', reporter: 'emily@codehub.edu', time: 'Yesterday' },
  { id: 'ISS-004', title: 'Firestore Permission Denied', status: 'Open', priority: 'Urgent', reporter: 'admin@codehub.edu', time: '10 mins ago' },
];

export default function AdminIssuesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Issues & Bugs</h2>
          <p className="text-muted-foreground">Manage platform bug reports and student support tickets.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Filter size={18} /> All Status</Button>
          <Button className="gap-2"><Bug size={18} /> Generate System Audit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm bg-red-50 dark:bg-red-900/10">
            <CardContent className="p-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                     <AlertCircle size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-red-600">Open Tickets</p>
                     <p className="text-2xl font-bold">12</p>
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-blue-50 dark:bg-blue-900/10">
            <CardContent className="p-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                     <Bug size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-blue-600">In Progress</p>
                     <p className="text-2xl font-bold">04</p>
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-green-50 dark:bg-green-900/10">
            <CardContent className="p-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                     <CheckCircle2 size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-green-600">Resolved</p>
                     <p className="text-2xl font-bold">156</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by ticket ID or title..." />
           </div>
        </div>
        <div className="p-0">
           <table className="w-full text-sm">
             <thead className="bg-muted/50 border-b border-border">
               <tr>
                 <th className="p-4 text-left font-semibold">Issue</th>
                 <th className="p-4 text-left font-semibold">Status</th>
                 <th className="p-4 text-left font-semibold">Priority</th>
                 <th className="p-4 text-left font-semibold">Reporter</th>
                 <th className="p-4 text-right font-semibold">Action</th>
               </tr>
             </thead>
             <tbody>
               {ISSUES.map(issue => (
                 <tr key={issue.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                   <td className="p-4">
                     <p className="font-bold">{issue.title}</p>
                     <p className="text-xs text-muted-foreground">{issue.id} • Reported {issue.time}</p>
                   </td>
                   <td className="p-4">
                     <Badge variant={issue.status === 'Resolved' ? 'outline' : 'secondary'} className={issue.status === 'Resolved' ? 'text-green-600 bg-green-50' : ''}>
                       {issue.status}
                     </Badge>
                   </td>
                   <td className="p-4">
                     <span className={`text-xs font-bold ${
                       issue.priority === 'Urgent' ? 'text-red-600' : 
                       issue.priority === 'High' ? 'text-orange-600' : 'text-blue-600'
                     }`}>
                       {issue.priority}
                     </span>
                   </td>
                   <td className="p-4 text-xs font-medium">{issue.reporter}</td>
                   <td className="p-4 text-right">
                     <Button variant="ghost" size="sm" className="gap-2"><MessageSquare size={14} /> Respond</Button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </Card>
    </div>
  );
}
