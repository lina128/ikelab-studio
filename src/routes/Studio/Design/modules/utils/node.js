// return the node, if not found, return null
export const findNode = (arr, id) => {
  if (!Array.isArray(arr)) return null

  var node

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i]
    }
    if (arr[i].children) {
      node = findNode(arr[i].children, id)
      if (node) return node
    }
  }

  return null
}

const dfs = (node, result) => {
  if (!node) return

  result.push(node.id)
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      dfs(node.children[i], result)
    }
  }
}

// return the new arr and set after the node and its children are both removed from the arr and set,
// if node not found, return null
export const removeNode = (arr, s, id, result) => {
  if (!arr) return

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      let toBeDeleted = []
      dfs(arr[i], toBeDeleted)

      let newS = { ...s }
      for (let j = 0; j < toBeDeleted.length; j++) {
        delete newS[toBeDeleted[j]]
      }

      result.arr = [
        ...arr.slice(0, i),
        ...arr.slice(i + 1)
      ]

      result.s = newS

      break
    }
    removeNode(arr[i].children, s, id, result)
    if (result.arr) {
      result.arr = [
        ...arr.slice(0, i),
        { ...arr[i], children: [ ...result.arr ] },
        ...arr.slice(i + 1)
      ]

      break
    }
  }
}

// return the top parent
export const findNodeParent = (arr, id) => {
  if (!Array.isArray(arr)) return null

  var node, parent

  for (let i = 0; i < arr.length; i++) {
    parent = arr[i]
    if (arr[i].id === id) {
      return parent
    }
    if (arr[i].children) {
      node = findNode(arr[i].children, id)
      if (node) {
        return parent
      }
    }
  }

  return null
}

export const copyNode = (node, entity, counter) => {
  const newNode = {}
  newNode.counter = counter

  newNode.counter++

  if (node.children) {
    newNode.node = {
      ...node,
      id: newNode.counter,
      children: []
    }
  } else {
    newNode.node = {
      ...node,
      id: newNode.counter
    }
  }

  newNode.entity = {
    ...entity,
    [newNode.counter]: {
      ...JSON.parse(JSON.stringify(entity[node.id])),
      name: entity[node.id].type + newNode.counter
    }
  }

  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      let childNode = copyNode(node.children[i], newNode.entity, newNode.counter)
      newNode.node.children.push(childNode.node)
      newNode.entity = childNode.entity
      newNode.counter = childNode.counter
    }
  }

  return newNode
}

// return the new array after the node is inserted before a target node, if target node not found, return null
export const insertNodeBefore = (arr, id, node) => {
  if (!Array.isArray(arr)) return null
  if (typeof node !== 'object') return null

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return [
        ...arr.slice(0, i),
        node,
        { ...arr[i] },
        ...arr.slice(i + 1)
      ]
    }
    if (arr[i].children && arr[i].children.length > 0) {
      const newArr = insertNodeBefore(arr[i].children, id, node)
      if (newArr) {
        return [
          ...arr.slice(0, i),
          { ...arr[i], children: newArr },
          ...arr.slice(i + 1)
        ]
      }
    }
  }

  return null
}

// return the new array after the node is inserted after a target node, if target node not found, return null
export const insertNodeAfter = (arr, id, node) => {
  if (!Array.isArray(arr)) return null
  if (typeof node !== 'object') return null

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return [
        ...arr.slice(0, i),
        { ...arr[i] },
        node,
        ...arr.slice(i + 1)
      ]
    }
    if (arr[i].children && arr[i].children.length > 0) {
      const newArr = insertNodeAfter(arr[i].children, id, node)
      if (newArr) {
        return [
          ...arr.slice(0, i),
          { ...arr[i], children: newArr },
          ...arr.slice(i + 1)
        ]
      }
    }
  }

  return null
}

export const insertNodeIn = (arr, id, node) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return [
        ...arr.slice(0, i),
        { ...arr[i], children: [node] },
        ...arr.slice(i + 1)
      ]
    }
    if (arr[i].children) {
      const newArr = insertNodeIn(arr[i].children, id, node)
      if (newArr) {
        return [
          ...arr.slice(0, i),
          { ...arr[i], children: newArr },
          ...arr.slice(i + 1)
        ]
      }
    }
  }

  return null
}

