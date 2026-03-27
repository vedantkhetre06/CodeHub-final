"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Link as LinkIcon, ExternalLink, Search } from 'lucide-react';
import { MOCK_RESOURCES } from '@/lib/mock-data';
import { Input } from "@/components/ui/input";

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Academic Resources</h2>
          <p className="text-muted-foreground">Download notes, watch tutorials, and access references.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search resources..." className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_RESOURCES.map(res => (
          <Card key={res.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <Badge variant="secondary" className="w-fit mb-2">{res.subject}</Badge>
              <CardTitle className="text-lg font-headline flex items-start justify-between gap-2">
                {res.title}
                {res.type === 'pdf' ? <FileText className="w-5 h-5 text-red-500 shrink-0" /> : <LinkIcon className="w-5 h-5 text-blue-500 shrink-0" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2" asChild>
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  {res.type === 'pdf' ? <Download size={16} /> : <ExternalLink size={16} />}
                  {res.type === 'pdf' ? 'Download PDF' : 'Visit Link'}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-headline font-semibold mb-4">Video Lectures</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="overflow-hidden border-none shadow-sm group cursor-pointer">
              <div className="aspect-video bg-muted relative">
                <img 
                  src={`https://picsum.photos/seed/${i + 10}/400/225`} 
                  alt="Video thumbnail"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium line-clamp-1">Lecture {i}: Advanced Algorithms</p>
                <p className="text-xs text-muted-foreground">Duration: 45:00</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}