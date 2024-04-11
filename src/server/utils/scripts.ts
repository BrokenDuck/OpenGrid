export function findTimeFrameStart(date : Date, timePeriod : string) {
  
    switch (timePeriod) {
      case "year":
        date.setFullYear(date.getFullYear() - 1);
        break;
      case "month":
        date.setMonth(date.getMonth() - 1);
        break;
      case "week":
        date.setDate(date.getDate() - 7);
        break;
      case "day":
        date.setDate(date.getDate() - 1);
        break;
      default:
        throw new Error("Invalid time period. Must be one of: year, month, week, day");
    }
  
    return date;
  }
  