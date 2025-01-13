import { TfiCrown } from "react-icons/tfi";

const topcolors = ["#c99f00", "#959595", "#ab6f4d"];

const TopSales = () => {
  return (
    <>
      <TopLine order={1} item={"aaa"} price={5000} />
    </>
  );
};

type TopLineProp = { order: number; item: string; price: number };
export const TopLine = ({ order, item, price }: TopLineProp): JSX.Element => {
  return (
    <div
      style={{
        display: "grid",
        width: "30%",
        minWidth: "400px",
        gridTemplateColumns: "70px 1fr 120px",
        borderBottom: "2px dashed #aaa",
      }}
    >
      <OrderMark order={order} color={topcolors[order - 1]} />
      <div
        style={{
          alignSelf: "end",
          fontWeight: "bold",
          fontSize: "1.1rem",
          paddingBottom: "3px",
        }}
      >
        {item}
      </div>
      <div
        style={{
          alignSelf: "end",
          fontWeight: "bold",
          fontSize: "1.1rem",
          paddingBottom: "3px",
        }}
      >
        {price.toLocaleString()}円
      </div>
    </div>
  );
};

type OrderMarkProps = { order: number; color: string };
const OrderMark = ({ order, color }: OrderMarkProps): JSX.Element => {
  return (
    <div>
      <div style={{ position: "relative", width: 40, height: 40 }}>
        <TfiCrown
          style={{
            width: "100%",
            height: "100%",
            color: color,
            opacity: 0.5,
            margin: 0,
            padding: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -35%)",
            fontFamily: "Bookman Old Style, Calisto MT",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        >
          {order.toString()}
        </span>
      </div>
    </div>
  );
};

export default TopSales;
