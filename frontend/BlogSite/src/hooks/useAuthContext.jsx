import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a WorkoutContextProvider');
  }

  return context;
}