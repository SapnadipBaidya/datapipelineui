import { DraggableNode } from "./draggableNode";
import DynamicNodeGenerator from "./dynamicNodeCreator/dynamicNodeGenerator";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

export const PipelineToolbar = () => {
  const selector = (state) => ({
    dragableNodes: state.dragableNodes,
  });

  const { dragableNodes } = useStore(selector, shallow);
  console.log("sapi", dragableNodes);

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        height: "100%", // Ensure it spans the full height of the parent
        gap: "10px", // Space between draggable items and the DynamicNodeGenerator
      }}
    >
      {/* Container for draggable items */}
      <div
        style={{
          flex: "0 0 80%", // Take 80% of the width
          maxHeight: "100%", // Constrain height
          overflowY: "auto", // Enable vertical scrolling if items overflow
          display: "flex",
          flexWrap: "wrap",
          gap: "10px", // Space between draggable items
        }}
      >
        {dragableNodes.map((obj, index) => (
          <DraggableNode key={index} type={obj?.type} label={obj?.label} />
        ))}
      </div>

      {/* DynamicNodeGenerator aligned to the right */}
      <div
        style={{
          flex: "1", // Take remaining space (20%)
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          alignItems: "flex-start", // Align to the top
        }}
      >
        <DynamicNodeGenerator />
      </div>
    </div>
  );
};