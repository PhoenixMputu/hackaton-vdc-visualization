import { useState, useCallback } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
} from "reactflow";
import { SmartBezierEdge } from "@tisoap/react-flow-smart-edge";
import "reactflow/dist/style.css";
import startActivities from "../data/start_activities.json";
import endActivities from "../data/end_activities.json";
import dfg from "../data/dfg.json";

const edgeTypes = {
  smart: SmartBezierEdge,
};

const startNodes = {
  id: "1",
  position: { x: 600, y: 0 },
  data: { label: "Input" },
  style: {
    "background-color": "red",
    color: "white",
    width: "100px",
    height: "100px",
    "border-radius": "50%",
    "text-align": "center",
  },
};

const endNodes = {
  id: "2",
  position: { x: 600, y: 300 },
  data: { label: "Output" },
  style: {
    "background-color": "red",
    color: "white",
    width: "100px",
    height: "100px",
    "border-radius": "50%",
    "text-align": "center",
  },
};

function CustomerFlow(props) {
  const { children, ...rest } = props;
  const initialNodes = Object.keys(startActivities).map((key, index) => {
    return {
      id: `${key}`,
      position: {
        x: 50 * Math.floor(Math.random() * `${index}` + 1),
        y: 25 * Math.floor(Math.random() * `${index}` + 1),
      },
      data: { label: key },
    };
  });

  const initialEdges = Object.keys(startActivities).map((key, value) => {
    return {
      id: `1-${key}`,
      source: "1",
      target: key,
      sourceHandle: "a",
      label: value,
      markerEnd: {
        color: "#FF0072",
        width: 25,
        height: 25,
        type: "arrowclosed",
        strokeWidth: 1,
      },
    };
  });

  const endEdges = Object.keys(endActivities).map((key, value) => {
    return {
      id: `${key} - 2`,
      source: key,
      target: "2",
      sourceHandle: "b",
      label: value,
      markerEnd: {
        color: "#FF0072",
        width: 25,
        height: 25,
        type: "arrowclosed",
        strokeWidth: 1,
      },
    };
  });

  const dfgEdges = dfg.map(({ value, from, to }) => {
    let peuImporte = {
      id: `${from} - ${to}`,
      source: from,
      target: to,
      sourceHandle: "c",
      label: value,
      markerEnd: {
        color: "#FF0072",
        width: 25,
        height: 25,
        type: "arrowclosed",
        strokeWidth: 1,
      },
      type: "smart",
    };

    return peuImporte;
  });

  const [nodes, setNodes] = useState([
    ...initialNodes,
    { ...startNodes },
    { ...endNodes },
  ]);
  const [edges, setEdges] = useState([
    ...initialEdges,
    ...endEdges,
    ...dfgEdges,
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  return (
    <div style={{ height: "80vh", overview: "hidden" }}>
      <h1>Vodacom Visualization Dataset</h1>
      <ReactFlow
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        defaultNodes={nodes}
        defaultEdges={edges}
        {...rest}>
        {children}
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default CustomerFlow;
