import { Button } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DraggableDialog from "./nodeGenerator";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

function DynamicNodeGenerator() {
  const selector = (state) => ({
    draggableNodes: state.draggableNodes,
    createDraggableNodes:state.createDraggableNodes,
  });
  const {createDraggableNodes} = useStore(selector, shallow);
  const [openNodeGenerator,setOpenNodeGenerator]=React.useState(false);
  const handleGeneratorClose = (e) =>{
    setOpenNodeGenerator(false)
  }
  const generateDraggableNode =(nodeTypeLabel,handles)=>{
    console.log("handles",nodeTypeLabel,handles)
    createDraggableNodes(nodeTypeLabel?.type,nodeTypeLabel?.label)
  }
  return (
    <div>
      <Button variant="contained" href="#contained-buttons" onClick={()=>setOpenNodeGenerator(true)} style={{  
          minWidth: '80px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#1C2536',
          justifyContent: 'center', 
          flexDirection: 'column'
        }} >
        <AddCircleOutlineIcon fontSize="large"/>
      </Button>
      <DraggableDialog  openNodeGenerator={openNodeGenerator} handleGeneratorClose={handleGeneratorClose} generateDraggableNode={generateDraggableNode}/>
    </div>
  );
}

export default DynamicNodeGenerator;
