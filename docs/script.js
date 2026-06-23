const API_URL = 'http://localhost:3000/members/'

// LOAD MEMBERS

const getMembers = async () => {
  try {
    const response = await fetch(API_URL)

    const data = await response.json()

    displayMembers(data)
  } catch (error) {
    console.log(error)
  }
}

// DISPLAY MEMBERS

const displayMembers = members => {
  const tableBody = document.getElementById('membersTableBody')

  tableBody.innerHTML = ''

  members.forEach(member => {
    const row = document.createElement('tr')

    row.innerHTML = `
      <td>${member.id}</td>
      <td>${member.name}</td>
      <td>${member.plan}</td>
      <td>${member.joinDate}</td>

      <td>
        <button
          class="btn btn-danger btn-sm"
          onclick="deleteMember(${member.id})"
        >
          Delete
        </button>
      </td>
    `

    tableBody.appendChild(row)
  })
}

// ADD MEMBER

const addMember = async () => {
  const name = document.getElementById('name').value

  const plan = document.getElementById('plan').value

  const joinDate = document.getElementById('joinDate').value

  if (!name || !plan || !joinDate) {
    alert('All fields required')
    return
  }

  const memberData = {
    name,
    plan,
    joinDate,
  }

  try {
    await fetch(API_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(memberData),
    })

    document.getElementById('name').value = ''

    document.getElementById('plan').value = ''

    document.getElementById('joinDate').value = ''

    getMembers()
  } catch (error) {
    console.log(error)
  }
}

// DELETE MEMBER

const deleteMember = async id => {
  try {
    await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    })

    getMembers()
  } catch (error) {
    console.log(error)
  }
}

// INITIAL LOAD

getMembers()