"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  GraduationCap,
  Code2,
  BarChart3,
  ShieldAlert,
  Moon,
  Sun,
  MessageSquare,
  Users2,
  Trophy,
  CalendarDays,
  Bug,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['student', 'teacher', 'admin'] },
  // Student items
  { title: 'Practice (Editor)', href: '/dashboard/practice', icon: Code2, roles: ['student'] },
  { title: 'My Tests', href: '/dashboard/tests', icon: FileText, roles: ['student'] },
  { title: 'Assignments', href: '/dashboard/assignments', icon: BookOpen, roles: ['student'] },
  { title: 'Collaborative Editor', href: '/dashboard/collaborative', icon: Users2, roles: ['student'] },
  { title: 'Aptitude', href: '/dashboard/aptitude', icon: Trophy, roles: ['student'] },
  { title: 'Chat', href: '/dashboard/chat', icon: MessageSquare, roles: ['student', 'teacher'] },
  { title: 'Nearby Events', href: '/dashboard/events', icon: CalendarDays, roles: ['student', 'admin'] },
  { title: 'Resources', href: '/dashboard/resources', icon: BookOpen, roles: ['student'] },
  
  // Teacher items
  { title: 'Create Test', href: '/dashboard/teacher/tests/new', icon: FileText, roles: ['teacher'] },
  { title: 'Report Analysis', href: '/dashboard/teacher/analytics', icon: BarChart3, roles: ['teacher'] },
  { title: 'Manage Assignments', href: '/dashboard/teacher/assignments', icon: BookOpen, roles: ['teacher'] },
  { title: 'Notes Management', href: '/dashboard/teacher/subjects', icon: BookOpen, roles: ['teacher'] },
  
  // Admin items
  { title: 'Issues & Bugs', href: '/dashboard/admin/issues', icon: Bug, roles: ['admin'] },
  { title: 'Access Management', href: '/dashboard/admin/users', icon: Lock, roles: ['admin'] },
  { title: 'System Logs', href: '/dashboard/admin/logs', icon: ShieldAlert, roles: ['admin'] },
  
  // Shared
  { title: 'Notifications', href: '/dashboard/notifications', icon: Bell, roles: ['student', 'teacher', 'admin'] },
  { title: 'Profile', href: '/dashboard/profile', icon: Settings, roles: ['student', 'teacher', 'admin'] },
];

export function SidebarNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('codehub_user');
    router.push('/');
  };

  const filteredItems = NAV_ITEMS.filter(item => item.roles.includes(role));

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-6">
        <div className="flex items-center gap-2 font-headline font-bold text-xl text-sidebar-primary">
          <GraduationCap className="w-8 h-8" />
          <span>CodeHub</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-11 font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                  : "hover:bg-white/10 text-sidebar-foreground/80 hover:text-white"
              )}
              onClick={() => router.push(item.href)}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-11 font-medium text-white/70 hover:text-white hover:bg-white/10"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-11 font-medium text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
