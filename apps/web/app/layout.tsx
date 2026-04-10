import { Geist, Geist_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import { ThemeProvider } from "@/components/theme-provider"

import "@workspace/ui-shared/styles/globals.css"

import { cn } from "@workspace/ui-shared/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})
const gaId = process.env.NEXT_PUBLIC_GA_ID
const isProduction = process.env.VERCEL_ENV === "production"
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
        >
            <body>
                <ThemeProvider>{children}</ThemeProvider>
                {isProduction && gaId && <GoogleAnalytics gaId={gaId} />}
            </body>
        </html>
    )
}
