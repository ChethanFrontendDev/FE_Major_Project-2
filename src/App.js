import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sidebar from "./components/Sidebar";

function App({ children }) {
  return (
    <div>
      <h2 className="title">Anvaya CRM Dashboard</h2>
      <div className="d-flex">
        <Sidebar />
        <div className="p-3 w-100">{children}</div>
      </div>
    </div>
  );
}

export default App;
