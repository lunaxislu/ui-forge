import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

const rootDir = process.cwd()

export default defineConfig({
    plugins: [react({})],
    resolve: {
        alias: {
            "@": path.resolve(rootDir, "apps/web"),
            "@workspace/radix-ui": path.resolve(rootDir, "packages/radix-ui/src"),
            "@workspace/base-ui": path.resolve(rootDir, "packages/base-ui/src"),
            "@workspace/ui-shared": path.resolve(rootDir, "packages/ui-shared/src"),
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./vitest.setup.ts"],
        include: [
            "apps/**/*.{test,spec}.ts",
            "apps/**/*.{test,spec}.tsx",
            "packages/**/*.{test,spec}.ts",
            "packages/**/*.{test,spec}.tsx",
        ],
        exclude: [
            "**/node_modules/**",
            "**/.next/**",
            "**/.turbo/**",
            "**/dist/**",
            "**/coverage/**",
            "**/storybook-static/**",
            "**/playwright-report/**",
            "**/test-results/**",
        ],
    },
})
