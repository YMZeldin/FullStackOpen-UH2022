//const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// Simple web server ===========================================================
/* const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
}) */

// Middleware request logger ===================================================
/* const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
} */
app.use(express.json())
app.use(cors())
//app.use(requestLogger)

morgan.token('json-body', function getJsonBody(request) {
  return JSON.stringify(request.body)
})

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-body'))

// =============================================================================
const generateId = () => {
    const newId = Math.floor(Math.random() * 1000000)
    if (persons.length === 0) return newId
    
    while (persons.findIndex(person => person.newId) !== -1) {
      newId += 1
    }
    return newId

    //const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    //return maxId + 1
  }

// =============================================================================
app.get('/', (request, response) => {
    response.send(`<h1>Hello, I am note backend app!</h1>`)
  })

// =============================================================================
app.get('/info', (request, response) => {
  const numOfPersons = persons.length
  const currentDate = new Date()
  response.send(`<h3>Phonebook has info for ${numOfPersons} people</h3>
  <div>${currentDate.toString()}</div>`)
})

// =============================================================================
app.get('/api/persons', (request, response) => {
    //console.log(request.headers)
    response.json(persons)
  })

// =============================================================================
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    //console.log('%cindex.js line:42 person', 'color: #007acc;', person);
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

// =============================================================================
app.post('/api/persons', (request, response) => {
    //console.log(request.headers)
    const body = request.body
    if (!body.name || !body.number) {
      return response.status(400).json({error: 'name or number is missing'})
    }
    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({
        error: `name ${body.name} is already exists in phonebook, name must be unique`})
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
   
    persons = persons.concat(person)
    response.json(person)
  })

// =============================================================================
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log('%cindex.js line:51 id', 'color: #007acc;', id);
    if (persons.findIndex(person => person.id === id) !== -1) {
      persons = persons.filter(person => person.id !== id)
      response.status(204).end()
    } else {
      response.status(500).send(`error: person with id = ${id} isn't exist`)
    }
  })

// ===========================================================================
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// =============================================================================
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Json-server 'persons' is running on port ${PORT}`)
  })
