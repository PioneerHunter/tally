import Dexie from "dexie"

export const db = new Dexie('myDatabase')
db.version(1).stores({
    purchase: '++id, name, supplier, buyer, indentData, arriveData',
})
// purchase-sell-stock