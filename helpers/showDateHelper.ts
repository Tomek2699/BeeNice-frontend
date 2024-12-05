import moment from "moment";

class ShowDateHelper {
    static formatDateToShowForString = (date: string): string => moment(date).format('DD.MM.YYYY');
    static formatDateToShowForDate = (date: Date): string => moment(date).format('DD.MM.YYYY');
    static formatDateToISOString = (date: Date): string => date ? date.toISOString() : '';
  }
  
  export default ShowDateHelper;