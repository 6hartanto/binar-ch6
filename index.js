const express = require('express')
const app = express()
const port = 3000
const { User } = require('./models')
const bodyparser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

// api: get all users
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

// api: get user by id
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

// api: create user
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

// api: update user
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

// api: delete user
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

// ui: get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.render('users/index', { users })
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch users'
    })
  }
})

// ui: create user
app.post('/users/create', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.redirect('/users')
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to create user'
    })
  }
})

app.get('/users/create', async (req, res) => {
  res.render('users/create')
})

// ui: update user
app.post('/users/update/(:id)', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.redirect('/users')
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to update user'
    })
  }
})

app.get('/users/edit/(:id)', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.render('users/edit', { id: req.params.id, user })
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch user'
    })
  }
})

// ui: delete user
app.get('/users/delete/(:id)', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.redirect('/users')
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to delete user'
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})