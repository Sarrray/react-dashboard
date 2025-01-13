type PayloadTypeType = "line" | "rect";
type CustomeLegendProps = {
  payload: { color: string; value: string; type: PayloadTypeType }[];
  displayname?: Record<string, Record<string, string>>;
};

const CustomeLegend = (props: any): JSX.Element => {
  const { payload, displayname }: CustomeLegendProps = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "0.9rem",
      }}
    >
      <ul style={{ padding: 0 }}>
        {payload.map((x) => (
          <li
            style={{
              listStyle: "none",
              display: "inline-block",
              paddingLeft: "10px",
            }}
            key={x.value}
          >
            {x.type == "rect" && (
              <div
                style={{
                  width: "20px",
                  height: "10px",
                  background: x.color,
                  border: "1px solid #666",
                  display: "inline-block",
                  marginRight: "3px",
                }}
              ></div>
            )}
            {x.type == "line" && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 32 32"
                style={{ marginRight: "5px" }}
              >
                <path
                  strokeWidth={4}
                  fill="none"
                  stroke={x.color}
                  d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
                ></path>
              </svg>
            )}
            {displayname !== undefined
              ? displayname[x.value]?.label ?? x.value
              : x.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomeLegend;
