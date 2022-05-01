import moment from 'moment'

export const timeFormat = (time) => {
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
}