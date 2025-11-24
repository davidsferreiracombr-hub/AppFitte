import { getForumTopics } from '@/lib/forum';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community Forum | Fit Sweet Delights',
    description: 'Share tips, ask questions, and connect with other health enthusiasts.'
};

export default async function ForumPage() {
  const topics = await getForumTopics();

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Community Forum</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Share tips, ask questions, and connect with other health enthusiasts.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {topics.map((topic) => (
          <Link href="#" key={topic.id} className="block group">
            <Card className="hover:border-primary transition-colors duration-200">
              <CardHeader className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2">
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{topic.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2 text-sm">
                    <UserCircle className="h-4 w-4"/> 
                    <span>by {topic.author} &bull; {topic.date}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center justify-start md:justify-center">
                  <Badge variant="secondary">{topic.category}</Badge>
                </div>
                <div className="flex items-center justify-start md:justify-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-5 w-5"/>
                  <span>{topic.replies} replies</span>
                </div>
              </CardHeader>
              <CardFooter className="text-sm text-muted-foreground">
                <p>Last reply by <strong>{topic.lastReply.author}</strong> &bull; {topic.lastReply.date}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
