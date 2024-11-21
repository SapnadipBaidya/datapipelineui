import React from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import axios from "axios";
import { styled } from "@mui/material/styles";

const ec2instancePublicIp = "http://13.51.234.115:8000/pipelines/parse/"

const StyledButton = styled("button")({
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
  });
export const SubmitButton = () => {
  const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
  });

  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    console.log("brefore process: nodes - ", nodes , "edges - ",edges);
    // Prepare the data
    const payload = {
      nodes: nodes.map((item) => item?.id), // Extract IDs from nodes
      edges: edges.map((item) => [item?.source, item?.target]), // Extract source and target from edges
    };

    console.log("Payload:", payload);

    try {
      // Make POST request
      const response = await axios.post(ec2instancePublicIp, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success
      console.log("Response:", response.data);

      // Optional: Alert the result
      alert(
        `Number of Nodes: ${response.data.num_nodes}\n` +
        `Number of Edges: ${response.data.num_edges}\n` +
        `Is DAG: ${response.data.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <StyledButton type="submit" onClick={handleSubmit}>
        Submit
      </StyledButton>
      


    </div>
  );
};