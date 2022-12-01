import React from "react";
import { useReactFlow } from "reactflow";

const Zoom = ({node}) => {

  const { setCenter } = useReactFlow();
  
  const focusNode = () => {
      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    
  };

  return (
    <div className="aside">
      <button onClick={focusNode}>zoom focus node</button>
    </div>
  );
};

export default Zoom;