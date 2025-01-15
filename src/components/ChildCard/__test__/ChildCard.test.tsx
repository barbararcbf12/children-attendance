import { render, screen, fireEvent } from "../../../test-utils";
import { useCheckInChild } from "../../../hooks/useCheckInChild";
import { useCheckOutChild } from "../../../hooks/useCheckOutChild";
import ChildCard from "../ChildCard";
import mockChildren from "../../../api/mockData.json";

// Mock the hooks
jest.mock("../../../hooks/useCheckInChild", () => ({
  useCheckInChild: jest.fn(),
}));

jest.mock("../../../hooks/useCheckOutChild", () => ({
  useCheckOutChild: jest.fn(),
}));

describe("ChildCard Component", () => {
  let mockCheckInChild: jest.Mock;
  let mockCheckOutChild: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    mockCheckInChild = jest.fn();
    mockCheckOutChild = jest.fn();
    (useCheckInChild as jest.Mock).mockReturnValue({
      mutate: mockCheckInChild,
    });
    (useCheckOutChild as jest.Mock).mockReturnValue({
      mutate: mockCheckOutChild,
    });
  });

  it("renders correctly with child data", () => {
    render(<ChildCard {...mockChildren.children[0]} />);

    // Check if the full name is rendered
    expect(screen.getByText("Adam Blanchard")).toBeInTheDocument();
    // Check if the image is rendered
    expect(screen.getByAltText("Adam Blanchard")).toHaveAttribute(
      "src",
      mockChildren.children[0].image.large
    );
  });

  it("displays the correct icon when checked in", () => {
    render(<ChildCard {...mockChildren.children[0]} />);

    expect(screen.getByTestId("check-in-icon")).toBeInTheDocument();
  });

  it("displays the correct icon when checked out", () => {
    render(<ChildCard {...mockChildren.children[1]} />);

    expect(screen.getByTestId("check-out-icon")).toBeInTheDocument();
  });

  it("calls checkInChild.mutate when checked out and clicked", () => {
    render(<ChildCard {...mockChildren.children[1]} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockCheckInChild).toHaveBeenCalledWith(
      mockChildren.children[1].childId
    );
  });

  it("calls checkOutChild.mutate when checked in and clicked", () => {
    render(<ChildCard {...mockChildren.children[0]} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockCheckOutChild).toHaveBeenCalledWith(
      mockChildren.children[0].childId
    );
  });

  it("does not render the card if childId is not provided", () => {
    const { container } = render(
      <ChildCard {...mockChildren.children[0]} childId={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("applies the correct class when checked in", () => {
    render(<ChildCard {...mockChildren.children[0]} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-4 border-green-600 hover:border-8");
  });

  it("applies the correct class when checked out", () => {
    render(<ChildCard {...mockChildren.children[1]} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border border-grey-200 hover:border-4");
  });
});
