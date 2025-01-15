import Header from "../Header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  it("renders the header element", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the correct header text", () => {
    render(<Header />);

    const headerText = screen.getByText(/Children's Attendance App/i);
    expect(headerText).toBeInTheDocument();
  });

  it("contains an h1", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
