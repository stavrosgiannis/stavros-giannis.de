import { render, screen } from "@testing-library/react";
import { PortfolioProvider } from "../../context/PortfolioContext";
import About from "./index";

vi.mock("react-lazy-load-image-component", () => ({
  LazyLoadImage: ({ src, alt }) => <img src={src} alt={alt} />,
}));
vi.mock("react-github-calendar", () => ({ GitHubCalendar: () => null }));
vi.mock("react-icons/tb", () => ({ TbBrandGolang: () => null }));
vi.mock("../../hooks/useMobileDetect", () => ({ useMobileDetect: () => false }));

const Wrapper = ({ children }) => <PortfolioProvider>{children}</PortfolioProvider>;

describe("About page", () => {
  it("renders without crashing", () => {
    const { container } = render(<About />, { wrapper: Wrapper });
    expect(container.firstChild).toBeTruthy();
  });

  it("renders know who heading", () => {
    render(<About />, { wrapper: Wrapper });
    expect(screen.getByText(/Know Who/i)).toBeInTheDocument();
  });

  it("renders portfolio name", () => {
    render(<About />, { wrapper: Wrapper });
    expect(screen.getAllByText(/Stavros Giannis/i).length).toBeGreaterThan(0);
  });

  it("renders skillset heading", () => {
    render(<About />, { wrapper: Wrapper });
    expect(screen.getByText(/Skillset/i)).toBeInTheDocument();
  });

  it("renders tools heading", () => {
    render(<About />, { wrapper: Wrapper });
    expect(screen.getByText(/Tools/i)).toBeInTheDocument();
  });

  it("renders about image", () => {
    render(<About />, { wrapper: Wrapper });
    expect(screen.getByAltText("about")).toBeInTheDocument();
  });

  it("renders tagline quote", () => {
    render(<About />, { wrapper: Wrapper });
    expect(screen.getByText(/wireless signal/i)).toBeInTheDocument();
  });
});
