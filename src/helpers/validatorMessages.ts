const pr = new Intl.PluralRules("ru");
const getPlural = (num: number, one: string, few: string, many: string) =>
  ({ one, few, many })[pr.select(num)];

export const minMsg = (num: number) =>
  `Минимальная длина: ${num} ${getPlural(num, "символ", "символа", "символов")}`;
export const maxMsg = (num: number) =>
  `Максимальная длина: ${num} ${getPlural(num, "символ", "символа", "символов")}`;
export const requiredMsg = "Поле обязательно";
