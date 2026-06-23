const express = require('express')
const path = require('path')
const cors = require('cors')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'gym.db')

let db = null

// DATABASE + SERVER START

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        plan TEXT NOT NULL,
        join_date TEXT NOT NULL
      );
    `)

    const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
  }
}

initializeDbAndServer()

// API 1 -> GET ALL MEMBERS

app.get('/members/', async (request, response) => {
  const getMembersQuery = `
    SELECT
      id,
      name,
      plan,
      join_date AS joinDate
    FROM members;
  `

  const membersArray = await db.all(getMembersQuery)

  response.send(membersArray)
})

// API 2 -> GET SINGLE MEMBER

app.get('/members/:id/', async (request, response) => {
  const {id} = request.params

  const getMemberQuery = `
    SELECT
      id,
      name,
      plan,
      join_date AS joinDate
    FROM members
    WHERE id = ?;
  `

  const member = await db.get(getMemberQuery, [id])

  if (member === undefined) {
    response.status(404).send('Member Not Found')
  } else {
    response.send(member)
  }
})

// API 3 -> ADD MEMBER

app.post('/members/', async (request, response) => {
  const {name, plan, joinDate} = request.body

  // VALIDATION

  if (!name || !plan || !joinDate) {
    return response.status(400).send('All Fields Required')
  }

  const addMemberQuery = `
    INSERT INTO members (name, plan, join_date)
    VALUES (?, ?, ?);
  `

  const dbResponse = await db.run(addMemberQuery, [
    name,
    plan,
    joinDate,
  ])

  response.send({
    message: 'Member Added Successfully',
    memberId: dbResponse.lastID,
  })
})

// API 4 -> UPDATE MEMBER

app.put('/members/:id/', async (request, response) => {
  const {id} = request.params

  const {name, plan, joinDate} = request.body

  const updateMemberQuery = `
    UPDATE members
    SET
      name = ?,
      plan = ?,
      join_date = ?
    WHERE id = ?;
  `

  await db.run(updateMemberQuery, [
    name,
    plan,
    joinDate,
    id,
  ])

  response.send('Member Updated Successfully')
})

// API 5 -> DELETE MEMBER

app.delete('/members/:id/', async (request, response) => {
  const {id} = request.params

  const deleteMemberQuery = `
    DELETE FROM members
    WHERE id = ?;
  `

  await db.run(deleteMemberQuery, [id])

  response.send('Member Deleted Successfully')
})

module.exports = app