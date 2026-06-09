
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Successfully subscribed to newsletter!");
  };

  return (
    <section className="py-16 bg-primary text-white" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}>
      <div className="absolute inset-0 bg-primary/80" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with New Properties</h2>
          <p className="mb-8 opacity-90">
            Subscribe to our newsletter and be the first to know about new listings and real estate trends
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/30 placeholder:text-white/70 text-white h-12"
              required
            />
            <Button type="submit" className="bg-accent hover:bg-accent-600 h-12">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
