import { MdDashboardCustomize } from "react-icons/md";

const TitleIcon = () => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "35px auto",
          gridAutoFlow: "column",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "2px",
          alignItems: "center",
        }}
      >
        <MdDashboardCustomize size={30} />
        <div style={{ alignItems: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60">
            <text
              x="10"
              y="55"
              style={{ fontFamily: "Arial", fontSize: 40 }}
              fill="black"
            >
              Dash Bord
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default TitleIcon;
