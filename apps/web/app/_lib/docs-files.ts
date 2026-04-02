import { readFile } from "node:fs/promises"
import path from "node:path"

import { loadSectionFiles as renderSectionFiles } from "@workspace/ui-shared/lib/load-section-files"

type SectionFile = {
    filename: string
    relativePath: string
    lang: string
}

export const sectionFiles = {
    docsSection: [

    ],
    fileTree: [

    ],
} satisfies Record<string, SectionFile[]>

export async function loadSectionFiles(files: SectionFile[]) {
    const filesData = await Promise.all(
        files.map(async (file) => {
            const code = await readFile(path.join(process.cwd(), file.relativePath), "utf8")

            return {
                filename: file.filename,
                lang: file.lang,
                code,
            }
        }),
    )

    return renderSectionFiles(filesData)
}
