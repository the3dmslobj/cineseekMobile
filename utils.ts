export function dateFormatter(date: string, options: any) {
  if (date) {
    const dateString = new Date(date);
    const formatted = dateString.toLocaleDateString("en-US", options);

    return formatted;
  }
  return "N/A";
}
