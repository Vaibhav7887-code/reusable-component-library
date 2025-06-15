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
          {/* RBAC System Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="frostedGlass" className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔐 RBAC System
                </CardTitle>
                <CardDescription>Enterprise role & permissions manager</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Components Built</span>
                    <span className="text-sm font-medium">12+ atoms & molecules</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Design Patterns</span>
                    <span className="text-sm font-medium">Permission Matrix</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mock Users</span>
                    <span className="text-sm font-medium">500+ with roles</span>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">4</div>
                      <div className="text-xs text-muted-foreground">Modules</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Roles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs text-muted-foreground">Permissions</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => window.open('/rbac/users', '_blank')}
                >
                  View RBAC Demo
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Fleet Management Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card variant="frostedGlass" className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🚚 Fleet Management
                </CardTitle>
                <CardDescription>AI-powered maintenance & scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Components Built</span>
                    <span className="text-sm font-medium">20+ organisms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Design Patterns</span>
                    <span className="text-sm font-medium">Progress Rings & Cards</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Features</span>
                    <span className="text-sm font-medium">Predictive Maintenance</span>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">150</div>
                      <div className="text-xs text-muted-foreground">Vehicles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground">Alerts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => window.open('/fleet-management', '_blank')}
                >
                  View Fleet Demo
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Design System Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="frostedGlass" className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Design System
                </CardTitle>
                <CardDescription>Atomic design with frosted glass theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Atoms</span>
                    <span className="text-sm font-medium">15+ base components</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Molecules</span>
                    <span className="text-sm font-medium">10+ composite UI</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Organisms</span>
                    <span className="text-sm font-medium">5+ complex interfaces</span>
                        </div>
                  <div className="flex justify-between mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">Glass</div>
                      <div className="text-xs text-muted-foreground">Theme</div>
                        </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">Motion</div>
                      <div className="text-xs text-muted-foreground">Animations</div>
                      </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">A11y</div>
                      <div className="text-xs text-muted-foreground">Accessible</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Components
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 