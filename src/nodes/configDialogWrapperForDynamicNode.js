import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SaveIcon from "@mui/icons-material/Save";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, InputLabel, Stack } from "@mui/material";
import HandleGenerator from "../dynamicNodeCreator/handleGenerator";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ConfigDialogWrapperForDynamicNode(props) {
  const [selectedComponents, setSelectedComponents] = React.useState([]); // Store selected components
  const [open, setOpen] = React.useState(false);
  const [numberOfHandles, setNumberOfHandles] = React.useState(0);
  const [handles, setHandles] = React.useState([]);

  const comps = [
    { type: "input", label: "Input" },
    { type: "output", label: "Output" },
    { type: "llms", label: "LLMS" },
    { type: "textbox", label: "Text Box" },
  ];

  const selector = (state) => ({
    dynamicNodeHandles: state.dynamicNodeHandles,
    createDynamicNodeHandleConfig: state.createDynamicNodeHandleConfig,
  });

  const { dynamicNodeHandles, createDynamicNodeHandleConfig } = useStore(selector, shallow);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const incrementHandles = () => setNumberOfHandles((prev) => prev + 1);

  const saveHandleConfig = () => {
    // Save all handles and selected components
    createDynamicNodeHandleConfig(props.data.id, {
      handles,
      components: selectedComponents,
      isHandlesConfigured: true,
    });
    setOpen(false); // Close the dialog
  };

  const handleComponentToggle = (type, label) => {
    setSelectedComponents((prev) => {
      // Toggle selection of the component
      const exists = prev.some((comp) => comp.type === type);
      if (exists) {
        // Remove if already selected
        return prev.filter((comp) => comp.type !== type);
      } else {
        // Add if not selected
        return [...prev, { type, label }];
      }
    });
  };

  return (
    <React.Fragment>
      {!dynamicNodeHandles[props.id]?.isHandlesConfigured ? (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Configure
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Node Handle Config"}</DialogTitle>
            <DialogContent>
              <InputLabel id="handle-label">Create Handles</InputLabel>
              {[...Array(numberOfHandles)].map((item, index) => (
                <HandleGenerator
                  key={index}
                  index={index}
                  handles={handles}
                  setHandles={setHandles}
                />
              ))}
              <div style={{ padding: "1vh", display: "flex", justifyContent: "space-between" }}>
                <AddCircleIcon fontSize="large" color="success" onClick={incrementHandles} />
              </div>
              <div>
                <div>Add Components</div>
                <Stack direction="row" spacing={1} style={{ margin: "1vh" }}>
                  {comps.map((node) => (
                    <Chip
                      key={node.type}
                      color="success"
                      label={node.label}
                      variant={
                        selectedComponents.some((comp) => comp.type === node.type)
                          ? "filled"
                          : "outlined"
                      }
                      onClick={() => handleComponentToggle(node.type, node.label)}
                    />
                  ))}
                </Stack>
                <SaveIcon
                  fontSize="large"
                  color="primary"
                  onClick={saveHandleConfig}
                  style={{ marginTop: "1vh" }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </React.Fragment>
  );
}

export default ConfigDialogWrapperForDynamicNode;