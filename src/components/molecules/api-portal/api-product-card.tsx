import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/atoms/icon";

export interface ApiProductCardProps {
  iconName: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export function ApiProductCard({
  iconName,
  title,
  description,
  tags,
  href,
}: ApiProductCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Icon name={iconName} className="h-8 w-8 text-gray-500" />
        <div className="flex-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>Learn More & Subscribe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 