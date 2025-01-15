import { render, screen, fireEvent } from "../../../test-utils";
import { useGetChildren } from "../../../hooks/useGetChildren";
import ChildrenGrid from "../ChildrenGrid";
import mockChildren from "../../../api/mockData.json";

// Mock the custom hook
jest.mock("../../../hooks/useGetChildren");

describe("ChildrenGrid", () => {
  beforeEach(() => {
    // Reset URL between tests
    window.history.pushState({}, "", "/");
  });

  test("renders loading state correctly", () => {
    (useGetChildren as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<ChildrenGrid />);

    expect(screen.getAllByTestId("card-skeleton")).toHaveLength(10); // CHILDREN_PER_PAGE
  });

  test("renders children data correctly", () => {
    (useGetChildren as jest.Mock).mockReturnValue({
      data: { children: mockChildren.children },
      isLoading: false,
      error: null,
    });

    render(<ChildrenGrid />);
    expect(screen.getByText("Adam Blanchard")).toBeInTheDocument();
  });

  test("handles pagination correctly", () => {
    (useGetChildren as jest.Mock).mockReturnValue({
      data: { children: mockChildren.children },
      isLoading: false,
      error: null,
    });

    render(<ChildrenGrid />);

    // Check initial page
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();

    // Test next page
    fireEvent.click(screen.getByText("next"));
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();

    // Test previous page
    fireEvent.click(screen.getByText("previous"));
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });

  test("handles error state correctly", () => {
    (useGetChildren as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Test error"),
    });

    render(<ChildrenGrid />);
    expect(
      screen.getByText("Something went wrong. Try again later.")
    ).toBeInTheDocument();
  });

  test("handles empty state correctly", () => {
    (useGetChildren as jest.Mock).mockReturnValue({
      data: { children: [] },
      isLoading: false,
      error: null,
    });

    render(<ChildrenGrid />);
    expect(
      screen.getByText("There is no child in the system.")
    ).toBeInTheDocument();
  });

  test("URL updates with page changes", () => {
    (useGetChildren as jest.Mock).mockReturnValue({
      data: { children: mockChildren.children },
      isLoading: false,
      error: null,
    });

    render(<ChildrenGrid />);

    fireEvent.click(screen.getByText("next"));
    expect(window.location.search).toBe("?page=2");
  });
});
