import { render, screen } from "@testing-library/react";
import { PortfolioProvider } from "../context/PortfolioContext";
import Home from "./Home";

vi.mock("react-parallax-tilt", () => ({ default: ({ children }) => <>{children}</> }));
vi.mock("../hooks/useMobileDetect", () => ({ useMobileDetect: () => false }));

const Wrapper = ({ children }) => <PortfolioProvider>{children}</PortfolioProvider>;

describe("Home page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />, { wrapper: Wrapper });
    expect(container.firstChild).toBeTruthy();
  });

  it("renders greeting heading", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText(/Hi There/i)).toBeInTheDocument();
  });

  it("renders portfolio name", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText(/Stavros Giannis/i)).toBeInTheDocument();
  });

  it("renders introduce myself section", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText(/INTRODUCE/i)).toBeInTheDocument();
  });

  it("renders intro body text", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByAltText("home pic")).toBeInTheDocument();
  });

  it("renders avatar image", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
  });
});
