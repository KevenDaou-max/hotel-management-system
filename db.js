const DataBase=require("better-sqlite3")
const db=new DataBase("hotel.db")
db.pragma("foreign_keys = ON")

//USERS TABLE
db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL
    
    )
    `)

//ROOM TYPES
db.exec(`
    CREATE TABLE IF NOT EXISTS room_types(
    type_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    balcony INTEGER NOT NULL DEFAULT 0,
    bed TEXT NOT NULL,
    price_per_night INTEGER NOT NULL,
    UNIQUE(name,balcony,bed)
 )
    `)
// ROOMS
db.exec(
    `
    CREATE TABLE IF NOT EXISTS rooms(
    number TEXT NOT NULL PRIMARY KEY,
    type_id INTEGER NOT NULL REFERENCES room_types(type_id)
    )
    `
)
// BOOKINGS
db.exec(
    `
    CREATE TABLE IF NOT EXISTS bookings(
    booking_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    room_number TEXT NOT NULL REFERENCES rooms(number),
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
    )
    `
)






module.exports = db