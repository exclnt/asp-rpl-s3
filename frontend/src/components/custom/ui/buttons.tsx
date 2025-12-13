import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[15px] hover:bg-[#27272A] whitespace-nowrap rounded-md font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        sidebar: "flex flex-row w-fit h-fit p-[15px]",
        mobile: "",
        desktop_header: "flex flex-row w-fit h-fit p-[15px] rounded-[10px] bg-[#151419]",
        desktop_content: "flex flex-row w-fit h-fit p-[15px] rounded-[10px] bg-[#151419] border-2 border-[#27272A]",
      },
      font: {
        mobile: "",
        desktop: "font-normal text-[15px]"
      },
    },
    defaultVariants: {
      variant: "desktop_content",
      font: "desktop",
    },
  }
)

function Button({
  className,
  variant,
  font,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, font, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
