
"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Role, User } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Loader2, UserPlus, LogIn } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'student';
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>(initialRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Input Required", description: "Please enter both email and password.", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Bypassing real Firebase Auth for Demo Mode
      // We generate a unique ID and save to localStorage
      const mockUid = Math.random().toString(36).substring(7);
      
      const userData: User = {
        id: mockUid,
        name: name || email.split('@')[0],
        email: email,
        role: role,
        branch: role === 'student' ? 'Computer Science' : undefined,
        year: role === 'student' ? '1st' : undefined,
        github: '',
        leetcode: ''
      };

      localStorage.setItem('codehub_user', JSON.stringify(userData));
      
      toast({ 
        title: isRegistering ? "Account Created (Demo Mode)" : "Logged In (Demo Mode)", 
        description: `Welcome to CodeHub, ${userData.name}` 
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({ 
        title: "Auth Error", 
        description: "Something went wrong during local login simulation.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
          <CardTitle className="text-2xl font-headline font-bold">
            {isRegistering ? "Create Account" : "Secure Login"}
          </CardTitle>
          <CardDescription>
            {isRegistering 
              ? `Join as a ${role} to get started` 
              : `Enter your credentials to access your ${role} dashboard`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="user@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full h-11 text-base font-semibold gap-2" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : isRegistering ? (
                  <><UserPlus size={18} /> Register Now</>
                ) : (
                  <><LogIn size={18} /> Sign In</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center w-full">
            <button 
              type="button"
              className="text-sm text-primary hover:underline font-medium"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering 
                ? "Already have an account? Sign In" 
                : "Don't have an account? Create one"}
            </button>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Account Type
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 justify-center">
            {(['student', 'teacher', 'admin'] as Role[]).map((r) => (
              <Button 
                key={r} 
                variant={role === r ? 'default' : 'outline'} 
                size="sm"
                className="capitalize h-8 text-xs"
                onClick={() => setRole(r)}
                disabled={isLoading}
              >
                {r}
              </Button>
            ))}
          </div>
          
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors mx-auto">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
