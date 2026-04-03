"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
    { goal: 400 },
    { goal: 300 },
    { goal: 200 },
    { goal: 300 },
    { goal: 200 },
    { goal: 278 },
    { goal: 189 },
    { goal: 239 },
    { goal: 300 },
    { goal: 200 },
    { goal: 278 },
    { goal: 189 },
    { goal: 349 },
]

export function DrawerBasicDemo() {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal((current) => Math.max(200, Math.min(400, current + adjustment)))
    }

    return (
        <Drawer>
            <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
            <DrawerPopup>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Move goal</DrawerTitle>
                            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => onClick(-10)}
                                    disabled={goal <= 200}
                                >
                                    <Minus />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                                    <div className="text-[0.70rem] text-muted-foreground uppercase">Calories/day</div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => onClick(10)}
                                    disabled={goal >= 400}
                                >
                                    <Plus />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                            <div className="mt-3 h-30">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <Bar
                                            dataKey="goal"
                                            style={
                                                {
                                                    fill: "var(--chart-1)",
                                                } as React.CSSProperties
                                            }
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </DrawerPopup>
        </Drawer>
    )
}
