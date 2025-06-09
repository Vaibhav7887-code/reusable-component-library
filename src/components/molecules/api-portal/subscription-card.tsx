"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SubscriptionCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <p>You are on the <span className="font-semibold">Pro Plan</span> ($250/year).</p>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline">Manage Billing</Button>
                <Button variant="ghost" asChild>
                    <Link href="#">View Invoices</Link>
                </Button>
            </CardFooter>
        </Card>
    )
} 