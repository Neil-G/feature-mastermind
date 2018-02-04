const fs = require('fs')

const featureSchema = {
  components: [
    { path: ['src', 'components', 'pages'], fileName: 'Example' },
    { path: ['src', 'components', ' shared'], fileName: 'Example2' }
  ]
}

featureSchema.components.forEach((component, i) => {
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

  // create index file if not created
  const indexFileNameAndPath = totalPath + '/' + 'index.js'
  if (!fs.existsSync(indexFileNameAndPath)) {
    fs.writeFileSync(indexFileNameAndPath, '')
  }

  // add export to index file
  const exportStatement = `export { default as ${fileName} } from './${fileName}'`

  let exportedComponents = fs.readFileSync(indexFileNameAndPath, 'utf8').split("\n")
  exportedComponents.push(exportStatement)
  exportedComponents  = [ ...new Set(exportedComponents) ].filter(statement => !!statement).join("\n")

  fs.writeFileSync(indexFileNameAndPath, exportedComponents)

  // create component file
  const pathAndFileName = totalPath + '/' + fileName + '.js'
  fs.writeFileSync(pathAndFileName, '')
})
