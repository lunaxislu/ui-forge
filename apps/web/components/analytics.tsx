"use client"

import { usePathname } from "next/navigation"
import { GoogleAnalytics } from "@next/third-parties/google"

const EXCLUDED_PREFIXES = ["/base-ui/drawer/advanced"]

export function Analytics({ gaId }: { gaId?: string }) {
    const pathname = usePathname()

    if (!gaId) {
        return null
    }

    if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        return null
    }

    return <GoogleAnalytics gaId={gaId} />
}
