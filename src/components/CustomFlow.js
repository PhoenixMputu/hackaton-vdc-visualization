import { useState, useCallback } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import { SmartBezierEdge } from "@tisoap/react-flow-smart-edge";
import "reactflow/dist/style.css";
import startActivities from "../data/start_activities.json";
import endActivities from "../data/end_activities.json";
import dfg from "../data/dfg.json";

const calculSum = (edges, node) => {
  const edgesArray = [...Array.from(edges)];

  const somme = edgesArray.map(({ target, label }) => {
    return target === node ? label : 0;
  });
  return somme.reduce((sum, current) => sum + current, 0);
};

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

function CustomFlow(props) {
  const { children, ...rest } = props;
  const { setCenter } = useReactFlow();

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
  const [edges, setEdges] = useState([
    ...initialEdges,
    ...endEdges,
    ...dfgEdges,
  ]);
  const initialNodes = Object.keys(startActivities).map((key, index) => {
    return {
      id: `${key}`,
      position: {
        x: 25 * Math.floor(Math.random() * `${index}` + 1),
        y: 15 * Math.floor(Math.random() * `${index}` + 1),
      },
      data: { label: `${key} ${calculSum(edges, key)}` },
    };
  });

  const [nodes, setNodes] = useState([
    ...initialNodes,
    { ...startNodes },
    { ...endNodes },
  ]);

  console.log(edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleNodeClick = (event, node) => {
    const x = node.position.x + node.width / 2;
    const y = node.position.y + node.height / 2;
    const zoom = 1.85;

    setCenter(x, y, { zoom, duration: 1000 });
  };

  return (
    <div style={{ height: "95vh", overflow: "hidden" }} className="zoompanflow">
      <div className="reactflow-wrapper">
        <ReactFlow
          onNodeClick={handleNodeClick}
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
    </div>
  );
}

export default CustomFlow;
