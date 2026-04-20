import { InfoIcon } from "lucide-react"

import { DocSection } from "@workspace/ui-shared/components/docs/doc-section"
import { FileTreeCode } from "@workspace/ui-shared/components/docs/file-tree-code"

import { loadSectionFiles, sectionFiles } from "@/app/_lib/docs-files"

import { DrawerBasicDemo } from "./_components/basic-drawer"
import { DrawerDirectionsDemo } from "./_components/drawer-directions"
import { DrawerResponsiveDemo } from "./_components/drawer-responsive"
import { DrawerRtlDemo } from "./_components/drawer-rtl"
import { SwipeAreaSource } from "./_components/swipe-area-source"

const category = "drawer"
const pagePath = "/base-ui/drawer"

export default async function Page() {
    const [
        basicSectionFiles,
        directionsSectionFiles,
        responsiveSectionFiles,
        rtlSectionFiles,
        advancedTopBottomSectionFiles,
        advancedLeftRightSectionFiles,
        swipeAreaComponentFiles,
    ] = await Promise.all([
        loadSectionFiles(sectionFiles.basic),
        loadSectionFiles(sectionFiles.directions),
        loadSectionFiles(sectionFiles.responsive),
        loadSectionFiles(sectionFiles.rtl),
        loadSectionFiles(sectionFiles.advancedTopBottom),
        loadSectionFiles(sectionFiles.advancedLeftRight),
        loadSectionFiles(sectionFiles.swipeAreaComponent),
    ])

    const swipeAreaFileData = swipeAreaComponentFiles.filesData[0]
    const swipeAreaFileHtml = swipeAreaComponentFiles.filesWithHtml[0]

    return (
        <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-10">
            <header className="flex flex-col gap-2">
                <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">Base UI</p>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Drawer</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    replace vaul drawer with base-ui drawer
                </p>
            </header>
            <div className="flex flex-col gap-12">
                <section className="flex flex-col gap-8">
                    <h2 className="text-2xl font-semibold">Basic</h2>
                    <DocSection
                        title="Base/ui Drawer"
                        description="Open the drawer, adjust the goal, and compare the live preview with the source."
                        preview={<DrawerBasicDemo />}
                        category={category}
                        sectionName="Basic"
                        pagePath={pagePath}
                        code={
                            <FileTreeCode
                                filesData={basicSectionFiles.filesData}
                                filesWithHtml={basicSectionFiles.filesWithHtml}
                                category={category}
                                sectionName="Basic"
                                pagePath={pagePath}
                            />
                        }
                    />
                    <DocSection
                        title="Directions"
                        description="Open the drawer from each side with the same wrapper surface."
                        preview={<DrawerDirectionsDemo />}
                        category={category}
                        sectionName="Directions"
                        pagePath={pagePath}
                        code={
                            <FileTreeCode
                                filesData={directionsSectionFiles.filesData}
                                filesWithHtml={directionsSectionFiles.filesWithHtml}
                                category={category}
                                sectionName="Directions"
                                pagePath={pagePath}
                            />
                        }
                    />
                    <DocSection
                        title="Responsive"
                        description="Use dialog on desktop and drawer on mobile from one trigger."
                        preview={<DrawerResponsiveDemo />}
                        category={category}
                        sectionName="Responsive"
                        pagePath={pagePath}
                        code={
                            <FileTreeCode
                                filesData={responsiveSectionFiles.filesData}
                                filesWithHtml={responsiveSectionFiles.filesWithHtml}
                                category={category}
                                sectionName="Responsive"
                                pagePath={pagePath}
                            />
                        }
                    />
                    <DocSection
                        title="RTL"
                        description="Switch between English, Arabic, and Hebrew in one drawer demo."
                        preview={<DrawerRtlDemo />}
                        category={category}
                        sectionName="RTL"
                        pagePath={pagePath}
                        code={
                            <FileTreeCode
                                filesData={rtlSectionFiles.filesData}
                                filesWithHtml={rtlSectionFiles.filesWithHtml}
                                category={category}
                                sectionName="RTL"
                                pagePath={pagePath}
                            />
                        }
                    />
                </section>
                <section className="flex flex-col gap-8">
                    <h2 className="text-2xl font-semibold">Swipe Area</h2>
                    <div className="flex gap-2 rounded-xl border bg-muted/20 px-4 py-3 text-sm leading-6 text-muted-foreground">
                        <InfoIcon /> Note that you should use the{" "}
                        <span className="font-mono text-foreground"> opposite direction</span> for the data attribute to
                        target the correct area.
                    </div>
                    {swipeAreaFileData && swipeAreaFileHtml ? (
                        <SwipeAreaSource
                            filename={swipeAreaFileData.filename}
                            code={swipeAreaFileData.code}
                            html={swipeAreaFileHtml.html}
                            lineCount={swipeAreaFileHtml.lineCount}
                            category={category}
                            sectionName="SwipeArea Component"
                            pagePath={pagePath}
                        />
                    ) : null}
                    <DocSection
                        title="SwipeArea - Left / Right"
                        description="Open the drawer only from left and right edge swipe areas."
                        preview={
                            <iframe
                                title="Left / Right Drawer"
                                src="/base-ui/drawer/advanced/left-right"
                                className="block h-full w-full border-0 bg-background"
                            />
                        }
                        category={category}
                        sectionName="SwipeArea - Left / Right"
                        pagePath={pagePath}
                        code={
                            <FileTreeCode
                                filesData={advancedLeftRightSectionFiles.filesData}
                                filesWithHtml={advancedLeftRightSectionFiles.filesWithHtml}
                                category={category}
                                sectionName="SwipeArea - Left / Right"
                                pagePath={pagePath}
                            />
                        }
                    />
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/10 px-4 py-3 text-sm leading-6 text-muted-foreground">
                        <p>
                            When the swipe direction is{" "}
                            <span className="font-mono font-semibold text-foreground">{"'right'"}</span>,{" "}
                            <span className="font-semibold text-foreground">Add</span>{" "}
                            <code>
                                data-[swipe-direction=<span className="font-semibold text-foreground">left</span>]:w-10
                            </code>{" "}
                            to the SwipeArea
                        </p>
                        <p>
                            When the swipe direction is{" "}
                            <span className="font-mono font-semibold text-foreground">{"'left'"}</span>,{" "}
                            <span className="font-semibold text-foreground">Add</span>{" "}
                            <code>
                                data-[swipe-direction=<span className="font-semibold text-foreground">right</span>]:w-10
                            </code>{" "}
                            to the SwipeArea
                        </p>
                    </div>
                    <DocSection
                        title="SwipeArea - Top / Bottom"
                        description="Open the drawer only from top and bottom edge swipe areas."
                        preview={
                            <iframe
                                title="Top / Bottom Drawer"
                                src="/base-ui/drawer/advanced/top-bottom"
                                className="block h-full w-full border-0 bg-background"
                            />
                        }
                        category={category}
                        sectionName="SwipeArea - Top / Bottom"
                        pagePath={pagePath}
                        code={
                            <FileTreeCode
                                filesData={advancedTopBottomSectionFiles.filesData}
                                filesWithHtml={advancedTopBottomSectionFiles.filesWithHtml}
                                category={category}
                                sectionName="SwipeArea - Top / Bottom"
                                pagePath={pagePath}
                            />
                        }
                    />
                    <div className="flex flex-col gap-2 rounded-lg border bg-muted/10 px-4 py-3 text-sm leading-6 text-muted-foreground">
                        <p>
                            When the swipe direction is{" "}
                            <span className="font-mono font-semibold text-foreground">{"'up'"}</span>,{" "}
                            <span className="font-semibold text-foreground">Add</span>{" "}
                            <code>
                                data-[swipe-direction=<span className="font-semibold text-foreground">down</span>
                                ]:h-10
                            </code>{" "}
                            to the SwipeArea
                        </p>
                        <p>
                            When the swipe direction is{" "}
                            <span className="font-mono font-semibold text-foreground">{"'down'"}</span>,{" "}
                            <span className="font-semibold text-foreground">Add</span>{" "}
                            <code>
                                data-[swipe-direction=<span className="font-semibold text-foreground">up</span>]:h-10
                            </code>{" "}
                            to the SwipeArea
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}
