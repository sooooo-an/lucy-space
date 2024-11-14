"use client";

import BuilderBody from "@/components/builders/BuilderBody";
import BuilderFooter from "@/components/builders/BuilderFooter";
import BuilderHeader from "@/components/builders/BuilderHeader";
import ModalLayout from "@/components/ui/ModalLayout";
import PortalModal from "@/components/ui/PortalModal";
import useModalState from "@/hooks/useModalState";
import { AppActionType } from "@/types/app";
import { BuilderType } from "@/types/builder";
import { httpClient } from "@/utils/httpClient";
import { createContext, useContext, useState } from "react";

type BuilderModalContextType = {
  executeApp: (appId: string, type: AppActionType) => Promise<void>;
  onClickAction: (actionId: string) => void;
};

const BuilderModalContext = createContext<BuilderModalContextType | null>(null);

export function BuilderModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, onClose, onOpen } = useModalState();
  const [builderJSX, setBuilderJSX] = useState<JSX.Element | null>(null);

  const executeApp = async (appId: string, type: AppActionType) => {
    return httpClient
      .get<{ builder: BuilderType }>(`/api/builder/${type}`)
      .then(({ data }) => {
        const builder = data.builder;
        return convertComponent(builder);
      })
      .then((html) => setBuilderJSX(html))
      .then(() => onOpen());
  };

  const onClickAction = (actionId: string) => {
    switch (actionId) {
      case "close_view":
        onClose();
        break;
      default:
        if (actionId.startsWith("submit_")) {
          httpClient
            .post<{ data: string }>("/api/callback", { body: { actionId } })
            .finally(onClose);
        }
        break;
    }
  };

  return (
    <BuilderModalContext.Provider value={{ executeApp, onClickAction }}>
      {children}
      {open && (
        <PortalModal>
          <ModalLayout onClose={onClose}>{builderJSX}</ModalLayout>
        </PortalModal>
      )}
    </BuilderModalContext.Provider>
  );
}

export function useBuilderModal() {
  const context = useContext(BuilderModalContext);

  if (!context) {
    throw new Error("useLoginModal must be used within a BuilderModalProvider");
  }

  return context;
}

const convertComponent = (data: BuilderType): JSX.Element => {
  return (
    <div className="p-4">
      <BuilderHeader header={data.header} />
      <BuilderBody body={data.body} />
      <BuilderFooter footer={data.footer} />
    </div>
  );
};
