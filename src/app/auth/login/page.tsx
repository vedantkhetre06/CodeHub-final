"use client";
 
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Role, User } from "@/lib/types";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
 
import {
  Rocket,
  ArrowLeft,
  Loader2,
  UserPlus,
  LogIn,
} from "lucide-react";
 
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
 
// Firebase auth imports
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";
 
export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
 
  const initialRole = (searchParams.get("role") as Role) || "student";
 
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>(initialRole);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!email || !password) {
      toast({
        title: "Input Required",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
 
    if (isRegistering && !name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }
 
    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
 
    setIsLoading(true);
 
    try {
      const { app } = initializeFirebase();
      const auth = getAuth(app);
      const db = getFirestore(app);
 
      if (isRegistering) {
        // --- SIGN UP ---
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = credential.user;
 
        // Set display name in Firebase Auth
        await updateProfile(firebaseUser, { displayName: name.trim() });
 
        // Save user profile to Firestore
        const userData: User = {
          id: firebaseUser.uid,
          name: name.trim(),
          email: firebaseUser.email || email,
          role,
          branch: role === "student" ? "Computer Science" : undefined,
          year: role === "student" ? "1st" : undefined,
          github: "",
          leetcode: "",
        };
 
        await setDoc(doc(db, "users", firebaseUser.uid), userData);
 
        // Cache locally so the dashboard can read it immediately
        localStorage.setItem("codehub_user", JSON.stringify(userData));
 
        toast({
          title: "Welcome Aboard!",
          description: `Account created successfully. Welcome, ${userData.name}!`,
        });
 
        router.push("/dashboard");
      } else {
        // --- SIGN IN ---
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = credential.user;
 
        // Load profile from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
 
        let userData: User;
        if (userDoc.exists()) {
          userData = userDoc.data() as User;
        } else {
          // Fallback: build minimal profile if Firestore doc is missing
          userData = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || email.split("@")[0],
            email: firebaseUser.email || email,
            role,
            github: "",
            leetcode: "",
          };
          await setDoc(doc(db, "users", firebaseUser.uid), userData);
        }
 
        localStorage.setItem("codehub_user", JSON.stringify(userData));
 
        toast({
          title: "Welcome Back!",
          description: `Signed in as ${userData.name}`,
        });
 
        router.push("/dashboard");
      }
    } catch (error: any) {
      // Map Firebase error codes to friendly messages
      const code: string = error?.code || "";
      let description = "Please check your credentials and try again.";
 
      if (code === "auth/email-already-in-use") {
        description = "An account with this email already exists. Try signing in.";
      } else if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        description = "Invalid email or password.";
      } else if (code === "auth/invalid-email") {
        description = "Please enter a valid email address.";
      } else if (code === "auth/too-many-requests") {
        description = "Too many failed attempts. Please wait a moment and try again.";
      } else if (code === "auth/network-request-failed") {
        description = "Network error. Please check your internet connection.";
      } else if (code === "auth/api-key-not-valid") {
        description = "Firebase is not configured. Please set up environment variables.";
      }
 
      toast({
        title: isRegistering ? "Sign Up Failed" : "Sign In Failed",
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4 selection:bg-primary/20">
      
      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-headline font-bold text-3xl"
        >
          <Rocket className="w-10 h-10 fill-primary/10" />
          CodeHub
        </Link>
        <p className="text-muted-foreground font-medium">
          Empowering the next generation of engineers
        </p>
      </div>
 
      {/* Card */}
      <Card className="w-full max-w-md shadow-2xl border-none rounded-[2rem] overflow-hidden bg-card">
        
        {/* Header */}
        <CardHeader className="space-y-2 text-center pt-10 px-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            {isRegistering ? "Get Started" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-base">
            {isRegistering
              ? `Join as a ${role} to access your portal`
              : `Welcome back to the ${role} dashboard`}
          </CardDescription>
        </CardHeader>
 
        {/* Form */}
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleAuth} className="space-y-5">
 
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            )}
 
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
 
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                minLength={6}
              />
              {isRegistering && (
                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
              )}
            </div>
 
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isRegistering ? (
                <>
                  <UserPlus size={20} /> Create Account
                </>
              ) : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
 
        {/* Footer */}
        <CardFooter className="flex flex-col space-y-6 p-8">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isRegistering
              ? "Already have an account? Sign In"
              : "New here? Create an account"}
          </button>
 
          <div className="space-y-2 w-full">
            <p className="text-xs text-center text-muted-foreground uppercase tracking-wider font-semibold">
              {isRegistering ? "Registering as" : "Signing in as"}
            </p>
            <div className="flex gap-2 justify-center">
              {(["student", "teacher", "admin"] as Role[]).map((r) => (
                <Button
                  key={r}
                  type="button"
                  variant={role === r ? "default" : "outline"}
                  onClick={() => setRole(r)}
                  disabled={isLoading}
                  className="capitalize"
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>
 
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Back to main site
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
 