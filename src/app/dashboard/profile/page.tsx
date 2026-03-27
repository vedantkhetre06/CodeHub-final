"use client";

import { useEffect, useState } from 'react';
import { authStore } from '@/lib/store';
import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Building, MapPin, Edit2, ShieldCheck, GraduationCap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setUser(authStore.getUser());
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-headline font-bold">Your Profile</h2>
        <Button variant="outline" className="gap-2">
          <Edit2 size={16} /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 border-none shadow-sm h-fit">
          <CardContent className="pt-6 text-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
              <AvatarImage src={`https://picsum.photos/seed/${user.id}/200`} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-headline font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
               {user.github && (
                 <a href={user.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-primary hover:underline">
                   <Github size={16} /> GitHub Profile
                 </a>
               )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Account Details</CardTitle>
            <CardDescription>Manage your institutional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Mail size={12} /> Email Address
                </Label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShieldCheck size={12} /> Role
                </Label>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
              {user.branch && (
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building size={12} /> Branch / Department
                  </Label>
                  <p className="font-medium">{user.branch}</p>
                </div>
              )}
              {user.section && (
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin size={12} /> Section
                  </Label>
                  <p className="font-medium">{user.section}</p>
                </div>
              )}
              {user.year && (
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <GraduationCap size={12} /> Year
                  </Label>
                  <p className="font-medium">{user.year} Year</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-border">
              <h4 className="font-headline font-semibold mb-4">Security</h4>
              <div className="space-y-4">
                 <div className="space-y-2">
                   <Label>Current Password</Label>
                   <Input type="password" placeholder="••••••••" />
                 </div>
                 <Button onClick={() => toast({ title: "Password update requested" })}>
                   Change Password
                 </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}