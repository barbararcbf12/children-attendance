import React from "react";
import { render as originalRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance for your tests
const queryClient = new QueryClient();

// Custom render function that wraps components in QueryClientProvider
export const render = (ui: React.ReactNode, options?: object) => {
  return originalRender(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options
  );
};

// Re-export everything from @testing-library/react
export * from "@testing-library/react";
