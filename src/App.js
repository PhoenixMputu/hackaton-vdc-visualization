import BriefFlow from "./components/BriefFlow";
import CustomFlow from "./components/CustomFlow";
import {ReactFlowProvider} from "reactflow";
function App() {
  return (
    <ReactFlowProvider>
      {
        window.location.pathname === '/brief' ? <BriefFlow/> : <CustomFlow/>
      }
    </ReactFlowProvider>
  )
}

export default App;
