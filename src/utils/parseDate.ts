const parseDate = (dateString: string): Date | null => {
  const formats = [
    /^\d{4}\/\d{1,2}\/\d{1,2}$/, // yyyy/MM/dd
    /^\d{4}-\d{1,2}-\d{1,2}$/, // yyyy-MM-dd
  ];

  const formats2 = [/^\d{8}$/];

  for (const format of formats) {
    if (format.test(dateString)) {
      const [year, month, day] = dateString.split(/[/-]/).map((r) => Number(r));
      return new Date(year, month - 1, day);
    }
  }

  for (const format of formats2) {
    if (format.test(dateString)) {
      const [year, month, day] = splitDateString(dateString);
      return new Date(year, month - 1, day);
    }
  }

  return null;
};

const splitDateString = (dateStr: string): [number, number, number] => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return [Number(year), Number(month), Number(day)];
};

export default parseDate;
