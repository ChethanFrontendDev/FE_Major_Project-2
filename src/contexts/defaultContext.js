import { createContext, useContext } from "react";

const DefaultContext = createContext();

function useDefaultContext() {
  return useContext(DefaultContext);
}
export default useDefaultContext;

export function DefaultContextProvider({ children }) {
  const baseUrl = "https://be-major-project-2.vercel.app";

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  // Bootstrap badge colors mapped to status
  const badgeColors = {
    New: "primary",
    Contacted: "warning",
    Qualified: "success",
    "Proposal Sent": "info",
    Closed: "danger",
  };

  return (
    <DefaultContext.Provider value={{ baseUrl, statuses, badgeColors }}>
      {children}
    </DefaultContext.Provider>
  );
}
