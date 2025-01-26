import { createContext, useContext } from "react";

type TuseKijunbiContext = {
  kijunbi: string;
  setKijunbi(kijunbi: string): void;
};

const KijunbiContext = createContext<TuseKijunbiContext | undefined>(undefined);

const useKijunbiContext = (): TuseKijunbiContext => {
  const context = useContext(KijunbiContext);

  if (!context) {
    throw new Error("useKijunbiContext error");
  }

  return context;
};

export { KijunbiContext, useKijunbiContext };
