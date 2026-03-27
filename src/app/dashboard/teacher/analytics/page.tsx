
"use client";

import { useState } from 'react';
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
  Users, 
  Award, 
  BookOpen, 
  AlertTriangle, 
  ArrowDownRight, 
  FileSpreadsheet, 
  Download,
  Filter
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

const DATA = [
  { name: '0-20%', count: 5 },
  { name: '21-40%', count: 12 },
  { name: '41-60%', count: 25 },
  { name: '61-80%', count: 45 },
  { name: '81-100%', count: 55 },
];

const TREND_DATA = [
  { name: 'Week 1', avg: 65 },
  { name: 'Week 2', avg: 68 },
  { name: 'Week 3', avg: 72 },
  { name: 'Week 4', avg: 70 },
  { name: 'Week 5', avg: 78 },
];

const PIE_DATA = [
  { name: 'A+', value: 15 },
  { name: 'A', value: 35 },
  { name: 'B', value: 45 },
  { name: 'C', value: 20 },
  { name: 'F', value: 7 },
];

const COLORS = ['#2989CC', '#52DBDB', '#f97316', '#ef4444', '#64748b'];

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [selectedTest, setSelectedTest] = useState("midterm-dsa");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Success!",
        description: "Marks have been exported to 'student_marks_export.xlsx' and uploaded to the institutional cloud storage.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Performance Analytics</h2>
          <p className="text-muted-foreground">Detailed insights into student and test performance.</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTest} onValueChange={setSelectedTest}>
            <SelectTrigger className="w-[200px] bg-card">
              <SelectValue placeholder="Select Test" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="midterm-dsa">Midterm DSA</SelectItem>
              <SelectItem value="dbms-lab">DBMS Lab Final</SelectItem>
              <SelectItem value="ca-theory">CA Theory Quiz 1</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" className="gap-2" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <Download className="w-4 h-4 animate-bounce" />
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
            Export to Spreadsheet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Class Avg</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.4%</div>
            <p className="text-xs text-muted-foreground">+2.1% from prev test</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <Award className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Alex Student (Section A)</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lowest Score</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.0%</div>
            <p className="text-xs text-muted-foreground">Requires remediation (5 students)</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-destructive/5 border-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cheating Flags</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Tab switching detected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Score Distribution</CardTitle>
            <CardDescription>Number of students per score bracket</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#2989CC" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Class Performance Trend</CardTitle>
            <CardDescription>Average score progression over semester</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="avg" stroke="#2989CC" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} name="Avg Score %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Grade Distribution</CardTitle>
            <CardDescription>Percentage breakdown of class grades</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Top Performing Students</CardTitle>
            <CardDescription>Highest scorers for {selectedTest}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Alex Student', score: '98.5%', rank: 1, status: 'Clear' },
                { name: 'Sarah Connor', score: '95.0%', rank: 2, status: 'Clear' },
                { name: 'Mark Miller', score: '94.2%', rank: 3, status: 'Clear' },
                { name: 'Emily Student', score: '92.0%', rank: 4, status: 'Clear' },
              ].map((student, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      #{student.rank}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{student.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Rank {student.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{student.score}</p>
                    <p className="text-[10px] text-green-600 font-medium">{student.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Detailed Result Sheet</CardTitle>
            <CardDescription>Individual student marks for direct moderation</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Download PDF Report
          </Button>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border border-border overflow-hidden">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="p-4 text-left font-semibold">Student Name</th>
                   <th className="p-4 text-left font-semibold">Objective Marks</th>
                   <th className="p-4 text-left font-semibold">Coding Marks</th>
                   <th className="p-4 text-left font-semibold">Warnings</th>
                   <th className="p-4 text-right font-semibold">Final Score</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { name: 'Alex Student', obj: '48/50', cod: '45/50', warn: 0, total: '93%' },
                   { name: 'Emily Student', obj: '42/50', cod: '40/50', warn: 0, total: '82%' },
                   { name: 'Kyle Reese', obj: '35/50', cod: '38/50', warn: 2, total: '73%' },
                   { name: 'Sarah Connor', obj: '49/50', cod: '46/50', warn: 0, total: '95%' },
                 ].map((row, i) => (
                   <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                     <td className="p-4 font-medium">{row.name}</td>
                     <td className="p-4">{row.obj}</td>
                     <td className="p-4">{row.cod}</td>
                     <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${row.warn > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {row.warn} Flags
                        </span>
                     </td>
                     <td className="p-4 text-right font-bold text-primary">{row.total}</td>
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

