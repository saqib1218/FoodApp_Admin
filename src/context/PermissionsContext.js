import { createContext, useContext } from "react";

export const PermissionsContext = createContext([]);

export const usePermissions = () => useContext(PermissionsContext);
