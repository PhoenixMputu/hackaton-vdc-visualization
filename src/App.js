import BriefFlow from "./components/BriefFlow";
import CustomFlow from "./components/CustomFlow";
function App() {
  return window.location.pathname === "/brief" ? <BriefFlow /> : <CustomFlow />;
}

export default App;
