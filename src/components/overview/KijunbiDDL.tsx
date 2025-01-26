import * as S from "./Style";

export type KijunbiDDLProps = {
  targetDateList: Date[];
  value: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const KijunbiDDL = ({
  targetDateList,
  value,
  handleChange,
}: KijunbiDDLProps) => {
  return (
    <>
      <S.SelectKijunbi value={value} onChange={handleChange}>
        {targetDateList.map((date) => {
          if (date) {
            const date8digit = `${date.getFullYear().toString()}${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
            return (
              <option key={date8digit} value={date8digit}>
                {`${date8digit.substring(0, 4)}/${date8digit.substring(
                  4,
                  6
                )}/${date8digit.substring(6, 8)}`}
              </option>
            );
          }
        })}
      </S.SelectKijunbi>
      <span style={{ paddingLeft: 10 }}></span>
    </>
  );
};

export default KijunbiDDL;
