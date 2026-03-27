
"use client";

import { useEffect, useState } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Edit2, Link2, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const docSnap = await getDoc(doc(db, "users", fbUser.uid));
          if (docSnap.exists()) setUser(docSnap.data() as User);
        } catch (err) {
          console.error("Error loading profile:", err);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, db]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.id), { ...user });
      toast({ title: "Profile Updated", description: "Your changes have been saved to Firestore." });
    } catch (err) {
      toast({ title: "Update Failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-headline font-bold">Account Settings</h2>
        <Button variant="outline" className="gap-2" onClick={handleUpdate} disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : <Edit2 size={16} />} Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 border-none shadow-sm h-fit">
          <CardContent className="pt-6 text-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
              <AvatarImage src={`https://picsum.photos/seed/${user.id}/200`} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-headline font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
               <div className="flex flex-col gap-2">
                 <div className="relative">
                   <Github className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
                   <Input 
                     className="pl-8 text-xs" 
                     placeholder="GitHub URL" 
                     value={user.github || ''} 
                     onChange={(e) => setUser({...user, github: e.target.value})}
                   />
                 </div>
                 <div className="relative">
                   <Link2 className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
                   <Input 
                     className="pl-8 text-xs" 
                     placeholder="LeetCode URL" 
                     value={user.leetcode || ''} 
                     onChange={(e) => setUser({...user, leetcode: e.target.value})}
                   />
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Institutional Information</CardTitle>
            <CardDescription>Your university record data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email} disabled />
              </div>
              {user.role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Input value={user.branch || ''} onChange={(e) => setUser({...user, branch: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input value={user.year || ''} onChange={(e) => setUser({...user, year: e.target.value})} />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
