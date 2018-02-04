const fs = require('fs')

const featureSchema = {
  components: [
    { path: ['src', 'components'], fileName: 'Example.js' },
    { path: ['src', 'components'], fileName: 'Example2.js' }
  ]
}

featureSchema.components.forEach(component => {
  const { path, fileName } = component

  // create folders if they doesn't exist
  let totalPath = './'
  path.forEach(dirName => {
    const currentDir = totalPath + dirName + '/'
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir)
    }
    totalPath = currentDir
  })

  const pathAndFileName = totalPath + '/' + fileName
  fs.writeFileSync(pathAndFileName, '')
})
