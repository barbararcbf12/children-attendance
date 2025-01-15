import { render, screen } from "./test-utils";
import App from "./App";

describe("App Component", () => {
  it("render without props", () => {
    render(<App />);
    const title = screen.getByText(/Children's Attendance App/i);
    expect(title).toBeInTheDocument();
  });
});
