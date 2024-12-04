import { ListItem } from "../components/Grid";

export function sortBasedOnMutlipleFields(list: ListItem[]) {
  const newList = [...list];
  newList.sort(
    (firstItem: ListItem, secondItem: ListItem) =>
      parseInt(firstItem.month) - parseInt(secondItem.month) ||
      firstItem.date.localeCompare(firstItem.date)
  );
  return newList;
}

export function isNumber(value: string) {
  return /^\d+$/.test(value);
}
