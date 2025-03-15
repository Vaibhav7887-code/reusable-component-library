"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FrostedGlassDemo() {
  return (
    <div className="w-full py-12 relative z-10">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-300 dark:bg-purple-800 opacity-50 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-800 opacity-50 blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Modern Frosted Glass UI</h2>
          <p className="text-lg text-muted-foreground">Modern, elegant components with a translucent glass effect</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="frostedGlass" className="h-full">
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track your performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-2 bg-white/20 rounded-full w-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
                  <div className="flex justify-between mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">89%</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">2.4k</div>
                      <div className="text-xs text-muted-foreground">Visitors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">32</div>
                      <div className="text-xs text-muted-foreground">Conversions</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card variant="frostedGlass" className="h-full">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <div className="font-medium">Alex Johnson</div>
                    <div className="text-sm text-muted-foreground">Premium Member</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Email</span>
                    <span className="text-sm text-muted-foreground">alex@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Location</span>
                    <span className="text-sm text-muted-foreground">San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="text-sm text-muted-foreground">March 2023</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">Log Out</Button>
                <Button className="flex-1">Edit Profile</Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="frostedGlass" className="h-full">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        {i === 1 ? '📊' : i === 2 ? '🔔' : '✉️'}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {i === 1 
                            ? 'Analytics report ready' 
                            : i === 2 
                              ? 'New feature available' 
                              : 'Message from support'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i === 1 
                            ? '2 hours ago' 
                            : i === 2 
                              ? 'Yesterday' 
                              : '3 days ago'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 