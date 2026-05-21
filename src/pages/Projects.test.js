import { render, screen } from "@testing-library/react";
import { PortfolioProvider } from "../context/PortfolioContext";
import Projects from "./Projects";

vi.mock("../hooks/useMobileDetect", () => ({ useMobileDetect: () => false }));

const Wrapper = ({ children }) => <PortfolioProvider>{children}</PortfolioProvider>;

describe("Projects page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Projects />, { wrapper: Wrapper });
    expect(container.firstChild).toBeTruthy();
  });

  it("renders section heading", () => {
    render(<Projects />, { wrapper: Wrapper });
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders project title from data", () => {
    render(<Projects />, { wrapper: Wrapper });
    expect(screen.getByText(/WLAN-CSI AI/i)).toBeInTheDocument();
  });

  it("renders a GitHub button for each project", () => {
    render(<Projects />, { wrapper: Wrapper });
    expect(screen.getAllByText(/GitHub/i).length).toBeGreaterThan(0);
  });
});
