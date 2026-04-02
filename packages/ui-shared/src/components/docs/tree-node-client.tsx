"use client"

import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"
import { useState } from "react"

type TreeNodeData = {
    isFile: boolean
    fullPath?: string
    children?: Record<string, TreeNodeData>
}

export function TreeNodeClient({
    node,
    filename,
    indent = 0,
    onSelectFile,
}: {
    node: Record<string, TreeNodeData>
    filename?: string
    indent?: number
    onSelectFile: (filename: string) => void
}) {
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

    return (
        <div>
            {Object.entries(node).map(([name, item]) => {
                const folderKey = `${indent}-${name}`
                const isExpanded = expandedFolders[folderKey] ?? true

                return (
                    <div key={name}>
                        {item.isFile ? (
                            <button
                                onClick={() => item.fullPath && onSelectFile(item.fullPath)}
                                className={`flex cursor-pointer items-center gap-2 text-left font-mono text-xs transition-colors ${
                                    item.fullPath === filename
                                        ? "bg-accent/50 font-medium text-foreground"
                                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                                }`}
                                style={{
                                    width: "100%",
                                    paddingLeft: `${28 + indent * 16}px`,
                                    paddingRight: "0.75rem",
                                    paddingTop: "0.5rem",
                                    paddingBottom: "0.5rem",
                                }}
                            >
                                <FileIcon className="size-4 shrink-0" />
                                <span className="truncate">{name}</span>
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    setExpandedFolders((prev) => ({
                                        ...prev,
                                        [folderKey]: !isExpanded,
                                    }))
                                }
                                className="flex w-full items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                                style={{
                                    paddingLeft: `${12 + indent * 16}px`,
                                    paddingRight: "0.75rem",
                                    paddingTop: "0.5rem",
                                    paddingBottom: "0.5rem",
                                }}
                            >
                                <ChevronRightIcon
                                    className={`size-4 shrink-0 transition-transform ${
                                        isExpanded ? "rotate-90" : ""
                                    }`}
                                />
                                <FolderIcon className="size-4 shrink-0" />
                                <span className="truncate">{name}</span>
                            </button>
                        )}

                        {!item.isFile && isExpanded && item.children && (
                            <TreeNodeClient
                                node={item.children}
                                filename={filename}
                                indent={indent + 1}
                                onSelectFile={onSelectFile}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
