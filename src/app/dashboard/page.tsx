import { Dashboard } from "@/components/organisms/dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="frosted-glass-background">
      <div className="container pt-4">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            <span className="mr-2">←</span> Back to Showcase
          </Button>
        </Link>
      </div>
      <Dashboard />
    </div>
  );
} 