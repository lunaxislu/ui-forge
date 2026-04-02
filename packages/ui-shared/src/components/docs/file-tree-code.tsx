"use client"

import { useState } from "react"

import { CopyButton } from "./copy-button"
import { TreeNodeClient } from "./tree-node-client"

type FileEntry = {
    filename: string
    code: string
    lang?: string
}

type TreeNodeData = {
    isFile: boolean
    fullPath?: string
    children?: Record<string, TreeNodeData>
}

export function FileTreeCode({
    filesData,
    filesWithHtml,
}: {
    filesData: FileEntry[]
    filesWithHtml: { filename: string; html: string; lineCount: number }[]
}) {
    const [selectedFile, setSelectedFile] = useState(filesData[0]?.filename)

    const buildTree = (): Record<string, TreeNodeData> => {
        const tree: Record<string, TreeNodeData> = {}

        filesData.forEach((file) => {
            const parts = file.filename.split("/")
            let current = tree

            parts.forEach((part, index) => {
                if (!current[part]) {
                    current[part] = {
                        isFile: index === parts.length - 1,
                        fullPath: file.filename,
                        children: {},
                    }
                }

                if (!current[part].isFile && !current[part].children) {
                    current[part].children = {}
                }

                if (!current[part].isFile) {
                    current = current[part].children || {}
                }
            })
        })

        return tree
    }

    const tree = buildTree()
    const selectedFileData = filesWithHtml.find((file) => file.filename === selectedFile)
    const selectedCodeData = filesData.find((file) => file.filename === selectedFile)

    return (
        <div className="flex h-150 overflow-hidden rounded-lg border bg-background">
            <div className="w-64 overflow-y-auto border-r bg-muted">
                <div className="sticky top-0 flex h-12 items-center border-b bg-muted/60 px-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase backdrop-blur-sm">
                    Files
                </div>
                <TreeNodeClient node={tree} filename={selectedFile} onSelectFile={setSelectedFile} />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden bg-background">
                {selectedFileData && selectedCodeData && (
                    <>
                        <div className="flex h-12 items-center justify-between border-b bg-muted px-4">
                            <span className="font-mono text-xs font-medium text-foreground/80">
                                {selectedFile}
                            </span>
                            <CopyButton code={selectedCodeData.code.trim()} />
                        </div>
                        <div className="flex-1 overflow-auto">
                            <div className="flex">
                                <div className="min-w-fit border-r bg-muted/40 px-4 py-4 text-right font-mono text-xs text-muted-foreground select-none">
                                    {Array.from({
                                        length: selectedCodeData.code.trim().split("\n").length,
                                    }).map((_, i) => (
                                        <div key={i + 1} className="h-6 leading-6">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="min-w-0 flex-1 overflow-x-auto px-4 py-4 text-sm [&_code]:leading-6 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
                                    dangerouslySetInnerHTML={{
                                        __html: selectedFileData.html,
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
