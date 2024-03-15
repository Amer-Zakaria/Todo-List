export default function getDate(rowDate) {
  const date = rowDate
    ? new Date(rowDate).toLocaleString()
    : new Date().toLocaleString();
  const unwanted = date.slice(-6, -3);
  return date.replace(unwanted, "");
}
