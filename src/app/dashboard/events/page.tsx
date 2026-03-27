"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, ArrowRight, Bell } from 'lucide-react';

const EVENTS = [
  { id: 1, title: 'Hack University 2024', date: 'May 25, 2024', time: '09:00 AM', location: 'Main Auditorium', type: 'Hackathon', participants: 450, description: 'The annual flagship hackathon of the university with massive prizes.' },
  { id: 2, title: 'AI Ethics Seminar', date: 'May 28, 2024', time: '02:00 PM', location: 'Seminar Hall B', type: 'Workshop', participants: 120, description: 'A deep dive into the legal and ethical implications of generative AI.' },
  { id: 3, title: 'Google DSC Meetup', date: 'June 02, 2024', time: '11:00 AM', location: 'Open Grounds', type: 'Networking', participants: 200, description: 'Connect with developers from across the campus over coffee.' },
];

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Nearby Events</h2>
          <p className="text-muted-foreground">Events happening in your campus and city.</p>
        </div>
        <Button variant="outline" className="gap-2"><Bell size={18} /> Notify Me</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {EVENTS.map(event => (
            <Card key={event.id} className="border-none shadow-sm group">
              <CardContent className="p-0 flex flex-col md:flex-row">
                 <div className="w-full md:w-48 bg-muted/50 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border">
                    <span className="text-xs font-bold uppercase text-primary">{event.date.split(',')[0].split(' ')[0]}</span>
                    <span className="text-4xl font-bold font-headline">{event.date.split(',')[0].split(' ')[1]}</span>
                    <span className="text-sm text-muted-foreground mt-1">{event.time}</span>
                 </div>
                 <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                       <Badge className="bg-primary/10 text-primary border-none">{event.type}</Badge>
                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users size={14} /> {event.participants}+ Joining
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{event.title}</h3>
                       <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin size={14} /> {event.location}
                       </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    <div className="pt-2">
                       <Button variant="secondary" className="w-full md:w-auto gap-2">RSVP Now <ArrowRight size={16} /></Button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm">
             <CardHeader>
                <CardTitle className="text-xl">Calendar View</CardTitle>
                <CardDescription>Visual timeline of upcoming events</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                   <div className="text-center space-y-2">
                      <CalendarDays size={48} className="mx-auto text-muted-foreground/50" />
                      <p className="text-sm font-medium text-muted-foreground">Interactive Calendar Integration Coming Soon</p>
                   </div>
                </div>
             </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
             <CardHeader>
                <CardTitle className="text-xl">Host an Event?</CardTitle>
                <CardDescription className="text-primary-foreground/80">Get administrative approval for your technical club event.</CardDescription>
             </CardHeader>
             <CardContent>
                <Button className="bg-white text-black hover:bg-slate-200 w-full">Apply for Venue</Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
