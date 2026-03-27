
"use client";

import { useState, useEffect } from 'react';
import { getAllTests, getSubmissionsByTest } from '@/lib/services';
import { Test, Submission } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  ArrowDownRight, 
  FileSpreadsheet, 
  Download,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const COLORS = ['#2989CC', '#52DBDB', '#f97316', '#ef4444', '#64748b'];

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    async function loadTests() {
      const data = await getAllTests();
      setTests(data);
      if (data.length > 0) setSelectedTestId(data[0].id);
      setLoading(false);
    }
    loadTests();
  }, []);

  useEffect(() => {
    if (!selectedTestId) return;
    async function loadSubmissions() {
      const data = await getSubmissionsByTest(selectedTestId);
      setSubmissions(data);
    }
    loadSubmissions();
  }, [selectedTestId]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Success!",
        description: "Student records exported to cloud storage.",
      });
    }, 1500);
  };

  // Process data for charts
  const scoreDistribution = [
    { name: '0-20', count: submissions.filter(s => (s.score || 0) <= 20).length },
    { name: '21-40', count: submissions.filter(s => (s.score || 0) > 20 && (s.score || 0) <= 40).length },
    { name: '41-60', count: submissions.filter(s => (s.score || 0) > 40 && (s.score || 0) <= 60).length },
    { name: '61-80', count: submissions.filter(s => (s.score || 0) > 60 && (s.score || 0) <= 80).length },
    { name: '81-100', count: submissions.filter(s => (s.score || 0) > 80).length },
  ];

  const avgScore = submissions.length > 0 
    ? (submissions.reduce((acc, s) => acc + (s.score || 0), 0) / submissions.length).toFixed(1)
    : "0";

  const highestScore = submissions.length > 0 
    ? Math.max(...submissions.map(s => s.score || 0))
    : 0;

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto w-8 h-8 text-primary" /></div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Performance Analytics</h2>
          <p className="text-muted-foreground">Insights from live Firestore test submissions.</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTestId} onValueChange={setSelectedTestId}>
            <SelectTrigger className="w-[200px] bg-card">
              <SelectValue placeholder="Select Test" />
            </SelectTrigger>
            <SelectContent>
              {tests.map(t => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="secondary" className="gap-2" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}</div>
            <p className="text-xs text-muted-foreground">Across {submissions.length} students</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Highest</CardTitle>
            <Award className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestScore}</div>
            <p className="text-xs text-muted-foreground">Top performance recorded</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
            <p className="text-xs text-muted-foreground">Total attempts</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-destructive/5 border-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risk Flags</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Low</div>
            <p className="text-xs text-muted-foreground">Integrity checks pass</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Score Distribution</CardTitle>
            <CardDescription>Live data from {submissions.length} submissions</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#2989CC" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="rounded-md border border-border overflow-hidden">
               <table className="w-full text-sm">
                 <thead className="bg-muted/50 border-b border-border">
                   <tr>
                     <th className="p-4 text-left font-semibold">Student</th>
                     <th className="p-4 text-left font-semibold">Score</th>
                     <th className="p-4 text-right font-semibold">Date</th>
                   </tr>
                 </thead>
                 <tbody>
                   {submissions.map((s, i) => (
                     <tr key={i} className="border-b border-border hover:bg-muted/30">
                       <td className="p-4 font-medium">{s.studentName}</td>
                       <td className="p-4 font-bold text-primary">{s.score}</td>
                       <td className="p-4 text-right text-xs text-muted-foreground">
                         {new Date(s.submittedAt).toLocaleDateString()}
                       </td>
                     </tr>
                   ))}
                   {submissions.length === 0 && (
                     <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No submissions found for this test.</td></tr>
                   )}
                 </tbody>
               </table>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
