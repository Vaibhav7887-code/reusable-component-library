"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@/components/atoms/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RotateKeyDialogProps {
    apiKeyName: string;
    children: React.ReactNode;
}

export function RotateKeyDialog({ apiKeyName, children }: RotateKeyDialogProps) {
    const [confirmationText, setConfirmationText] = React.useState("");
    const expectedConfirmationText = `rotate ${apiKeyName}`;
    const isConfirmationMatching = confirmationText === expectedConfirmationText;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Rotate API Key: '{apiKeyName}'?</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Alert variant="destructive">
                        <Icon name="satellite" className="h-4 w-4" />
                        <AlertTitle>This is a destructive action</AlertTitle>
                        <AlertDescription>
                        Rotating this key will immediately revoke the old key and generate a new one. This action cannot be undone and may cause service interruptions.
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                        <Label>Grace Period</Label>
                        <Select defaultValue="1h">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a grace period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None (immediate rotation)</SelectItem>
                                <SelectItem value="1h">1 Hour Grace Period</SelectItem>
                                <SelectItem value="24h">24 Hour Grace Period</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">For zero downtime, you can set a grace period where both the old and new keys will work temporarily.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>To confirm, type "<span className="font-semibold text-foreground">{expectedConfirmationText}</span>" below</Label>
                        <Input 
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="destructive" disabled={!isConfirmationMatching}>
                        Confirm and Rotate Key
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 