// only one key-value pair in c is allowed,
// the value in c can be a primitive type, array of size 1, or object
export const extend = (arr, id, c) => {
  if (!c) return arr

  const keys = Object.keys(c)
  if (keys.length === 0 || keys.length > 1) return arr

  const key = keys[0]
  const isArray = Array.isArray(c[key])
  const isObject = (typeof c[key] === 'object') && (c[key] !== null)

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      if (Object.keys(arr[i]).indexOf(key) > -1) {
        if (isArray) {
          const oldC = arr[i][key]

          if (oldC.indexOf(c[key][0]) < 0) {
            return [
              ...arr.slice(0, i),
              { ...arr[i], [key]: [ ...oldC, c[key][0] ] },
              ...arr.slice(i + 1)
            ]
          } else {
            return arr
          }
        } else if (isObject) {
          return [
            ...arr.slice(0, i),
            { ...arr[i], [key]: { ...arr[i][key], ...c[key] } },
            ...arr.slice(i + 1)
          ]
        } else {
          return [
            ...arr.slice(0, i),
            { ...arr[i], [key]: c[key] },
            ...arr.slice(i + 1)
          ]
        }
      } else {
        return arr
      }
    }
    if (arr[i].children) {
      const newArr = extend(arr[i].children, id, c)
      if (newArr) {
        return [
          ...arr.slice(0, i),
          { ...arr[i], children: newArr },
          ...arr.slice(i + 1)
        ]
      }
    }
  }

  return null
}

// only one key-value pair in c is allowed
// the value in c can be a primitive type, array of size 1, or object
export const remove = (arr, id, c) => {
  if (!c) return arr

  const keys = Object.keys(c)
  if (keys.length === 0 || keys.length > 1) return arr

  const key = keys[0]
  const isArray = Array.isArray(c[key])
  const isObject = (typeof c[key] === 'object') && (c[key] !== null)

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      if (Object.keys(arr[i]).indexOf(key) > -1) {
        if (isArray) {
          const oldC = arr[i][key]
          let idx = arr[i][key].indexOf(c[key][0])

          if (idx > -1) {
            return [
              ...arr.slice(0, i),
              { ...arr[i], [key]: [ ...oldC.slice(0, idx), ...oldC.slice(idx + 1) ] },
              ...arr.slice(i + 1)
            ]
          } else {
            return arr
          }
        } else if (isObject) {
          delete arr[i][key][Object.keys(c[key])[0]]

          return [
            ...arr.slice(0, i),
            { ...arr[i] },
            ...arr.slice(i + 1)
          ]
        } else {
          delete arr[i][key]

          return [
            ...arr.slice(0, i),
            { ...arr[i] },
            ...arr.slice(i + 1)
          ]
        }
      } else {
        return arr
      }
    }
    if (arr[i].children) {
      const newArr = remove(arr[i].children, id, c)
      if (newArr) {
        return [
          ...arr.slice(0, i),
          { ...arr[i], children: newArr },
          ...arr.slice(i + 1)
        ]
      }
    }
  }

  return null
}

// only one key-value pair in c is allowed,
// the value in c can be a primitive type, array of size 1, or object
export const extendSet = (s, id, c) => {
  if (!c) return s

  const keys = Object.keys(c)
  if (keys.length === 0 || keys.length > 1) return s

  const key = keys[0]
  const isArray = Array.isArray(c[key])
  const isObject = (typeof c[key] === 'object') && (c[key] !== null)

  if (isArray) {
    const oldC = s[id][key]

    if (oldC.indexOf(c[key][0]) < 0) {
      return {
        ...s,
        [id]: {
          ...s[id],
          [key]: [
            ...oldC,
            c[key][0]
          ]
        }
      }
    } else {
      return s
    }
  } else if (isObject) {
    return {
      ...s,
      [id]: {
        ...s[id],
        [key]: {
          ...s[id][key],
          ...c[key]
        }
      }
    }
  } else {
    return {
      ...s,
      [id]: {
        ...s[id],
        [key]: c[key]
      }
    }
  }
}
