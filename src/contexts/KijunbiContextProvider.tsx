import { createContext, useContext, useState } from "react";

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

const KijunbiProvider = ({ children }: { children: React.ReactNode }) => {
  const [kijunbi, setKijunbi] = useState(import.meta.env.VITE_KIJUNBI);
  const productValue = {
    kijunbi,
    setKijunbi,
  };

  return (
    <KijunbiContext.Provider value={productValue}>
      {children}
    </KijunbiContext.Provider>
  );
};

export { KijunbiProvider, useKijunbiContext };

//     return new Date().toISOString().slice(0, 10).replace(/-/g, "");
