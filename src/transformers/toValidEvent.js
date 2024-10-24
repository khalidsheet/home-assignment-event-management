import dayjs from 'dayjs'

export const toValidEvent = data => ({
  title: data.title,
  date: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'),
  content: data.content,
  location: data.location,
  status: data.status,
  start: dayjs(data.date).format('YYYY-MM-DD'),
  end: dayjs(data.date).format('YYYY-MM-DD'),
})
