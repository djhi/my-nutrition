import moment from 'moment';

export default function(meal) {
  return moment(meal.date).format('HH:mm');
}
