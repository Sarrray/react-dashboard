import * as S from "./Style";
import * as htmlToImage from "html-to-image";

import { useEffect, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import { createRoot } from "react-dom/client";
import { KijunbiProvider } from "../../contexts/KijunbiProvider";
import OverviewPdf from "./OverviewPdf";
import OverviewPrintArea from "./OverviewPrintArea";
import { TSummary } from "../../hooks/useSalesSummary";

type PrintButtonProps = {
  salesSummary: { [key in TSummary]: any };
};

const PrintButton = ({ salesSummary }: PrintButtonProps) => {
  const [pdfflg, setPdfflg] = useState(false);
  const [pdf, update] = usePDF({ document: <></> });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pdfflg && pdf.url) {
      window.open(pdf.url ?? "", "_blank");
    }
    setPdfflg(false);
    update(<></>);
  }, [pdf.url]);

  const handleOnClickAsync = async () => {
    setIsLoading(true);
    setPdfflg(true);
    const tempDiv = document.createElement("div");
    const root = createRoot(tempDiv);

    tempDiv.style.position = "absolute";
    tempDiv.style.left = "0px";
    tempDiv.style.top = "0px";

    tempDiv.style.width = "1100px";
    tempDiv.style.height = "800px";
    tempDiv.style.zIndex = "-99";

    root.render(
      <KijunbiProvider>
        <OverviewPrintArea salesSummary={salesSummary} />
      </KijunbiProvider>
    );
    document.body.appendChild(tempDiv);
    await waitForRendering();
    const sleep = (time: number) =>
      new Promise<void>((r) => setTimeout(r, time));
    await sleep(2000);

    const imgStr = await htmlToImage.toPng(tempDiv);
    update(<OverviewPdf str={imgStr} />);

    root.unmount();
    tempDiv.remove();

    setIsLoading(false);
  };

  const waitForRendering = () => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve(null);
        });
      });
    });
  };

  return (
    <>
      <S.buttonOutputPDF
        type="button"
        disabled={isLoading}
        onClick={handleOnClickAsync}
      >
        {isLoading ? "PDF出力中" : "PDF出力"}
      </S.buttonOutputPDF>
    </>
  );
};

export default PrintButton;
