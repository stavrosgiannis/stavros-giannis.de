import { render, screen } from "@testing-library/react";
import { PortfolioProvider } from "../context/PortfolioContext";
import Resume from "./Resume";

vi.mock("react-tsparticles", () => ({ default: () => null }));
vi.mock("../hooks/useMobileDetect", () => ({ useMobileDetect: () => false }));
vi.mock("../Assets/Lebenslauf_Giannis_Stavros.pdf", () => ({ default: "mock-cv.pdf" }));

const Wrapper = ({ children }) => <PortfolioProvider>{children}</PortfolioProvider>;

describe("Resume page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Resume />, { wrapper: Wrapper });
    expect(container.firstChild).toBeTruthy();
  });

  it("renders CV iframe", () => {
    render(<Resume />, { wrapper: Wrapper });
    expect(screen.getByTitle("Curriculum Vitae")).toBeInTheDocument();
  });

  it("renders download button", () => {
    render(<Resume />, { wrapper: Wrapper });
    expect(screen.getByText(/Download CV/i)).toBeInTheDocument();
  });
});
