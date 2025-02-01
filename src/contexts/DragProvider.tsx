import { FC, ReactNode, useState } from "react";
import { DragContext } from "./DragContextProvider";

const DragProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DragContext.Provider value={{ isDragging, setIsDragging }}>
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;
