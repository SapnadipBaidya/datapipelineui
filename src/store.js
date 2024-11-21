// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
  dragableNodes: [],
  nodes: [],
  edges: [],
  dynamicNodeHandles:{},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  createDraggableNodes: (type, label) => {
    set((state) => {
      // Check if the type and label combination already exists
      const alreadyExists = state.dragableNodes.some(
        (node) =>  node.label === label
      );
  
      // Only add the node if it doesn't already exist
      if (!alreadyExists) {
        return {
          dragableNodes: [...state.dragableNodes, { type, label }],
        };
      }else{
        alert("Draggable Node with same Label Exists")
      }
  
      // If it exists, return the current state (no changes)
      return state;
    });
  },
  getDraggableNodes: () => {
    return get().dragableNodes;
  },
  createDynamicNodeHandleConfig : (id,obj)=>{
    set((state) => {
      state.dynamicNodeHandles[id] = {isHandlesConfigured:obj.isHandlesConfigured,handles:obj.handles,components:obj.components}
      return state;
    });
  },
  getDynamicNodeHandleConfig: () => {
    return get().dynamicNodeHandles;
  },
}));
