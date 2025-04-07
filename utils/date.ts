import { format } from 'date-fns';
import { DefaultFormatDate } from './constants';

export const formatDate = (date: Date, fmt = DefaultFormatDate) => {
  return format(date, fmt);
};
