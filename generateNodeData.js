const _ = require('lodash')
var cuid = require('cuid')
var fs = require('fs')

generateNodeEntry = (typeName, id, name) => {
  const now = new Date().toISOString()
  return `{"_typeName": "${typeName}","id":"${id}","createdAt":"${now}","updatedAt":"${now}", "name":"${name}"}`
}

collectNodeEntries = (entries) => {
  return `{"valueType":"nodes","values":[${entries.join()}]}`
}

main = async() => {

  const tuples = _.range(40000).map(
    r => {
      const id = cuid()
      return {
        node: generateNodeEntry('A', id, id),
      }
    }
  )

  const nodes = collectNodeEntries(tuples.map(t => t.node))

  fs.writeFile('nodes.json', nodes, function(err) {
      if(err) {
        console.log(err)
      }

      console.log('Written nodes!')
    }
  )


}

main().catch((e) => console.error(e))
