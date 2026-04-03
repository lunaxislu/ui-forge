"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { DirectionProvider } from "@/components/ui/direction"
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

type Language = "en" | "ar" | "he"

type Translation = {
    dir: "ltr" | "rtl"
    locale: string
    trigger: string
    title: string
    description: string
    caloriesPerDay: string
    decrease: string
    increase: string
    submit: string
    cancel: string
}

const translations: Record<Language, Translation> = {
    en: {
        dir: "ltr",
        locale: "en-US",
        trigger: "Open drawer",
        title: "Move goal",
        description: "Set your daily activity goal.",
        caloriesPerDay: "Calories/day",
        decrease: "Decrease",
        increase: "Increase",
        submit: "Submit",
        cancel: "Cancel",
    },
    ar: {
        dir: "rtl",
        locale: "ar-EG",
        trigger: "فتح الدرج",
        title: "نقل الهدف",
        description: "حدد هدف نشاطك اليومي.",
        caloriesPerDay: "سعرات حرارية/يوم",
        decrease: "تقليل",
        increase: "زيادة",
        submit: "إرسال",
        cancel: "إلغاء",
    },
    he: {
        dir: "rtl",
        locale: "he-IL",
        trigger: "פתח מגירה",
        title: "הזז מטרה",
        description: "הגדר את יעד הפעילות היומי שלך.",
        caloriesPerDay: "קלוריות/יום",
        decrease: "הקטן",
        increase: "הגדל",
        submit: "שלח",
        cancel: "בטל",
    },
}

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

export function DrawerRtlDemo() {
    const [language, setLanguage] = React.useState<Language>("en")
    const [goal, setGoal] = React.useState(350)

    const t = translations[language]

    function onClick(adjustment: number) {
        setGoal((current) => Math.max(200, Math.min(400, current + adjustment)))
    }

    return (
        <DirectionProvider direction={t.dir}>
            <div dir={t.dir} className="flex flex-col gap-4">
                <div className="flex gap-2" dir="ltr">
                    {(["en", "ar", "he"] as const).map((item) => (
                        <Button
                            key={item}
                            variant={language === item ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLanguage(item)}
                        >
                            {item.toUpperCase()}
                        </Button>
                    ))}
                </div>

                <Drawer>
                    <DrawerTrigger render={<Button variant="outline">{t.trigger}</Button>} />
                    <DrawerPopup dir={t.dir} data-lang={language}>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle>{t.title}</DrawerTitle>
                                    <DrawerDescription>{t.description}</DrawerDescription>
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
                                            <span className="sr-only">{t.decrease}</span>
                                        </Button>
                                        <div className="flex-1 text-center">
                                            <div className="text-7xl font-bold tracking-tighter">
                                                {goal.toLocaleString(t.locale)}
                                            </div>
                                            <div className="text-[0.70rem] text-muted-foreground uppercase">
                                                {t.caloriesPerDay}
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 shrink-0 rounded-full"
                                            onClick={() => onClick(10)}
                                            disabled={goal >= 400}
                                        >
                                            <Plus />
                                            <span className="sr-only">{t.increase}</span>
                                        </Button>
                                    </div>
                                    <div className="mt-3 h-30">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data}>
                                                <XAxis
                                                    dataKey="goal"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                    tickFormatter={(value) => value.toLocaleString(t.locale)}
                                                    reversed={t.dir === "rtl"}
                                                />
                                                <Bar
                                                    dataKey="goal"
                                                    style={
                                                        {
                                                            fill: "var(--chart-2)",
                                                        } as React.CSSProperties
                                                    }
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button>{t.submit}</Button>
                                    <DrawerClose render={<Button variant="outline">{t.cancel}</Button>} />
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </DrawerPopup>
                </Drawer>
            </div>
        </DirectionProvider>
    )
}
