"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ButtonDocs() {
  return (
    <div className="container py-10 space-y-10 relative z-10">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={() => window.history.back()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
          <h1 className="text-3xl font-bold">Button Component</h1>
        </div>
        <p className="text-muted-foreground">
          A comprehensive guide to the button component with all its states and variants.
        </p>
      </div>

      {/* Button Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Variants</h2>
        <Card>
          <CardHeader>
            <CardTitle>Available Variants</CardTitle>
            <CardDescription>
              The button component comes with multiple style variants to suit different UI needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Button className="w-full">Frosted Glass (Default)</Button>
                <p className="text-sm text-muted-foreground">
                  Semi-transparent white background with blur effect.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="secondary" className="w-full">Secondary</Button>
                <p className="text-sm text-muted-foreground">
                  Indigo tinted frosted glass for secondary actions.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">Outline</Button>
                <p className="text-sm text-muted-foreground">
                  Transparent with a more prominent border.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="ghost" className="w-full">Ghost</Button>
                <p className="text-sm text-muted-foreground">
                  Completely transparent until interaction.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="destructive" className="w-full">Destructive</Button>
                <p className="text-sm text-muted-foreground">
                  Red-tinted for destructive actions like delete.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="link" className="w-full">Link</Button>
                <p className="text-sm text-muted-foreground">
                  Appears as a text link without background.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="gradient" className="w-full">Gradient</Button>
                <p className="text-sm text-muted-foreground">
                  Blue to purple gradient for emphasis.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="segmented" data-state="active" className="w-full">Segmented</Button>
                <p className="text-sm text-muted-foreground">
                  For toggle buttons and segmented controls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Button States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button States</h2>
        <Card>
          <CardHeader>
            <CardTitle>Interactive States</CardTitle>
            <CardDescription>
              Buttons have different states based on user interaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Variant</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Button>Default</Button>
                    <p className="text-sm">Normal state</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="opacity-90 bg-white/30 border-white/30">Hover</Button>
                    <p className="text-sm">When mouse is over</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="ring-2 ring-white/30 ring-offset-2">Focus</Button>
                    <p className="text-sm">When focused (e.g., via keyboard)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="bg-white/50 scale-[0.96] shadow-inner-md border-white/40">Active</Button>
                    <p className="text-sm">When being clicked</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button disabled>Disabled</Button>
                    <p className="text-sm">When interaction is not allowed</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button isLoading>Loading</Button>
                    <p className="text-sm">When processing an action</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Secondary Variant</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Button variant="secondary">Default</Button>
                    <p className="text-sm">Normal state</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="secondary" className="bg-indigo-500/40 border-indigo-500/50">Hover</Button>
                    <p className="text-sm">When mouse is over</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="secondary" className="ring-2 ring-indigo-300/50 ring-offset-2">Focus</Button>
                    <p className="text-sm">When focused (e.g., via keyboard)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="secondary" className="bg-indigo-500/60 scale-[0.96] shadow-inner-md border-indigo-500/60">Active</Button>
                    <p className="text-sm">When being clicked</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="secondary" disabled>Disabled</Button>
                    <p className="text-sm">When interaction is not allowed</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="secondary" isLoading>Loading</Button>
                    <p className="text-sm">When processing an action</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Enhanced Click Effect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Enhanced Click Effect</h2>
        <Card>
          <CardHeader>
            <CardTitle>Tactile Feedback</CardTitle>
            <CardDescription>
              These buttons provide strong visual feedback when clicked, creating a more tactile experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p>
                When clicked, buttons provide immediate visual feedback through multiple effects:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Scale reduction (96% of original size)</li>
                <li>Increased background opacity</li>
                <li><strong>Enhanced inner shadow effect</strong> for a more tactile feel</li>
                <li>Border enhancement</li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Default</h3>
                  <div className="flex justify-center">
                    <Button className="w-full">Click Me</Button>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Try clicking to see the effect
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Outline</h3>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-full">Click Me</Button>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Notice the border enhancement
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Gradient</h3>
                  <div className="flex justify-center">
                    <Button variant="gradient" className="w-full">Click Me</Button>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Deeper colors when clicked
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Button Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Sizes</h2>
        <Card>
          <CardHeader>
            <CardTitle>Size Variants</CardTitle>
            <CardDescription>
              Buttons come in different sizes to fit various UI contexts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Button size="sm">Small</Button>
                <p className="text-sm text-muted-foreground">
                  h-9, text-xs
                </p>
              </div>
              
              <div className="space-y-2">
                <Button>Default</Button>
                <p className="text-sm text-muted-foreground">
                  h-10, text-sm
                </p>
              </div>
              
              <div className="space-y-2">
                <Button size="lg">Large</Button>
                <p className="text-sm text-muted-foreground">
                  h-11, text-base
                </p>
              </div>
              
              <div className="space-y-2">
                <Button size="icon">+</Button>
                <p className="text-sm text-muted-foreground">
                  h-10, w-10
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage Examples</h2>
        <Card>
          <CardHeader>
            <CardTitle>Common Button Patterns</CardTitle>
            <CardDescription>
              Examples of how to use buttons in different contexts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Form Actions</h3>
              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Danger Zone</h3>
              <div className="flex gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Navigation</h3>
              <div className="flex gap-2">
                <Button>
                  <span className="mr-2">←</span> Previous
                </Button>
                <Button>
                  Next <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Call to Action</h3>
              <Button variant="gradient" size="lg" className="w-full md:w-auto">
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>
              These buttons are designed with accessibility in mind.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>All buttons have appropriate contrast ratios for text readability</li>
              <li>Focus states are clearly visible for keyboard navigation</li>
              <li>Disabled states provide visual feedback</li>
              <li>Loading states prevent multiple submissions</li>
              <li>The backdrop filter ensures text remains readable against various backgrounds</li>
              <li>Buttons scale slightly when clicked to provide visual feedback</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Segmented Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Segmented Controls</h2>
        <Card>
          <CardHeader>
            <CardTitle>Interactive Segmented Controls</CardTitle>
            <CardDescription>
              Segmented controls are groups of buttons that act as a single control for selecting between multiple options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Usage</h3>
                <div className="p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 inline-flex">
                  <Button 
                    variant="segmented" 
                    size="sm" 
                    data-state="active"
                    className="h-8 px-3 text-xs rounded-md"
                  >
                    Daily
                  </Button>
                  <Button 
                    variant="segmented" 
                    size="sm" 
                    data-state="inactive"
                    className="h-8 px-3 text-xs rounded-md"
                  >
                    Weekly
                  </Button>
                  <Button 
                    variant="segmented" 
                    size="sm" 
                    data-state="inactive"
                    className="h-8 px-3 text-xs rounded-md"
                  >
                    Monthly
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use the <code className="text-xs bg-white/10 px-1 py-0.5 rounded">segmented</code> variant with <code className="text-xs bg-white/10 px-1 py-0.5 rounded">data-state="active"</code> for selected items.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interactive Example</h3>
                <div className="space-y-4">
                  <SegmentedControlExample />
                  <p className="text-sm text-muted-foreground">
                    Click on the buttons to see the active state change.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Implementation</h3>
                <div className="font-mono text-sm bg-black/20 p-4 rounded-lg overflow-x-auto">
                  <pre>{`// State for tracking the active option
const [activeOption, setActiveOption] = React.useState("daily");

// Render the segmented control
<div className="p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 inline-flex">
  <Button 
    variant="segmented" 
    size="sm" 
    data-state={activeOption === "daily" ? "active" : "inactive"}
    className="h-8 px-3 text-xs rounded-md"
    onClick={() => setActiveOption("daily")}
  >
    Daily
  </Button>
  <Button 
    variant="segmented" 
    size="sm" 
    data-state={activeOption === "weekly" ? "active" : "inactive"}
    className="h-8 px-3 text-xs rounded-md"
    onClick={() => setActiveOption("weekly")}
  >
    Weekly
  </Button>
  <Button 
    variant="segmented" 
    size="sm" 
    data-state={activeOption === "monthly" ? "active" : "inactive"}
    className="h-8 px-3 text-xs rounded-md"
    onClick={() => setActiveOption("monthly")}
  >
    Monthly
  </Button>
</div>`}</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Interactive Segmented Control Example
function SegmentedControlExample() {
  const [activeOption, setActiveOption] = React.useState("daily");
  
  return (
    <div className="space-y-4">
      <div className="p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 inline-flex">
        <Button 
          variant="segmented" 
          size="sm" 
          data-state={activeOption === "daily" ? "active" : "inactive"}
          className="h-8 px-3 text-xs rounded-md"
          onClick={() => setActiveOption("daily")}
        >
          Daily
        </Button>
        <Button 
          variant="segmented" 
          size="sm" 
          data-state={activeOption === "weekly" ? "active" : "inactive"}
          className="h-8 px-3 text-xs rounded-md"
          onClick={() => setActiveOption("weekly")}
        >
          Weekly
        </Button>
        <Button 
          variant="segmented" 
          size="sm" 
          data-state={activeOption === "monthly" ? "active" : "inactive"}
          className="h-8 px-3 text-xs rounded-md"
          onClick={() => setActiveOption("monthly")}
        >
          Monthly
        </Button>
      </div>
      
      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
        <p className="text-sm">
          {activeOption === "daily" && "Showing daily data view"}
          {activeOption === "weekly" && "Showing weekly data view"}
          {activeOption === "monthly" && "Showing monthly data view"}
        </p>
      </div>
    </div>
  );
} 