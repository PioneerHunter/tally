import { db } from '@/data/db'

// 获取数据
export const getData = async (name, orderBy) => {
  try {
    return await db[name].orderBy(orderBy).toArray()
  } catch (e) {
    console.log('获取数据失败' + e);
  }
}

// 存储数据
export const addData = async (name, params) => {
  try {
    db[name].add(params)
  } catch (e) {
    console.log('存取数据失败' + e);
  }
}

// 删除对应 id 数据
export const deleteData = async (name, id) => {
  try {
    return await db[name].where({ id }).delete()
  } catch (e) {
    console.log('删除数据失败' + e);
  }
}

// 获取入库、库存、出库分页列表
export const getDbList = async (name, orderBy, limit, offset = 0) => {
  try {
    return await db[name].orderBy(orderBy).offset(offset).limit(limit).reverse().toArray()
  } catch (e) {
    console.log('获取列表失败' + e);
  }
}


export const search = async (name, searchContent) => {
  try {
    return await db[name].where(searchContent).toArray()
  } catch (e) {
    console.log('搜索数据失败' + e);
  }
}
