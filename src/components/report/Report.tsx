import { useEffect, useRef, useState } from "react";

import * as htmlToImage from "html-to-image";
import { usePDF } from "@react-pdf/renderer";
import ReportPDF from "./ReportPDF";
import GraphMixBarChart from "../graph/GraphMixBarChart";

import * as S from "./Style";
import Suggestitem from "./Suggestitem";
import PDFItem from "./PDFItem";
import budge from "../../data/budget.json";
import salesdata from "../../data/fruitsales.json";
import fruitbgcolor from "../../data/fruitbgcolor.json";
import { useKijunbiContext } from "../../contexts/KijunbiContextProvider";
import GraphPieChart2 from "../graph/GraphPieChart2";
import useSalesSummary from "../../hooks/useSalesSummary";
import KijunbiDDL from "../overview/KijunbiDDL";
import useDragHandlers from "../../hooks/useDragHandlers";

const dispBussinessSpan = 5;

const Report = () => {
  const [pdf, update] = usePDF({ document: <></> });
  const [pdfflg, setPdfflg] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { kijunbi } = useKijunbiContext();
  const {
    salesSummary,
    inputDate,
    setInputDate,
    handleDateChange,
    targetDateList,
  } = useSalesSummary(salesdata, budge);
  const {
    suggestItems,
    setSuggestItems,
    addItems,
    handleDragStart,
    handleDragOver,
    handleDrop,
    removeAddItems,
    NewResizeObserver,
  } = useDragHandlers();
  const [completeFlg, setCompleteflg] = useState(false);

  const handleOnClickAsync = async () => {
    const imgStr = await htmlToImage.toPng(divRef.current!);
    update(<ReportPDF str={imgStr} />);
    setPdfflg(true);
  };

  useEffect(() => {
    setInputDate(kijunbi);
  }, [kijunbi, setInputDate]);

  useEffect(() => {
    if (pdfflg && pdf.url) {
      window.open(pdf.url ?? "", "_blank");
    }
    setPdfflg(false);
    update(<></>);
  }, [pdf.url]);

  const CreateGraph = (graph: "GraphMixBarChart" | "GraphPieChart2") => {
    let graphJSX;
    if (graph == "GraphMixBarChart") {
      graphJSX = (
        <GraphMixBarChart
          data={
            salesSummary.n日間の商品毎の売上高?.slice(0, dispBussinessSpan) ||
            []
          }
          color={fruitbgcolor}
          hiddenTooltip={true}
        />
      );
    } else if (graph == "GraphPieChart2") {
      graphJSX = (
        <GraphPieChart2 data={salesSummary.当日の商品の売上高}></GraphPieChart2>
      );
    } else {
      return;
    }

    setSuggestItems((prev) => {
      return [
        {
          id:
            prev
              .concat(addItems)
              .reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1,
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
                  <div className="taishobi">
                    対象日：
                    <KijunbiDDL
                      targetDateList={targetDateList}
                      value={inputDate}
                      handleChange={handleDateChange}
                    />
                  </div>
                  <S.buttonDefault
                    onClick={() => CreateGraph("GraphMixBarChart")}
                  >
                    直近5営業日の商品別売上
                  </S.buttonDefault>
                  <S.buttonDefault
                    onClick={() => CreateGraph("GraphPieChart2")}
                  >
                    商品別の売上割合
                  </S.buttonDefault>
                </S.divSuggestAdd>
              </div>
              <div>
                <S.divSuggestitemsArea>
                  <span className="caption">追加アイテム</span>
                  {suggestItems.map((x) => (
                    <Suggestitem
                      key={`s${x.id}`}
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
          {addItems.map((x) => (
            <PDFItem
              key={`a${x.id}`}
              item={x}
              completeFlg={completeFlg}
              handleDragStart={handleDragStart}
              NewResizeObserver={NewResizeObserver}
            />
          ))}
        </div>
      </S.divPDFitemsArea>
      <div>
        <S.buttonDefault onClick={removeAddItems}>グラフ削除</S.buttonDefault>
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
