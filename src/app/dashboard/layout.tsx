"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { Menu, Bell, Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('codehub_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50">
        <SidebarNav role={user.role} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-72 h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b bg-card/50 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1 max-w-xl">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-none">
                <SidebarNav role={user.role} />
              </SheetContent>
            </Sheet>
            
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search everything..." 
                className="pl-10 h-11 bg-muted/50 border-none rounded-2xl focus-visible:ring-1" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-background px-1.5 py-0.5 rounded border text-[10px] font-bold text-muted-foreground">
                <Command size={10} /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-2xl bg-muted/50">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse"></span>
            </Button>
            
            <div className="flex items-center gap-4 pl-6 border-l ml-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold leading-none">{user.name}</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1.5">{user.role}</p>
              </div>
              <Avatar className="w-11 h-11 border-2 border-primary/20 shadow-lg cursor-pointer hover:border-primary transition-colors" onClick={() => router.push('/dashboard/profile')}>
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}