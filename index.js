const express = require('express')
const app = express()
const port = 3000
const { User } = require('./models')
const bodyparser = require('body-parser')

app.use(bodyparser.json())

// get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch users'
    })
  }
})

// get user by id
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch user'
    })
  }
})

// create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to create user'
    })
  }
})

// update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.send(user)
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to update user'
    })
  }
})

// delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send(user)
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to delete user'
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})