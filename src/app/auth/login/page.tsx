"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Role, User } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Rocket, ArrowLeft, Loader2, UserPlus, LogIn, ChevronRight } from "lucide-react";
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
      // Simulate real auth for Demo Mode
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
        title: isRegistering ? "Welcome Aboard!" : "Welcome Back!", 
        description: `Successfully authenticated as ${userData.name}` 
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({ 
        title: "Authentication Failed", 
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4 selection:bg-primary/20">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-primary font-headline font-bold text-3xl">
          <Rocket className="w-10 h-10 fill-primary/10" />
          CodeHub
        </Link>
        <p className="text-muted-foreground font-medium">Empowering the next generation of engineers</p>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-none rounded-[2rem] overflow-hidden bg-card">
        <CardHeader className="space-y-2 text-center pt-10 px-8">
          <CardTitle className="text-3xl font-headline font-extrabold tracking-tight">
            {isRegistering ? "Get Started" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-base">
            {isRegistering 
              ? `Join as a ${role} to access your portal` 
              : `Welcome back to the ${role} dashboard`}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</Label>
                <Input 
                  id="name" 
                  className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-all"
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-all"
                placeholder="user@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest ml-1">Password</Label>
              <Input 
                id="password" 
                type="password" 
                className="h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background transition-all"
                placeholder="••••••••"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold gap-2 mt-4 shadow-lg shadow-primary/20" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isRegistering ? (
                <><UserPlus size={20} /> Create Account</>
              ) : (
                <><LogIn size={20} /> Sign In</>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 bg-muted/20 p-8 border-t">
          <div className="text-center w-full">
            <button 
              type="button"
              className="text-sm text-foreground/70 hover:text-primary font-bold flex items-center justify-center gap-1 mx-auto group transition-colors"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering 
                ? "Already have an account? Sign In" 
                : "New here? Create an account"}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-center text-muted-foreground opacity-50">Select Account Type</p>
            <div className="flex gap-2 justify-center">
              {(['student', 'teacher', 'admin'] as Role[]).map((r) => (
                <Button 
                  key={r} 
                  variant={role === r ? 'default' : 'outline'} 
                  size="sm"
                  className="capitalize h-9 rounded-xl text-xs font-bold px-4"
                  onClick={() => setRole(r)}
                  disabled={isLoading}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>
          
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors mx-auto font-medium">
            <ArrowLeft size={12} /> Back to main site
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}