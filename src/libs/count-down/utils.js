import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(duration)

export default dayjs
