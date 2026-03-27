
"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Role, User } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'student';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(initialRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For a demo/prototype, we'll try to login first, if it fails, we auto-create 
      // This makes testing the "Full Backend" easier for you immediately.
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        if (err.code === 'auth/user-not-found') {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // Create profile in Firestore
          const newUser: User = {
            id: userCredential.user.uid,
            name: email.split('@')[0],
            email: email,
            role: role,
            branch: role === 'student' ? 'Computer Science' : undefined,
            year: role === 'student' ? '3rd' : undefined
          };
          await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        } else {
          throw err;
        }
      }

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        // Check if role matches if you want strict role selection, 
        // but for now let's just proceed
        localStorage.setItem('codehub_user', JSON.stringify(userData));
        toast({ title: "Welcome back!", description: `Logged in as ${userData.name}` });
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast({ 
        title: "Authentication Error", 
        description: error.message,
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
          <CardTitle className="text-2xl font-headline font-bold">Secure Access</CardTitle>
          <CardDescription>
            Enter your credentials to access your {role} dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@university.edu" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In / Register"}
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
                Select your Role
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
                disabled={isLoading}
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
