import { useEffect, useRef, useState } from "react";

import * as htmlToImage from "html-to-image";
import { usePDF } from "@react-pdf/renderer";
import ReportPDF from "./ReportPDF";
import GraphMixBarChart from "../../graph/GraphMixBarChart";

import * as S from "./Style";
import Suggestitem from "./Suggestitem";
import PDFItem from "./PDFItem";
import budge from "../../data/budget.json";
import salesdata from "../../data/fruitsales.json";
import fruitbgcolor from "../../data/fruitbgcolor.json";
import useSales from "../../hooks/useSales";
import { useKijunbiContext } from "../../contexts/KijunbiContextProvider";
import GraphPieChart2 from "../../graph/GraphPieChart2";

export type DraggableItemType = {
  id: number;
  jsx: JSX.Element;
  position: { x: number; y: number };
  type: "suggest" | "pdf";
  width: number;
  height: number;
};

const dispBussinessSpan = 5;

const Report = () => {
  const [pdf, update] = usePDF({ document: <></> });
  const [pdfflg, setPdfflg] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { kijunbi } = useKijunbiContext();
  const [ddlKijunbi, setDdlKijunbi] = useState(kijunbi);
  const { dispData } = useSales(
    salesdata,
    budge,
    dispBussinessSpan,
    ddlKijunbi
  );
  const list = salesdata
    .map((x) => x.date)
    .sort((a, b) => Number(b) - Number(a));

  const handleOnClickAsync = async () => {
    const imgStr = await htmlToImage.toPng(divRef.current!);
    update(<ReportPDF str={imgStr} />);
    setPdfflg(true);
  };

  useEffect(() => {
    if (pdfflg && pdf.url) {
      window.open(pdf.url ?? "", "_blank");
    }
    setPdfflg(false);
    update(<></>);
  }, [pdf.url]);

  const [addeditems, setAddedItems] = useState<DraggableItemType[]>([]);
  const [suggestitems, setSuggestItems] = useState<DraggableItemType[]>([]);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [completeFlg, setCompleteflg] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    // ドラッグ開始時の要素内でのマウス位置を記録（elementからの相対位置）
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = Number(e.dataTransfer.getData("text/plain"));
    const dropContainer = e.currentTarget.getBoundingClientRect();

    // ドロップ位置を計算（ドラッグ開始時のオフセットを考慮）
    const newX = e.clientX - dropContainer.left - dragOffset.x;
    const newY = e.clientY - dropContainer.top - dragOffset.y;
    setAddedItems((prevItems) => {
      let newItem;
      newItem = prevItems.filter((x) => x.id == draggedId)?.[0];
      if (!newItem) {
        newItem = suggestitems.filter((x) => x.id == draggedId)?.[0];
      }

      if (!newItem) {
        return [...addeditems];
      }
      return [
        ...addeditems.filter((x) => x.id != draggedId),
        {
          ...newItem,
          position: {
            x: Math.max(0, newX),
            y: Math.max(0, newY),
          },
          id: prevItems.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1,
          type: "pdf",
          width: newItem.width,
          height: newItem.height,
        },
      ];
    });
  };

  const handleResize = (id: number, width: number, height: number) => {
    setAddedItems((prevItems) => {
      return prevItems.map((x) =>
        x.id == id ? { ...x, width: width, height: height } : x
      );
    });
  };

  const handleClickAddSuggest = (
    graph: "GraphMixBarChart" | "GraphPieChart2"
  ) => {
    let graphJSX;
    if (graph == "GraphMixBarChart") {
      graphJSX = (
        <GraphMixBarChart
          data={dispData.mixeddatabyproduct?.slice(0, dispBussinessSpan) || []}
          color={fruitbgcolor}
          hiddenTooltip={true}
        />
      );
    } else if (graph == "GraphPieChart2") {
      const kijunbidata = salesdata.filter((x) => x.date == ddlKijunbi)[0];
      if (kijunbidata == undefined) {
        graphJSX = <></>;
      } else {
        const graphdata = Object.entries(kijunbidata.sales)
          .map((x) => ({
            Name: x[0],
            Value: x[1],
          }))
          .sort((a, b) => b.Value - a.Value);
        graphJSX = <GraphPieChart2 data={graphdata}></GraphPieChart2>;
      }
    } else {
      return;
    }

    setSuggestItems((prev) => {
      return [
        {
          id: prev.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1,
          jsx: (
            <div
              style={{
                width: 300,
                height: 200,
              }}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              {graphJSX}
            </div>
          ),
          position: { x: 0, y: 0 },
          type: "suggest",
          width: 300,
          height: 200,
        },
      ];
    });
  };

  useEffect(() => {
    setSuggestItems(() => {
      const mixbarchartdata = {
        data: [{ date: "20240101", りんご: 100, いちご: 200 }],
        color: { りんご: "#ff0000", いちご: "#0000ff" },
      };

      return [
        {
          id: 1,
          jsx: (
            <div
              style={{
                width: 300,
                height: 200,
              }}
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              <GraphMixBarChart
                data={mixbarchartdata.data}
                color={mixbarchartdata.color}
                hiddenTooltip={true}
              />
            </div>
          ),
          position: { x: 0, y: 0 },
          type: "suggest",
          width: 300,
          height: 200,
        },
      ];
    });
  }, []);

  return (
    <>
      <ul style={{ margin: 0, marginBottom: "20px" }}>
        <li>PDF用の内容を作成して出力できます。</li>
        <li>
          追加アイテムのグラフをドラッグし、PDF出力対象にドロップしてください。
        </li>
        <li>
          PDF出力対象のグラフは移動できます。また、右下のマークをドラッグしサイズ変更も可能です。
        </li>
        <li>編集・完了ボタンで操作を切り替えてください。</li>
      </ul>
      <S.divHeader>
        <S.labelEditToggle>
          <S.checkboxEditToggle
            checked={completeFlg}
            onChange={(e) => setCompleteflg(e.target.checked)}
          ></S.checkboxEditToggle>
          <div>編集</div>
          <div>完了</div>
        </S.labelEditToggle>
        <div>
          <S.buttonDefault onClick={handleOnClickAsync} disabled={!completeFlg}>
            PDF出力
          </S.buttonDefault>
        </div>
      </S.divHeader>
      <div>
        {!completeFlg && (
          <>
            <S.divSuggestTopArea>
              <div>
                <S.divSuggestAdd>
                  <span>■追加アイテムエリアに追加</span>
                  <div>
                    対象日：
                    <S.selectKijunbi
                      value={ddlKijunbi}
                      onChange={(e) => setDdlKijunbi(e.target.value)}
                    >
                      {list.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </S.selectKijunbi>
                  </div>
                  <S.buttonDefault
                    onClick={() => handleClickAddSuggest("GraphMixBarChart")}
                  >
                    直近5営業日の商品別売上
                  </S.buttonDefault>
                  <S.buttonDefault
                    onClick={() => handleClickAddSuggest("GraphPieChart2")}
                  >
                    商品別の売上割合
                  </S.buttonDefault>
                </S.divSuggestAdd>
              </div>
              <div>
                <S.divSuggestitemsArea>
                  <span className="caption">追加アイテム</span>
                  {suggestitems.map((x) => (
                    <Suggestitem
                      key={x.id}
                      item={x}
                      handleDragStart={handleDragStart}
                    />
                  ))}
                </S.divSuggestitemsArea>
              </div>
            </S.divSuggestTopArea>
          </>
        )}
      </div>
      <S.divPDFitemsArea onDragOver={handleDragOver} onDrop={handleDrop}>
        <span className="caption">PDF出力対象</span>
        <div className="pdfarea" ref={divRef}>
          {addeditems.map((x) => (
            <PDFItem
              key={x.id}
              item={x}
              completeFlg={completeFlg}
              handleDragStart={handleDragStart}
              handleResize={handleResize}
            />
          ))}
        </div>
      </S.divPDFitemsArea>
      <div>
        <S.buttonDefault onClick={() => setAddedItems([])}>
          グラフ削除
        </S.buttonDefault>
      </div>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <h4 style={{ margin: 0 }}>実装予定</h4>
        <ul style={{ margin: 0 }}>
          <li>
            PDFエリアのグラフの枠外にはみ出たときの対応（グラフ削除or枠内に移動）
          </li>
          <li>商品別の売上割合で割合が少ないと文字がつぶれるのを修正</li>
        </ul>
      </div>
    </>
  );
};

export default Report;
