import type { ReactNode } from "react";

import { theme } from "../theme";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <ThemeProviderMUI theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProviderMUI>
);
