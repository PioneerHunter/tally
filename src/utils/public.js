import moment from 'moment'

export const timeFormat = (time, item) => {
  switch (item) {
    case 1: return moment(time).format('YYYY年MM月DD日')
  }
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
}