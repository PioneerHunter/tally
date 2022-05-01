import Dexie from "dexie"

export const db = new Dexie('myDatabase')
db.version(1).stores({
    purchase: '++id, name, supplier, buyer, indentData, arriveData',
})
// purchase-sell-stock

db.version(2).stores({
    purchase: '++id, name, supplier, buyer, indentData, arriveData',
    storage: '++id, name, num, money',
})

db.version(3).stores({
    sales: '++id, name, customer, salesTime, salesMan',
    person: '++id, position',
})