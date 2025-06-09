"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  Star,
  ChevronDown,
  Play,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { heroMetrics } from "../../data/metrics";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  delay?: number;
}

const AnimatedCounter = ({ value, duration = 2000, delay = 0 }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      if (typeof value === 'number') {
        let startValue = 0;
        const increment = value / (duration / 16);
        
        const counter = setInterval(() => {
          startValue += increment;
          if (startValue >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(startValue));
          }
        }, 16);

        return () => clearInterval(counter);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay]);

  return (
    <span ref={ref}>
      {typeof value === 'number' ? displayValue : value}
    </span>
  );
};

const MetricCard = ({ metric, index }: { metric: typeof heroMetrics[0], index: number }) => {
  const iconMap = {
    Clock: Clock,
    TrendingDown: TrendingDown,
    TrendingUp: TrendingUp,
    Star: Star
  };
  
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || Clock;
  
  const colorMap = {
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
    >
      <Card className="relative overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 border-white/20 hover:bg-white/20 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg bg-white/10 ${colorMap[metric.color as keyof typeof colorMap]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <Badge variant="outline" className="text-xs bg-white/10 border-white/20">
              {metric.change}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${colorMap[metric.color as keyof typeof colorMap]}`}>
              <AnimatedCounter value={metric.value} delay={1000 + index * 200} />
            </div>
            <p className="text-sm font-medium text-foreground">{metric.label}</p>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
    >
      <span className="text-sm mb-2">Scroll to explore</span>
      <ChevronDown className="h-5 w-5" />
    </motion.div>
  </motion.div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 dark:opacity-5"
            style={{
              background: `linear-gradient(45deg, ${
                ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'][i]
              }, transparent)`,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-6 text-sm font-semibold bg-white/10 border-white/20 backdrop-blur-sm">
            🎯 A Design-Led Platform Transformation for Okta
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
        >
          From 3 Days to 5 Minutes
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed"
        >
          How I transformed FleetEdge from a closed SaaS app into an open, 
          <span className="font-semibold text-foreground"> developer-first platform</span>, 
          focusing on the fastest-to-trust experience in fleet management.
        </motion.p>

        {/* Key Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-green-500">✓</span>
              <span>99% faster developer onboarding</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-blue-500">✓</span>
              <span>73% reduction in support tickets</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-purple-500">✓</span>
              <span>4x increase in API adoption</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button asChild size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/api-portal">
              <Play className="mr-2 h-5 w-5" />
              Explore API Portal
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20">
            <Link href="/rbac-demo/admin-view">
              <ExternalLink className="mr-2 h-5 w-5" />
              View RBAC System
            </Link>
          </Button>
        </motion.div>

        {/* Impact Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroMetrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}; 