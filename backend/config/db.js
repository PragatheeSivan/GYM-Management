const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path')

const dbPath = path.join(__dirname,"gym.db")

let db = null;

const initializeDb = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })

        await db.exec(`
            CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            plan TEXT NOT NULL,
            joinDate TEXT NOT NULL
            );`);

        console.log('Connected to SQLite Database')

        return db

    } catch(e) {
        console.log(`DB Error ${e.message}`)
    }

}

module.exports = initializeDb