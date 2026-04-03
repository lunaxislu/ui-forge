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
    up: {
        title: "Top Drawer",
        description: "Swipe from the top edge to reveal a compact panel.",
    },
    down: {
        title: "Bottom Drawer",
        description: "Swipe from the bottom edge to keep the action close.",
    },
} as const

type SwipeDirection = keyof typeof directionConfig

export function DrawerSwipe() {
    const directions = Object.keys(directionConfig) as SwipeDirection[]

    return (
        <div className="flex h-svh flex-col gap-4">
            <div className="relative h-full overflow-hidden rounded-xl border bg-muted/20">
                <div className="absolute inset-0">
                    <span className="pointer-events-none absolute top-14 left-1/2 -translate-x-1/2 text-base font-medium tracking-wide text-foreground uppercase">
                        swipe
                    </span>
                    <span className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 text-base font-medium tracking-wide text-foreground uppercase">
                        swipe
                    </span>
                </div>

                {directions.map((direction) => {
                    const config = directionConfig[direction]

                    return (
                        <Drawer key={direction} modal={false} swipeDirection={direction}>
                            <DrawerSwipeArea
                                className={
                                    direction === "down"
                                        ? "border-t-2 border-dashed border-foreground/40 bg-muted/30"
                                        : "border-b-2 border-dashed border-foreground/40 bg-muted/30"
                                }
                            />
                            <div
                                className={
                                    direction === "up"
                                        ? "relative z-10 flex min-h-1/2 items-center justify-center px-4 pt-8 text-center"
                                        : "relative z-10 flex min-h-1/2 items-center justify-center px-4 pb-8 text-center"
                                }
                            >
                                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
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
