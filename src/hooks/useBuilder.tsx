import { AppActionType } from "@/types/app";
import { BuilderType } from "@/types/builder";
import { httpClient } from "@/utils/httpClient";
import { useEffect, useState } from "react";

export default function useBuilder(isCall: boolean, type: AppActionType) {
  const [builder, setBuilder] = useState<BuilderType | null>(null);

  useEffect(() => {
    if (!type || !isCall) return;

    httpClient
      .get<{ builder: BuilderType }>(`/api/builder/${type}`)
      .then(({ data }) => {
        setBuilder(data.builder);
      });
  }, [type, isCall]);

  return builder;
}
