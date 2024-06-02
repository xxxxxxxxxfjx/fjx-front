import OSS from 'ali-oss'
import { REGION, BUCKET } from '@/constants'

export const getOSSClient = async () => {
  const client = new OSS({
    region: REGION, //区域
    accessKeyId: import.meta.env.VITE_AccessKeyID,
    accessKeySecret: import.meta.env.VITE_AccessKeySecret,
    bucket: BUCKET //存储库
  })
  return client
}
