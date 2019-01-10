const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const { MongoClient, ObjectID } = require('mongodb')

const uri = 'mongodb://localhost:27017'

MongoClient.connect(uri, function(err, client) {
// Use the test db
const db = client.db('test')
// Get the admin interface
const adminDb = db.admin();
// List all the available databases
adminDb.listDatabases(function(err, dbs) {
    console.log(dbs)
    client.close()
})

})

let app = express()
app.use(session({
  secret: 'many Bothans died to bring us this information',
  cookie: {
    maxAge: 60000  // One minute
  } 
}))

// app.use(session({
//     secret: 'There is no spoon',
//     store: new MongoStore({
//       url: 'mongodb://localhost/session-demo',
//       ttl: 14 * 24 * 60 * 60  // 14 days (default)
//     })
// }))

app.use(morgan('dev'))

app.get('/', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })



app.listen(3001)