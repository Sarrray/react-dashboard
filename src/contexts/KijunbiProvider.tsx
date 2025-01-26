import { FC, ReactNode, useState } from "react";
import { KijunbiContext } from "./KijunbiContextProvider";

const defaultKijunbi: string = import.meta.env.VITE_KIJUNBI;

const KijunbiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [kijunbi, setKijunbi] = useState(defaultKijunbi);

  return (
    <KijunbiContext.Provider value={{ kijunbi, setKijunbi }}>
      {children}
    </KijunbiContext.Provider>
  );
};

export { KijunbiProvider };
