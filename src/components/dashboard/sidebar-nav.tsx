"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';
import { authStore } from '@/lib/store';
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
  ShieldAlert
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
  { title: 'My Tests', href: '/dashboard/tests', icon: FileText, roles: ['student'] },
  { title: 'Assignments', href: '/dashboard/assignments', icon: BookOpen, roles: ['student'] },
  { title: 'Resources', href: '/dashboard/resources', icon: Code2, roles: ['student'] },
  // Teacher items
  { title: 'Manage Tests', href: '/dashboard/teacher/tests', icon: FileText, roles: ['teacher'] },
  { title: 'Manage Assignments', href: '/dashboard/teacher/assignments', icon: BookOpen, roles: ['teacher'] },
  { title: 'Performance', href: '/dashboard/teacher/analytics', icon: BarChart3, roles: ['teacher'] },
  { title: 'Subjects', href: '/dashboard/teacher/subjects', icon: BookOpen, roles: ['teacher'] },
  // Admin items
  { title: 'User Management', href: '/dashboard/admin/users', icon: Users, roles: ['admin'] },
  { title: 'System Logs', href: '/dashboard/admin/logs', icon: ShieldAlert, roles: ['admin'] },
  // Shared
  { title: 'Notifications', href: '/dashboard/notifications', icon: Bell, roles: ['student', 'teacher', 'admin'] },
  { title: 'Profile', href: '/dashboard/profile', icon: Settings, roles: ['student', 'teacher', 'admin'] },
];

export function SidebarNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authStore.logout();
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
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
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

      <div className="p-4 border-t border-white/10">
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