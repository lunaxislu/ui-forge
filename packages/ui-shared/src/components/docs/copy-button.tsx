"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "../../lib/utils"

interface CopyButtonProps {
    code: string
    className?: string
}

export function CopyButton({ code, className }: CopyButtonProps) {
    const [copied, setCopied] = React.useState(false)
    const timeoutRef = React.useRef<number | null>(null)

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    async function copy() {
        await navigator.clipboard.writeText(code)
        setCopied(true)

        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = window.setTimeout(() => {
            setCopied(false)
            timeoutRef.current = null
        }, 1500)
    }

    return (
        <button
            type="button"
            aria-label={copied ? "Copied code" : "Copy code"}
            onClick={copy}
            className={cn(
                "p-1.5 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                className,
            )}
        >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
    )
}
