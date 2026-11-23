import React from "react";
import { render, screen } from "@testing-library/react";
import { formatPrice, EmptyState } from "./index";

test("formatPrice formats amounts in EGP", () => {
  expect(formatPrice(1250)).toBe("1,250 EGP");
  expect(formatPrice(0)).toBe("0 EGP");
  expect(formatPrice(undefined)).toBe("0 EGP");
  expect(formatPrice(19.5)).toBe("19.5 EGP");
});

test("EmptyState renders its title and text", () => {
  render(<EmptyState title="Nothing here" text="Come back later" />);
  expect(screen.getByText("Nothing here")).toBeInTheDocument();
  expect(screen.getByText("Come back later")).toBeInTheDocument();
});
