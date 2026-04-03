import { InfoIcon } from "lucide-react"

import { DocSection } from "@workspace/ui-shared/components/docs/doc-section"
import { FileTreeCode } from "@workspace/ui-shared/components/docs/file-tree-code"

import { loadSectionFiles, sectionFiles } from "@/app/_lib/docs-files"

import { DrawerBasicDemo } from "./_components/basic-drawer"
import { DrawerDirectionsDemo } from "./_components/drawer-directions"
import { DrawerResponsiveDemo } from "./_components/drawer-responsive"
import { DrawerRtlDemo } from "./_components/drawer-rtl"

export default async function Page() {
    const [
        basicSectionFiles,
        directionsSectionFiles,
        responsiveSectionFiles,
        rtlSectionFiles,
        advancedTopBottomSectionFiles,
        advancedLeftRightSectionFiles,
    ] = await Promise.all([
        loadSectionFiles(sectionFiles.basic),
        loadSectionFiles(sectionFiles.directions),
        loadSectionFiles(sectionFiles.responsive),
        loadSectionFiles(sectionFiles.rtl),
        loadSectionFiles(sectionFiles.advancedTopBottom),
        loadSectionFiles(sectionFiles.advancedLeftRight),
    ])

    return (
        <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-10">
            <header className="flex flex-col gap-2">
                <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">Base UI</p>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Drawer</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    A minimal reference page for the Base UI drawer wrapper.
                </p>
            </header>
            <div className="flex flex-col gap-12">
                <section className="flex flex-col gap-8">
                    <h2 className="text-2xl font-semibold">Basic</h2>
                    <DocSection
                        title="Base/ui Drawer"
                        description="Open the drawer, adjust the goal, and compare the live preview with the source."
                        preview={<DrawerBasicDemo />}
                        code={
                            <FileTreeCode
                                filesData={basicSectionFiles.filesData}
                                filesWithHtml={basicSectionFiles.filesWithHtml}
                            />
                        }
                    />
                    <DocSection
                        title="Directions"
                        description="Open the drawer from each side with the same wrapper surface."
                        preview={<DrawerDirectionsDemo />}
                        code={
                            <FileTreeCode
                                filesData={directionsSectionFiles.filesData}
                                filesWithHtml={directionsSectionFiles.filesWithHtml}
                            />
                        }
                    />
                    <DocSection
                        title="Responsive"
                        description="Use dialog on desktop and drawer on mobile from one trigger."
                        preview={<DrawerResponsiveDemo />}
                        code={
                            <FileTreeCode
                                filesData={responsiveSectionFiles.filesData}
                                filesWithHtml={responsiveSectionFiles.filesWithHtml}
                            />
                        }
                    />
                    <DocSection
                        title="RTL"
                        description="Switch between English, Arabic, and Hebrew in one drawer demo."
                        preview={<DrawerRtlDemo />}
                        code={
                            <FileTreeCode
                                filesData={rtlSectionFiles.filesData}
                                filesWithHtml={rtlSectionFiles.filesWithHtml}
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
                        code={
                            <FileTreeCode
                                filesData={advancedLeftRightSectionFiles.filesData}
                                filesWithHtml={advancedLeftRightSectionFiles.filesWithHtml}
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
                        code={
                            <FileTreeCode
                                filesData={advancedTopBottomSectionFiles.filesData}
                                filesWithHtml={advancedTopBottomSectionFiles.filesWithHtml}
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
