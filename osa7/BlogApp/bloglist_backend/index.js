const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

const PORT = 3003
app.listen(config.PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
