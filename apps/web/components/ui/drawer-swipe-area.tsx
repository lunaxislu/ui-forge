"use client"

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

function DrawerSwipeArea({ className, children, ...props }: DrawerPrimitive.SwipeArea.Props) {
    return (
        <DrawerPrimitive.SwipeArea
            data-slot="drawer-swipe-area"
            className={cn(
                "fixed z-50",
                "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:right-0 data-[swipe-direction=left]:w-10",
                "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:left-0 data-[swipe-direction=right]:w-10",
                "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-10",
                "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-10",
                className
            )}
            {...props}
        >
            {children}
        </DrawerPrimitive.SwipeArea>
    )
}

export { DrawerSwipeArea }
