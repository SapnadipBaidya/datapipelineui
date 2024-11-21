// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  customStyles: {
    card: {
      borderRadius: "16px",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      color: "#333",
    },
    submitBtn: {
      padding: "10px 20px",
      borderRadius: "8px", // Rounded corners
      background: "linear-gradient(to right, #a8edea, #fed6e3)", // Soft pastel gradient
      color: "#333", // Darker text for contrast with lighter background
      fontSize: "16px", // Slightly larger font for readability
      fontWeight: "bold", // Emphasize the text
      border: "none", // Remove default borders
      cursor: "pointer", // Pointer cursor on hover
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      transition: "all 0.3s ease-in-out", // Smooth transitions for hover effects
      "&:hover": {
        background: "linear-gradient(to right, #fed6e3, #a8edea)", // Reverse gradient on hover
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Slightly larger shadow on hover
        transform: "translateY(-2px)", // Slight lift on hover
      },

      "&:active": {
        transform: "translateY(0)", // Reset lift on click
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // Reduced shadow
      },
    },
    node: {
      margin: "1vh",
      minWidth: 200,
      minHeight: 80,
      padding: "2vh",
      border: "2px solid rgba(128, 0, 128, 0.2)", // Transparent border for the gradient effect
      borderRadius: "8px", // Rounded corners
      backgroundImage:
        "linear-gradient(white, white), linear-gradient(135deg, rgba(128, 0, 128, 0.6), rgba(255, 192, 203, 0.6))", // Smooth gradient
      backgroundOrigin: "padding-box",
      backgroundClip: " border-box",
      boxShadow: "0 4px 8px rgba(128, 0, 128, 0.2)", // Subtle shadow for better depth
      transition: "box-shadow 0.3s ease-in-out, border 0.3s ease-in-out", // Smooth transitions for hover effects
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;