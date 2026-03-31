import { render, screen } from "@testing-library/react"

import Page from "./page"

describe("Page", () => {
    it("renders the ready message and button", () => {
        render(<Page />)

        expect(screen.getByRole("heading", { name: "Project ready!" })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument()
    })
})
