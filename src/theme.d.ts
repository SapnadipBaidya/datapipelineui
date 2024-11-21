// theme.d.ts
import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customStyles: {
      card: React.CSSProperties;
      title: React.CSSProperties;
      button: React.CSSProperties;
      node: React.CSSProperties;
      submitBtn:React.CSSProperties;
    };
  }

  interface ThemeOptions {
    customStyles?: {
      card?: React.CSSProperties;
      title?: React.CSSProperties;
      button?: React.CSSProperties;
      node?: React.CSSProperties;
      submitBtn:React.CSSProperties;
    };
  }
}