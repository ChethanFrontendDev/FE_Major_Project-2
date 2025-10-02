import { createContext, useContext } from "react";

const DefaultContext = createContext();

function useDefaultContext() {
  return useContext(DefaultContext);
}
export default useDefaultContext;

export function DefaultContextProvider({ children }) {
  const baseUrl = "https://be-major-project-2.vercel.app";

  return (
    <DefaultContext.Provider value={{ baseUrl }}>
      {children}
    </DefaultContext.Provider>
  );
}
