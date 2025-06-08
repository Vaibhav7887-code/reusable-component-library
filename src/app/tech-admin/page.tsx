"use client";

import * as React from "react";
import { AuthSandbox } from "@/rbac/technical-admin/components/auth-sandbox";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function TechAdminPage() {
  return (
    <main className="container mx-auto flex flex-col h-[calc(100vh-65px)]">
      <div className="flex-shrink-0 mb-8 flex items-center justify-between p-4 md:p-8 pb-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technical Admin View</h1>
          <p className="text-muted-foreground mt-2">
            Advanced tools for managing system policies, service accounts, and debugging access.
          </p>
        </div>
        <Link href="/rbac/users" legacyBehavior>
          <Button variant="outline" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Switch to Basic View
          </Button>
        </Link>
      </div>

      <div className="flex-grow overflow-hidden p-4 pt-0 md:p-8 md:pt-0">
        <AuthSandbox />
      </div>
    </main>
  );
} 