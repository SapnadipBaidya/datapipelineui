import { useTheme } from "@emotion/react";
import React from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { Handle, Position } from 'reactflow';
import ConfigDialogWrapperForDynamicNode from "./configDialogWrapperForDynamicNode";
function DynamicNode(props) {
  const selector = (state) => ({
    dynamicNodeHandles: state.dynamicNodeHandles,
    getDynamicNodeHandleConfig:state.getDynamicNodeHandleConfig
  });
  const { dynamicNodeHandles,getDynamicNodeHandleConfig } = useStore(
    selector
  );



  console.log("handles in uniqueNode ",dynamicNodeHandles)
  const theme = useTheme();
  
  return (
    <>
      <ConfigDialogWrapperForDynamicNode {...props}/>
    <div style={theme.customStyles.node}>
      
    {dynamicNodeHandles?.[props?.id]?.components.map(item=><div style={{margin:"1vh"}}>{item.label}</div>)}



    </div>
      {dynamicNodeHandles?.[props?.id]?.handles.map(item=>
      {
        return <Handle
        type={item?.type}
        position={Position[item.position]}
        id={`${props?.id}-system`}
      />
      }
      )}
      
    </>
  );
}

export default DynamicNode;
