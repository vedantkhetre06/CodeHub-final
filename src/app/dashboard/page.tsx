"use client";

import { useEffect, useState } from 'react';
import { authStore } from '@/lib/store';
import { User, Role } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BookOpen, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Users, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(authStore.getUser());
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold text-foreground">Welcome, {user.name}!</h2>
        <p className="text-muted-foreground">Here is what is happening in CodeHub today.</p>
      </div>

      {user.role === 'student' && <StudentDashboard user={user} router={router} />}
      {user.role === 'teacher' && <TeacherDashboard user={user} router={router} />}
      {user.role === 'admin' && <AdminDashboard user={user} router={router} />}
    </div>
  );
}

function StudentDashboard({ user, router }: { user: User, router: any }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/tests')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next: DSA Midterm in 2 days</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/assignments')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">1 overdue since yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline font-semibold">Recent Performance</CardTitle>
            <CardDescription>Your last 5 test scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'DSA Midterm', score: 85, date: 'May 1, 2024' },
                { name: 'DBMS Lab', score: 92, date: 'Apr 25, 2024' },
                { name: 'CA Theory', score: 76, date: 'Apr 20, 2024' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {item.score}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">View All Activity</Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline font-semibold">Notifications</CardTitle>
            <CardDescription>Latest updates from your teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'New Test Released', body: 'Midterm DSA is now available for practice.', type: 'test' },
                { title: 'Assignment Due', body: 'Database Normalization assignment due tomorrow.', type: 'assignment' },
                { title: 'System Announcement', body: 'Maintenance scheduled for Saturday night.', type: 'admin' },
              ].map((note, i) => (
                <div key={i} className="flex gap-4 p-3 border-l-4 border-primary bg-background rounded-r-lg">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{note.title}</p>
                    <p className="text-xs text-muted-foreground">{note.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">View Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TeacherDashboard({ user, router }: { user: User, router: any }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Graded</CardTitle>
            <Clock className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button size="lg" className="gap-2" onClick={() => router.push('/dashboard/teacher/tests/new')}>
          <Plus size={20} /> Create New Test
        </Button>
        <Button variant="outline" size="lg" className="gap-2" onClick={() => router.push('/dashboard/teacher/assignments/new')}>
          <Plus size={20} /> Create Assignment
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Recent Student Submissions</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border border-border overflow-hidden">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="p-4 text-left font-semibold">Student</th>
                   <th className="p-4 text-left font-semibold">Subject</th>
                   <th className="p-4 text-left font-semibold">Type</th>
                   <th className="p-4 text-left font-semibold">Status</th>
                   <th className="p-4 text-right font-semibold">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { name: 'Alex Student', subject: 'DSA', type: 'Test', status: 'Submitted' },
                   { name: 'Emily Student', subject: 'DBMS', type: 'Assignment', status: 'Pending Review' },
                   { name: 'Mark Miller', subject: 'DSA', type: 'Test', status: 'Submitted' },
                 ].map((sub, i) => (
                   <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                     <td className="p-4">{sub.name}</td>
                     <td className="p-4">{sub.subject}</td>
                     <td className="p-4">{sub.type}</td>
                     <td className="p-4">
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                         {sub.status}
                       </span>
                     </td>
                     <td className="p-4 text-right">
                       <Button variant="ghost" size="sm">Grade</Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard({ user, router }: { user: User, router: any }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Errors</CardTitle>
            <AlertCircle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sarah Connor', email: 's.connor@codehub.edu', role: 'Student' },
                { name: 'Kyle Reese', email: 'k.reese@codehub.edu', role: 'Student' },
                { name: 'Dr. Silberman', email: 'p.silberman@codehub.edu', role: 'Teacher' },
              ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                   <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-muted rounded text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{u.role}</span>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 w-full justify-center gap-2">
               Manage All Users <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
             <Button className="w-full justify-start gap-3" variant="outline">
                <Plus size={18} /> New User Account
             </Button>
             <Button className="w-full justify-start gap-3" variant="outline">
                <FileText size={18} /> System Audit Logs
             </Button>
             <Button className="w-full justify-start gap-3" variant="outline">
                <ShieldAlert size={18} /> Moderate Content
             </Button>
             <Button className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/5" variant="ghost">
                <AlertCircle size={18} /> Emergency Lockout
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}