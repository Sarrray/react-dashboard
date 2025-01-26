const defaultUnit = "円";

type CustomTooltipProps = {
  active: boolean;
  payload: {
    name: string;
    value: number;
    color: string;
    index: number;
  }[];
  coordinate: { x: number; y: number };
  label: string;
  displayname?: Record<string, Record<string, string>>;
  labelformat?: "yyyy年MM月" | "yyyy年MM月dd日";
};

const CustomTooltip = (props: any): JSX.Element => {
  const {
    active,
    payload,
    coordinate,
    label,
    displayname,
    labelformat,
  }: CustomTooltipProps = props;

  if (!active || !payload || payload.length === 0) {
    return <></>;
  }

  let dataTitle = label;
  switch (labelformat) {
    case "yyyy年MM月":
      dataTitle = `${label.substring(0, 4)}年${Number(
        label.substring(4, 6)
      )}月`;
      break;
    case "yyyy年MM月dd日":
      dataTitle = `${label.substring(0, 4)}年${Number(
        label.substring(4, 6)
      )}月${Number(label.substring(6, 8))}日`;
      break;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: coordinate.x + 20,
        top: 0,
        // top: coordinate.y,
        // transform: "translate(-50%)",
        background: "#fff",
        border: "1px solid #aaa",
        width: "200px",
        padding: "7px",
        fontSize: "0.9rem",
        zIndex: 10,
      }}
    >
      <div>
        {/* {`${label.slice(0, 4)}/${Number(label.slice(4, 6))}/${Number(
          label.slice(6, 8)
        )}`} */}
        {dataTitle}
        {payload.map((x, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px",
            }}
          >
            <div>
              <span style={{ color: x.color }}>■</span>
              {displayname?.[x.name]?.label ?? x.name}
            </div>
            <div>
              :<span style={{ paddingLeft: "5px" }}></span>
              {x.value.toLocaleString()}
              {displayname?.[x.name]?.unit ?? defaultUnit}
            </div>
            {/* <p style={{ padding: 0, margin: 0 }}>
                <span style={{ color: entry.color }}>■</span>
                {entry.name}: {entry.value.toLocaleString()}円
              </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;
