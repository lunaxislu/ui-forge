import { codeToHtml, type BundledLanguage } from "shiki"
import { CopyButton } from "./copy-button"

interface CodeBlockProps {
    code: string
    lang?: BundledLanguage
    filename?: string
}

export async function CodeBlock({ code, lang = "tsx", filename }: CodeBlockProps) {
    const normalizedCode = code.trim()
    const html = await codeToHtml(normalizedCode, {
        lang,
        themes: {
            dark: "github-dark",
            light: "github-light",
        },
        defaultColor: "light-dark()",
        transformers: [
            {
                pre(node) {
                    node.properties["class"] = "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 !bg-transparent"
                },
                code(node) {
                    node.properties["data-line-numbers"] = ""
                },
                line(node) {
                    node.properties["data-line"] = ""
                },
            },
        ],
    })

    return (
        <div className="flex h-full flex-col">
            {filename && (
                <div className="flex items-center justify-between border-b bg-muted px-4 py-3">
                    <span className="font-mono text-xs font-medium text-foreground/80">
                        {filename}
                    </span>
                    <CopyButton code={normalizedCode} />
                </div>
            )}

            <div
                className="overflow-y-auto text-sm [&_code]:leading-6 [&_pre]:!m-0"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}
