import { readFile } from "node:fs/promises"
import path from "node:path"

import { loadSectionFiles as renderSectionFiles } from "@workspace/ui-shared/lib/load-section-files"

type SectionFile = {
    filename: string
    relativePath: string
    lang: string
}

export const sectionFiles = {
    basic: [
        {
            filename: "app/basic-drawer",
            relativePath: "app/(examples)/base-ui/drawer/_components/basic-drawer.tsx",
            lang: "tsx",
        },
        {
            filename: "components/ui/drawer.tsx",
            relativePath: "components/ui/drawer.tsx",
            lang: "tsx",
        },
    ],
    directions: [
        {
            filename: "app/drawer-directions",
            relativePath: "app/(examples)/base-ui/drawer/_components/drawer-directions.tsx",
            lang: "tsx",
        },
        {
            filename: "components/ui/drawer.tsx",
            relativePath: "components/ui/drawer.tsx",
            lang: "tsx",
        },
    ],
    responsive: [
        {
            filename: "app/drawer-responsive",
            relativePath: "app/(examples)/base-ui/drawer/_components/drawer-responsive.tsx",
            lang: "tsx",
        },
        {
            filename: "components/ui/drawer.tsx",
            relativePath: "components/ui/drawer.tsx",
            lang: "tsx",
        },
    ],
    rtl: [
        {
            filename: "app/rtl-drawer",
            relativePath: "app/(examples)/base-ui/drawer/_components/drawer-rtl.tsx",
            lang: "tsx",
        },
        {
            filename: "components/ui/drawer.tsx",
            relativePath: "components/ui/drawer.tsx",
            lang: "tsx",
        },
    ],
    advancedTopBottom: [
        {
            filename: "app/drawer-swipe.tsx",
            relativePath: "app/(examples)/base-ui/drawer/_components/drawer-top-bottom.tsx",
            lang: "tsx",
        },
        {
            filename: "components/ui/drawer.tsx",
            relativePath: "components/ui/drawer.tsx",
            lang: "tsx",
        },
    ],
    advancedLeftRight: [
        {
            filename: "app/drawer-swipe.tsx",
            relativePath: "app/(examples)/base-ui/drawer/_components/drawer-left-right.tsx",
            lang: "tsx",
        },
        {
            filename: "components/ui/drawer.tsx",
            relativePath: "components/ui/drawer.tsx",
            lang: "tsx",
        },
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
