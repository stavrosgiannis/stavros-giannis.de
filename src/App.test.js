import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio app shell", async () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  expect(await screen.findAllByText(/Stavros Giannis/i)).not.toHaveLength(0);
});
