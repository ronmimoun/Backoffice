import moment from "moment";
import { DateFormatsEnum } from "../enums/DateFormats.enum";

function formatMostRecentDate<T>(data: T[], accessor: string): string {
  if (!data) return "Not updated";

  const dates = data
    .map((obj) => (obj as any)[accessor])
    .filter((dateString) => dateString !== undefined)
    .map((dateString) => new Date(dateString));

  if (dates.length === 0) return "";

  const mostRecentDate = new Date(
    Math.max.apply(null, dates as unknown as number[])
  );

  return moment(mostRecentDate).format(DateFormatsEnum.DD_MM_YYYY);
}

function getFormattedDate(
  date: Date,
  format: DateFormatsEnum = DateFormatsEnum.DD_MM_YYYY
) {
  return moment(date).format(format);
}

function formatTime(date: Date): string {
  const now = moment();
  const targetDate = moment(date);

  // Check if the date is today
  if (now.isSame(targetDate, "day")) {
    return targetDate.format("h:mm A, [Today]");
  } else {
    // For a date that is not today, you can customize the format as needed
    return targetDate.format("h:mm A, MMM D");
  }
}

export const dateUtilService = {
  formatMostRecentDate,
  getFormattedDate,
  formatTime,
};
