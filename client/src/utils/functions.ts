import * as timeago from 'timeago.js';

export function getTimeAgo(date = '') {
  return timeago.format(new Date(date));
}
