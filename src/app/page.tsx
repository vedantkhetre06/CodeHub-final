"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { GraduationCap, Code2, Users2, Rocket, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('codehub_user');
    if (savedUser) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-headline font-bold text-2xl text-primary">
            <Rocket className="w-8 h-8 fill-primary/20" />
            <span>CodeHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
            <Link href="/auth/login" className="hover:text-primary transition-colors">Sign In</Link>
            <Button onClick={() => router.push('/auth/login?role=student')} size="sm" className="rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Zap className="w-4 h-4 fill-primary" />
            <span>The Future of Academic Management</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tight text-foreground max-w-5xl mx-auto leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Learn, Code, and <span className="text-primary italic">Collaborate</span> with Ease.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed animate-in fade-in duration-1000 delay-300">
            A unified ecosystem for students and educators. From real-time code execution to AI-powered grading, manage your entire academic lifecycle in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-in fade-in duration-1000 delay-500">
            <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold gap-2 group shadow-xl shadow-primary/20" onClick={() => router.push('/auth/login?role=student')}>
              Enter Student Portal <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold" onClick={() => router.push('/auth/login?role=teacher')}>
              I'm an Educator
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold">Everything you need in one hub</h2>
            <p className="text-muted-foreground">Purpose-built tools for the modern university experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Code2 className="w-8 h-8" />} 
              title="IDE Integration" 
              description="Built-in code editor supporting 10+ languages with real-time compilation and execution."
            />
            <FeatureCard 
              icon={<Users2 className="w-8 h-8" />} 
              title="Pair Programming" 
              description="Collaborate with peers in real-time. Share code, chat, and solve problems together."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8" />} 
              title="Secure Testing" 
              description="AI-monitored assessment environment with tab-switch detection and performance analytics."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-headline font-bold text-xl opacity-50">
            <Rocket className="w-6 h-6" />
            <span>CodeHub</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            © 2024 CodeHub Academic Systems. Designed for the next generation.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-card border border-border/50 card-hover">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-headline font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}