import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Chip,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import Draggable from "react-draggable";


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({
  openNodeGenerator,
  handleGeneratorClose,
  generateDraggableNode,
}) {

  const [nodeTypeLabel, setNodeTypeLabel] = useState({ type: "", label: "" });

  const defaultNodes = [
    { type: "customInput", label: "Input" },
    { type: "llm", label: "LLM" },
    { type: "customOutput", label: "Output" },
    { type: "text", label: "Text" },
    { type: "dynamic", label: "Dynamic" },
  ];



  const handleDefaultNodeClick = (type, label) => {
    setNodeTypeLabel({
      type,
      label: type === "dynamic" ? "" : label,
    });
  };

  const handleNodeTypeLabel = (event, field) => {
    setNodeTypeLabel((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <Dialog
      open={openNodeGenerator}
      onClose={handleGeneratorClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Create Node
      </DialogTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "1.5vw",
        }}
      >
        <span>Default Nodes</span>
        <Stack direction="row" spacing={1} style={{ marginLeft: "1vh" }}>
          {defaultNodes.map((node) => (
            <Chip
              key={node.type}
              color="success"
              label={node.label}
              variant={nodeTypeLabel.type === node.type ? "filled" : "outlined"}
              onClick={() => handleDefaultNodeClick(node.type, node.label)}
            />
          ))}
        </Stack>
      </div>

      <DialogContent>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div>
            <InputLabel id="node-type-label">Node Type</InputLabel>
            <TextField
              id="node-type"
              variant="outlined"
              style={{ width: "18vw", margin: "1vh" }}
              value={nodeTypeLabel.type}
              InputProps={{
                readOnly: true, // Makes this field non-editable
              }}
            />
          </div>
          <div>
            <InputLabel id="node-label-label">Node Label</InputLabel>
            <TextField
              id="node-label"
              variant="outlined"
              style={{ width: "18vw", margin: "1vh" }}
              onChange={(e) => handleNodeTypeLabel(e, "label")}
              value={nodeTypeLabel.label}
            />
          </div>
        </div>
        
      </DialogContent>

      <DialogActions>
        <Button onClick={handleGeneratorClose}>Cancel</Button>
        <Button
          onClick={() => generateDraggableNode(nodeTypeLabel)} 
          disabled={!nodeTypeLabel.type || !nodeTypeLabel.label}
        >
          Generate Node
        </Button>
      </DialogActions>
    </Dialog>
  );
}