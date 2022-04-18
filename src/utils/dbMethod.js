import { db } from '@/data/db'

// 获取入库、库存、出库分页列表
export const getDbList = async (storage, orderBy, limit, offset = 0) => {
  try {
    return await db[storage].orderBy(orderBy).offset(offset).limit(limit).reverse().toArray()
  } catch (e) {
    console.log('获取列表失败' + e);
  }
}