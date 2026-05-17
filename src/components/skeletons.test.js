import { render, screen } from "@testing-library/react";
import {
  HomeSkeleton,
  AboutSkeleton,
  ProjectsSkeleton,
  ResumeSkeleton,
} from "./skeletons";

vi.mock("react-tsparticles", () => ({ default: () => null }));
vi.mock("../hooks/useMobileDetect", () => ({ useMobileDetect: () => false }));

describe("HomeSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<HomeSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders shimmer elements", () => {
    const { container } = render(<HomeSkeleton />);
    expect(container.querySelectorAll(".skeleton-shimmer").length).toBeGreaterThan(0);
  });
});

describe("AboutSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<AboutSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders shimmer elements", () => {
    const { container } = render(<AboutSkeleton />);
    expect(container.querySelectorAll(".skeleton-shimmer").length).toBeGreaterThan(0);
  });
});

describe("ProjectsSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<ProjectsSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders 6 card image skeletons", () => {
    const { container } = render(<ProjectsSkeleton />);
    expect(container.querySelectorAll(".sk-card-img").length).toBe(6);
  });
});

describe("ResumeSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<ResumeSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders shimmer elements", () => {
    const { container } = render(<ResumeSkeleton />);
    expect(container.querySelectorAll(".skeleton-shimmer").length).toBeGreaterThan(0);
  });
});
