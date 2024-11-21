import { MenuItem, Select } from "@mui/material";
import React from "react";

function HandleGenerator(props) {
  const [handlePosition, setHandlePosition] = React.useState("");
  const [handleType, setHandleType] = React.useState("");

  const positionChangeForHandleCreation = (event) => {
    event.stopPropagation(); // Prevent event propagation to ReactFlow
    const newPosition = event.target.value;
    setHandlePosition(newPosition);

    // Update position in the handles array at props.index
    const updatedHandles = [...props.handles];
    updatedHandles[props.index] = {
      ...updatedHandles[props.index],
      position: newPosition,
    };
    props.setHandles(updatedHandles);
  };

  const changeForHandleType = (event) => {
    event.stopPropagation(); // Prevent event propagation to ReactFlow
    const newType = event.target.value;
    setHandleType(newType);

    // Update type in the handles array at props.index
    const updatedHandles = [...props.handles];
    updatedHandles[props.index] = {
      ...updatedHandles[props.index],
      type: newType,
    };
    props.setHandles(updatedHandles);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Select
        labelId="position-select-label"
        id="position-select"
        value={handlePosition}
        onChange={positionChangeForHandleCreation}
        onClick={(e) => {e.preventDefault();e.stopPropagation()}} // Prevent ReactFlow interaction
        style={{ margin: "1vh", width: "18vw", maxWidth: "20vw" }}
      >
        <MenuItem value={"Top"}>Top</MenuItem>
        <MenuItem value={"Bottom"}>Bottom</MenuItem>
        <MenuItem value={"Left"}>Left</MenuItem>
        <MenuItem value={"Right"}>Right</MenuItem>
      </Select>

      <Select
        labelId="type-select-label"
        id="type-select"
        value={handleType}
        onChange={changeForHandleType}
        onClick={(e) => e.stopPropagation()} // Prevent ReactFlow interaction
        style={{ margin: "1vh", width: "18vw", maxWidth: "20vw" }}
      >
        <MenuItem value={"target"}>Target</MenuItem>
        <MenuItem value={"source"}>Source</MenuItem>
      </Select>
    </div>
  );
}

export default HandleGenerator;