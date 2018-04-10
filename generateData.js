const _ = require('lodash')
var cuid = require('cuid')
var fs = require('fs')

generateNodeEntry = (typeName, id) => {
  const now = new Date().toISOString()
  return `{"_typeName": "${typeName}","id":"${id}","createdAt":"${now}","updatedAt":"${now}"}`
}

generateListEntry = (typeName, id, strings) => {
  return `{"_typeName": "${typeName}","id":"${id}","strings":[${strings}]}`
}

collectNodeEntries = (entries) => {
  return `{"valueType":"nodes","values":[${entries.join()}]}`
}

collectListEntries = (entries) => {
  return `{"valueType":"lists","values":[${entries.join()}]}`
}

main = async() => {
  const strings = [
    '"a"', '"b"', '"c"', '"d"', '"e"',
    '"f"', '"g"', '"h"', '"i"', '"j"',
    '"k"', '"l"', '"m"', '"n"', '"o"',
    '"p"', '"q"', '"r"', '"s"', '"t"',
    '"u"', '"v"', '"w"', '"x"', '"y"',
    '"z"', '"0"', '"1"', '"2"', '"3"',
    '"4"', '"5"', '"6"', '"7"', '"8"',
    '"9"', '"a"', '"b"', '"c"', '"d"',
    '"e"', '"f"', '"g"', '"h"', '"i"',
    '"j"', '"k"', '"l"', '"m"', '"n"'
  ]

  const tuples = _.range(1000).map(
    r => {
      const id = cuid()
      return {
        node: generateNodeEntry('A', id),
        list: generateListEntry('A', id, strings)
      }
    }
  )

  const nodes = collectNodeEntries(tuples.map(t => t.node))
  const lists = collectListEntries(tuples.map(t => t.list))

  fs.writeFile('lists.json', lists, function(err) {
      if(err) {
        console.log(err)
      }

      console.log('Written lists!')
    }
  )

  fs.writeFile('nodes.json', nodes, function(err) {
      if(err) {
        console.log(err)
      }

      console.log('Written nodes!')
    }
  )


}

main().catch((e) => console.error(e))
