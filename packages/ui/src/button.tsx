"use client";

import { ReactNode } from "react";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  asChild?: boolean;
}

export const Buttons = ({ children, className, appName }: ButtonProps) => {
  return (
    <Button
      className={cn("", className)}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </Button>
  );
};
