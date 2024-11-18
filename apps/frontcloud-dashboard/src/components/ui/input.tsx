import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full peer rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:border-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
            className,
            props?.startAdornment && "ps-9",
            props?.endAdornment && "pe-12"
          )}
          ref={ref}
          {...props}
        />
        {
          props?.startAdornment && (
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              {props.startAdornment}
            </span>
          )
        }
        {
          props?.endAdornment && (
            <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              {props.endAdornment}
            </span>
          )
        }

      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }



import { Label } from "@/components/ui/label";

export default function Input13() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-13">Input with inline add-ons</Label>
      <div className="relative">
        <Input id="input-13" className="peer pe-12 ps-6" placeholder="0.00" type="text" />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          €
        </span>
        <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          EUR
        </span>
      </div>
    </div>
  );
}
