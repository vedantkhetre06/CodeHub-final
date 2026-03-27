"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Filter, MoreHorizontal, Shield, Mail } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage accounts for students, teachers, and admins.</p>
        </div>
        <Button className="gap-2">
          <UserPlus size={20} /> Add New User
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search name or email..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2"><Filter size={16} /> Filter</Button>
              <Button variant="outline">Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
           <div className="rounded-md border border-border overflow-hidden">
             <table className="w-full text-sm">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                   <th className="p-4 text-left font-semibold">User</th>
                   <th className="p-4 text-left font-semibold">Role</th>
                   <th className="p-4 text-left font-semibold">Status</th>
                   <th className="p-4 text-left font-semibold">Details</th>
                   <th className="p-4 text-right font-semibold">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {MOCK_USERS.map((user, i) => (
                   <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                     <td className="p-4">
                       <div className="flex items-center gap-3">
                         <Avatar className="w-8 h-8">
                           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                         </Avatar>
                         <div>
                           <p className="font-medium">{user.name}</p>
                           <p className="text-xs text-muted-foreground flex items-center gap-1">
                             <Mail size={10} /> {user.email}
                           </p>
                         </div>
                       </div>
                     </td>
                     <td className="p-4">
                       <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'teacher' ? 'secondary' : 'outline'} className="capitalize">
                         {user.role}
                       </Badge>
                     </td>
                     <td className="p-4">
                       <span className="flex items-center gap-1 text-green-600 font-medium text-xs">
                         <Shield size={12} /> Active
                       </span>
                     </td>
                     <td className="p-4 text-xs text-muted-foreground">
                       {user.branch ? `${user.branch} - ${user.year}` : 'Institutional Access'}
                     </td>
                     <td className="p-4 text-right">
                       <Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button>
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