"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { sendGAEvent } from "@next/third-parties/google"

import { cn } from "../../lib/utils"

interface DocSectionProps {
    title: string
    preview: ReactNode
    code: ReactNode
    description?: string
    className?: string
    category: string
    sectionName: string
    pagePath: string
}
export function DocSection({
    title,
    description,
    preview,
    code,
    className,
    category,
    sectionName,
    pagePath,
}: DocSectionProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
    const sectionRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const node = sectionRef.current

        if (!node) {
            return
        }

        let hasTracked = false

        const trackView = () => {
            if (hasTracked) {
                return
            }

            hasTracked = true

            sendGAEvent("event", "docs_example_view", {
                docs_category: category,
                docs_section_name: sectionName,
                docs_page_path: pagePath,
            })
        }

        if (typeof IntersectionObserver === "undefined") {
            trackView()
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry || !entry.isIntersecting) {
                    return
                }

                trackView()
                observer.disconnect()
            },
            {
                threshold: 0.6,
            },
        )

        observer.observe(node)

        return () => {
            observer.disconnect()
        }
    }, [category, pagePath, sectionName])

    return (
        <section ref={sectionRef} className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
                {/* 탭 헤더 */}
                <div className="px-1 py-2.5">
                    <div className="inline-flex h-8 items-center gap-0.5 rounded-lg bg-muted px-2 py-1">
                        {(["preview", "code"] as const).map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "inline-flex h-6 items-center justify-center rounded-sm px-2 text-xs font-medium transition-colors",
                                    activeTab === tab
                                        ? "bg-background text-foreground"
                                        : "text-foreground/60 hover:text-foreground"
                                )}
                            >
                                {tab === "preview" ? "Preview" : "Code"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 탭 콘텐츠 */}
                {activeTab === "preview" ? (
                    <div
                        className={cn(
                            "flex h-150 flex-col items-center justify-center overflow-hidden rounded-xl border bg-background [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-8"
                        )}
                    >
                        {preview}
                    </div>
                ) : (
                    <div className="h-150 overflow-hidden rounded-xl border">{code}</div>
                )}
            </div>
        </section>
    )
}
