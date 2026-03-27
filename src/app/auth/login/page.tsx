"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authStore } from '@/lib/store';
import { Role } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'student';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(initialRole);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authStore.login(email, role);
    if (user) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try: admin@codehub.edu, sarah@codehub.edu, or alex@codehub.edu');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
             <Link href="/" className="inline-flex items-center gap-2 text-primary font-headline font-bold text-2xl">
                <GraduationCap size={28} />
                CodeHub
             </Link>
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Welcome back</CardTitle>
          <CardDescription>
            Log in to your {role} account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Role Management
              </span>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            {(['student', 'teacher', 'admin'] as Role[]).map((r) => (
              <Button 
                key={r} 
                variant={role === r ? 'default' : 'outline'} 
                size="sm"
                className="capitalize"
                onClick={() => setRole(r)}
              >
                {r}
              </Button>
            ))}
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} /> Back to selection
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}