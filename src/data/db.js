import Dexie from "dexie"

export cosnt db = new Dexie('myDatabase')
db.version(1).stores({
    friends: '++id, name, age',
})
// purchase-sell-stock