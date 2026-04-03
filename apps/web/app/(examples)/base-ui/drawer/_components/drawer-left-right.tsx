"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPopup,
    DrawerSwipeArea,
    DrawerTitle,
} from "@/components/ui/drawer"

const directionConfig = {
    left: {
        title: "Left Drawer",
        description: "Use the left edge for secondary tools or navigation.",
    },
    right: {
        title: "Right Drawer",
        description: "Use the right edge for contextual actions.",
    },
} as const

type SwipeDirection = keyof typeof directionConfig

export function DrawerSwipe() {
    const directions = Object.keys(directionConfig) as SwipeDirection[]

    return (
        <div className="flex h-svh flex-col gap-4">
            <div className="relative h-full overflow-hidden rounded-xl border bg-muted/20">
                <div className="absolute inset-0">
                    <span className="pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 -rotate-90 text-base font-medium tracking-wide text-foreground uppercase">
                        swipe
                    </span>
                    <span className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 -rotate-90 text-base font-medium tracking-wide text-foreground uppercase">
                        swipe
                    </span>
                </div>

                {directions.map((direction) => {
                    const config = directionConfig[direction]

                    return (
                        <Drawer key={direction} modal={false} swipeDirection={direction}>
                            <DrawerSwipeArea
                                className={
                                    direction === "left"
                                        ? "border-r-2 border-dashed border-foreground/40 bg-muted/30"
                                        : "border-l-2 border-dashed border-foreground/40 bg-muted/30"
                                }
                            />
                            <div
                                className={
                                    direction === "left"
                                        ? "relative z-10 flex min-h-1/2 items-center justify-start px-12 text-left"
                                        : "relative z-10 flex min-h-1/2 items-center justify-end px-12 text-right"
                                }
                            >
                                <p className="max-w-sm flex-1 text-sm leading-6 text-muted-foreground">
                                    Swipe from the {direction} edge to open the drawer.
                                </p>
                            </div>
                            <DrawerPopup>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>{config.title}</DrawerTitle>
                                        <DrawerDescription>{config.description}</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="px-4 pb-2">
                                        <div className="rounded-2xl border bg-background p-4 text-sm leading-6 text-muted-foreground">
                                            This panel opens only from the{" "}
                                            <span className="font-medium text-foreground">{direction}</span> swipe area.
                                        </div>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose render={<Button variant="outline">Close</Button>} />
                                    </DrawerFooter>
                                </DrawerContent>
                            </DrawerPopup>
                        </Drawer>
                    )
                })}
            </div>
        </div>
    )
}
