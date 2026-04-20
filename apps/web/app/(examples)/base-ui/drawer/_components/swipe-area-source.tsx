"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { CopyButton } from "@workspace/ui-shared/components/docs/copy-button"

import { cn } from "@/lib/utils"

type SwipeAreaSourceProps = {
    filename: string
    code: string
    html: string
    lineCount: number
    category: string
    sectionName: string
    pagePath: string
}

export function SwipeAreaSource({
    filename,
    code,
    html,
    lineCount,
    category,
    sectionName,
    pagePath,
}: SwipeAreaSourceProps) {
    return (
        <CollapsiblePrimitive.Root
            data-slot="swipe-area-source"
            className="group/source relative flex flex-col overflow-hidden rounded-lg border bg-background"
        >
            <div className="flex items-center justify-between gap-3 border-b bg-muted px-4 py-3">
                <span className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-foreground/80">{filename}</span>
                </span>
                <div className="flex items-center gap-1">
                    <CollapsiblePrimitive.Trigger
                        className={cn(
                            "inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                        )}
                    >
                        <span className="group-data-[panel-open]:hidden">Expand</span>
                        <span className="hidden group-data-[panel-open]:inline">Collapse</span>
                    </CollapsiblePrimitive.Trigger>
                    <CopyButton
                        code={code.trim()}
                        category={category}
                        sectionName={sectionName}
                        pagePath={pagePath}
                        filename={filename}
                        source="code_block"
                    />
                </div>
            </div>
            <div className="relative max-h-48 overflow-hidden transition-[max-height] duration-300 ease-out group-data-[open]/source:max-h-[650px]">
                <div className="flex">
                    <div className="min-w-fit border-r bg-muted/40 px-4 py-4 text-right font-mono text-xs text-muted-foreground select-none">
                        {Array.from({ length: lineCount }).map((_, i) => (
                            <div key={i + 1} className="h-6 leading-6">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <div
                        className="min-w-0 flex-1 overflow-x-auto px-4 py-4 text-sm [&_code]:leading-6 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
                <div
                    className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 flex h-32 items-end justify-center bg-gradient-to-t from-background via-background/90 to-transparent",
                        "group-data-[open]/source:hidden"
                    )}
                >
                    <CollapsiblePrimitive.Trigger
                        className={cn(
                            "pointer-events-auto mb-6 inline-flex items-center gap-1 rounded-md border bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                        )}
                    >
                        Expand
                    </CollapsiblePrimitive.Trigger>
                </div>
            </div>
        </CollapsiblePrimitive.Root>
    )
}
