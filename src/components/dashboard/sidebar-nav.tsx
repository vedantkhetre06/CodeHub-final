"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  LogOut, 
  Bell, 
  Rocket,
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
  Lock,
  Settings,
  ChevronRight
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
  { title: 'Practice Lab', href: '/dashboard/practice', icon: Code2, roles: ['student'] },
  { title: 'My Assessments', href: '/dashboard/tests', icon: FileText, roles: ['student'] },
  { title: 'Coursework', href: '/dashboard/assignments', icon: BookOpen, roles: ['student'] },
  { title: 'Collaboration', href: '/dashboard/collaborative', icon: Users2, roles: ['student'] },
  { title: 'Aptitude Prep', href: '/dashboard/aptitude', icon: Trophy, roles: ['student'] },
  { title: 'Communications', href: '/dashboard/chat', icon: MessageSquare, roles: ['student', 'teacher'] },
  { title: 'Nearby Events', href: '/dashboard/events', icon: CalendarDays, roles: ['student', 'admin'] },
  { title: 'Resources', href: '/dashboard/resources', icon: BookOpen, roles: ['student'] },
  
  // Teacher items
  { title: 'Test Builder', href: '/dashboard/teacher/tests/new', icon: FileText, roles: ['teacher'] },
  { title: 'Insights', href: '/dashboard/teacher/analytics', icon: BarChart3, roles: ['teacher'] },
  { title: 'Gradebook', href: '/dashboard/teacher/assignments', icon: BookOpen, roles: ['teacher'] },
  { title: 'Curriculum', href: '/dashboard/teacher/subjects', icon: BookOpen, roles: ['teacher'] },
  
  // Admin items
  { title: 'Incidents', href: '/dashboard/admin/issues', icon: Bug, roles: ['admin'] },
  { title: 'Users', href: '/dashboard/admin/users', icon: Lock, roles: ['admin'] },
  { title: 'Audit Logs', href: '/dashboard/admin/logs', icon: ShieldAlert, roles: ['admin'] },
  
  // Shared
  { title: 'Notifications', href: '/dashboard/notifications', icon: Bell, roles: ['student', 'teacher', 'admin'] },
  { title: 'Preferences', href: '/dashboard/profile', icon: Settings, roles: ['student', 'teacher', 'admin'] },
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

  const handleLogout = () => {
    localStorage.removeItem('codehub_user');
    router.push('/');
  };

  const filteredItems = NAV_ITEMS.filter(item => item.roles.includes(role));

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-white/5">
      <div className="p-8">
        <div className="flex items-center gap-3 font-headline font-bold text-2xl text-white">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Rocket className="w-6 h-6 fill-white" />
          </div>
          <span>CodeHub</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <button
              key={item.href}
              className={cn(
                "group w-full flex items-center gap-3 px-4 h-12 rounded-2xl text-sm font-bold transition-all duration-300 relative",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-sidebar-foreground/60 hover:text-white hover:bg-white/5"
              )}
              onClick={() => router.push(item.href)}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-sidebar-foreground/40 group-hover:text-white")} />
              <span className="flex-1 text-left">{item.title}</span>
              {isActive && <ChevronRight className="w-4 h-4 animate-in fade-in slide-in-from-left-2" />}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-3">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-12 rounded-2xl font-bold text-sidebar-foreground/60 hover:text-white hover:bg-white/5"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          {theme === 'light' ? 'Dark Appearance' : 'Light Appearance'}
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-12 rounded-2xl font-bold text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
