import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav d-flex flex-column row-gap-3">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-light">
            Leads
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sales" className="nav-link text-light">
            Sales
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/agents" className="nav-link text-light">
            Agents
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/reports" className="nav-link text-light">
            Reports
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link text-light">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
