"use client";

import { AppActionProcess, AppActionType } from "@/types/app";
import { useContext, useState, createContext } from "react";

type AppActionContextType = {
  process: AppActionProcess;
  updateProcess: (process: AppActionProcess, type?: AppActionType) => void;
  appActionType: "channelLayer" | "taskModal" | "rightPanel";
};

const AppActionContext = createContext<AppActionContextType | null>(null);

export function AppActionProvider({ children }: { children: React.ReactNode }) {
  const [process, setProcess] = useState<AppActionProcess>("createApp");
  const [appActionType, setAppActionType] =
    useState<AppActionType>("channelLayer");

  const updateProcess = (process: AppActionProcess, type?: AppActionType) => {
    if (type) {
      setAppActionType(type!);
    }
    setProcess(process);
  };

  return (
    <AppActionContext.Provider
      value={{
        updateProcess,
        process,
        appActionType,
      }}
    >
      {children}
    </AppActionContext.Provider>
  );
}

export function useAppAction() {
  const context = useContext(AppActionContext);

  if (!context) {
    throw new Error("useAppAction must be used within a AppActionProvider");
  }

  return context;
}
