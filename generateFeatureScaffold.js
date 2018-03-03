const fs = require('fs')

config = {
  pathToSrc: [ 'src' ],
  pathToTest: [ 'test' ]
}

// const featureSchema = {
//   name: '',
//   description: '',
//
//   // TODO: this must take an toption to connect it to the store, a connectStore array
//   components: [
//     { path: ['pages'], fileName: 'Example' },
//     { path: ['shared'], fileName: 'Example2' }
//   ],
//   snippets: [
//
//   ],
//   utilities: [
//     { path: [''], fileName: '' }
//   ],
//   content: [
//
//   ],
//   updateSchemaCreators: [
//
//   ]
// }

const featureSchema = require(`./featureSchemas/${process.argv[2]}.js`)


// TODO: turn this into a function that takes the component name and path.length for mastermind path
const reactComponentBoilerplate = `
import React,{ Component } from 'react'
import mastermind from './../../mastermind'

class ComponentName extends Component {
  render() {
    return(
      <div className=""></div>
    )
  }
}
`

featureSchema.components.forEach((component, i) => {
  const { path, fileName } = component

  // create folders if they doesn't exist
  let totalPath = './'
  config.pathToSrc.concat(path).forEach(dirName => {
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

  if (!fs.existsSync(pathAndFileName)) {
    console.log('file doesnt already exist')
    fs.writeFileSync(pathAndFileName, reactComponentBoilerplate)
  }
})
