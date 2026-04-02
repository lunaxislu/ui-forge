import { codeToHtml } from "shiki"

export type LoadedSectionFile = {
    filename: string
    lang: string
    code: string
}

export async function loadSectionFiles(filesData: LoadedSectionFile[]) {
    const filesWithHtml = await Promise.all(
        filesData.map(async (file) => {
            const normalizedCode = file.code.trim()
            const html = await codeToHtml(normalizedCode, {
                lang: file.lang,
                themes: {
                    dark: "github-dark",
                    light: "github-light",
                },
                defaultColor: "light-dark()",
            })

            return {
                filename: file.filename,
                html,
                lineCount: normalizedCode.split("\n").length,
            }
        }),
    )

    return { filesData, filesWithHtml }
}
