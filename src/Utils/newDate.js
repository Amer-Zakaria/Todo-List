export default function getDate() {
  const date = new Date().toLocaleString();
  const unwanted = date.slice(-6, -3);
  return date.replace(unwanted, "");
}
