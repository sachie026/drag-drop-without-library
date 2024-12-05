export type Message = Record<"date" | "message", string>;

export const InputList: Message[] = [
  { date: "2021-07-24", message: "message D" },
  { date: "2020-06-18", message: "message A" },
  { date: "2021-06-22", message: "message C" },
  { date: "2020-06-19", message: "message B" },
  { date: "2020-04-17", message: "message E" },
  { date: "2020-04-19", message: "message F" },
  { date: "2010-08-19", message: "message G" },
  { date: "2024-08-23", message: "message H" },
  { date: "2010-04-19", message: "message F" },
  { date: "2000-08-19", message: "message G" },
  { date: "2022-08-23", message: "message H" },
];

export const DEFAULT_FORM_DATA = {
  date: "",
  month: "",
  year: "",
  message: "",
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
