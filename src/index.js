'use strict'

const moment = require('moment')
const express = require('express')
const app = express()

const parseDate = t => {
  let time = moment(t, 'MMMM DD, YYYY', true)
  if (!time.isValid()) {
    time = moment.unix(t)
  }
  return time
}

app.set('port', 5000)

app.get('/:timestamp', (req, res) => {
  const timestamp = req.params.timestamp
  const date = parseDate(timestamp)

  if (!date.isValid()) {
    res.json({
      humanReadable: null,
      unix: null
    })
  } else {
    const time = moment.unix(timestamp)
    res.json({
      humanReadable: time.format('MMMM DD, YYYY'),
      unix: time.format('X')
    })
  }
})

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`)
})
