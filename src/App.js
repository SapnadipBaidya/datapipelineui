import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div>
          <PipelineToolbar />
          <PipelineUI />
          <SubmitButton />
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
