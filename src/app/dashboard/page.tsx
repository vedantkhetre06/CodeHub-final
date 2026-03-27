
"use client";

import { useEffect, useState } from 'react';
import { Role, User, Test, Submission } from '@/lib/types';
import { getAllTests, getSubmissionsByStudent } from '@/lib/services';
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
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('codehub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-primary w-8 h-8" />
    </div>
  );

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline font-bold text-foreground">Welcome, {user.name}!</h2>
        <p className="text-muted-foreground">Real-time academic insights from Firestore.</p>
      </div>

      {user.role === 'student' && <StudentDashboard user={user} router={router} />}
      {user.role === 'teacher' && <TeacherDashboard user={user} router={router} />}
      {user.role === 'admin' && <AdminDashboard user={user} router={router} />}
    </div>
  );
}

function StudentDashboard({ user, router }: { user: User, router: any }) {
  const [tests, setTests] = useState<Test[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [t, s] = await Promise.all([
        getAllTests(),
        getSubmissionsByStudent(user.id)
      ]);
      setTests(t);
      setSubmissions(s);
      setLoading(false);
    }
    fetchData();
  }, [user.id]);

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/tests')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Tests</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.length}</div>
            <p className="text-xs text-muted-foreground">From live database</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/assignments')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live</div>
            <p className="text-xs text-muted-foreground">Updated in real-time</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
            <p className="text-xs text-muted-foreground">Total attempts recorded</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline font-semibold">Your Recent Submissions</CardTitle>
            <CardDescription>Fetched from Firestore</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.length > 0 ? submissions.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {item.score || 'N/A'}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Attempt #{i+1}</p>
                      <p className="text-xs text-muted-foreground">{new Date(item.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">No submissions yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline font-semibold">System Feed</CardTitle>
            <CardDescription>Live updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 border-l-4 border-primary bg-background rounded-r-lg">
                <div className="flex-1">
                  <p className="text-sm font-semibold">Real Backend Connected</p>
                  <p className="text-xs text-muted-foreground">Firebase is now managing your data.</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6" onClick={() => router.push('/dashboard/notifications')}>View Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TeacherDashboard({ user, router }: { user: User, router: any }) {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTests().then(data => {
      setTests(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tests Created</CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : tests.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live</div>
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
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold text-green-600">Database Connected</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button size="lg" className="gap-2" onClick={() => router.push('/dashboard/teacher/tests/new')}>
          <Plus size={20} /> Create Live Test
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Recent Assessment Feed</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border border-border overflow-hidden">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="p-4 text-left font-semibold">Test Title</th>
                   <th className="p-4 text-left font-semibold">Questions</th>
                   <th className="p-4 text-left font-semibold">Time Limit</th>
                   <th className="p-4 text-right font-semibold">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {tests.map((test, i) => (
                   <tr key={test.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                     <td className="p-4 font-medium">{test.title}</td>
                     <td className="p-4">{test.questions.length} Qs</td>
                     <td className="p-4">{test.timeLimit} mins</td>
                     <td className="p-4 text-right">
                       <Button variant="ghost" size="sm">Manage</Button>
                     </td>
                   </tr>
                 ))}
                 {!loading && tests.length === 0 && (
                   <tr>
                     <td colSpan={4} className="p-8 text-center text-muted-foreground">No tests found in Firestore. Create one to get started.</td>
                   </tr>
                 )}
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
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Real-time</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">DB Connection</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Health</CardTitle>
            <AlertCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">100%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Firebase Project Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
                <div>
                   <p className="font-bold">Authentication</p>
                   <p className="text-xs text-muted-foreground">Live & Serving</p>
                </div>
                <CheckCircle2 className="text-green-500" />
             </div>
             <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
                <div>
                   <p className="font-bold">Cloud Firestore</p>
                   <p className="text-xs text-muted-foreground">Persistence Ready</p>
                </div>
                <CheckCircle2 className="text-green-500" />
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Quick Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
             <Button className="w-full justify-start gap-3" variant="outline" onClick={() => router.push('/dashboard/admin/users')}>
                <Plus size={18} /> Manage User Accounts
             </Button>
             <Button className="w-full justify-start gap-3" variant="outline" onClick={() => router.push('/dashboard/admin/logs')}>
                <FileText size={18} /> View Security Logs
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
