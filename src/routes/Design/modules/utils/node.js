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

// return the new array after the node is removed, if node not found, return null
export const removeNode = (arr, id) => {
  if (!Array.isArray(arr)) return null

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return [
        ...arr.slice(0, i),
        ...arr.slice(i + 1)
      ]
    }
    if (arr[i].children) {
      const newArr = removeNode(arr[i].children, id)
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

// return the new array after the node is inserted before a target node, if target node not found, return null
export const insertNodeBefore = (arr, id, node) => {
  if (!Array.isArray(arr)) return null
  if (typeof node !== 'object') return null

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return [
        ...arr.slice(0, i),
        { ...node },
        { ...arr[i] },
        ...arr.slice(i + 1)
      ]
    }
    if (arr[i].children) {
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
        { ...node },
        ...arr.slice(i + 1)
      ]
    }
    if (arr[i].children) {
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

// only one key-value pair in c is allowed
export const extend = (arr, id, c) => {
  if (!c) return arr

  const keys = Object.keys(c)
  if (keys.length === 0 || keys.length > 1) return arr

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      if (Object.keys(arr[i]).indexOf(keys[0]) > -1) {
        if (Array.isArray(arr[i][keys[0]])) {
          const reduced = []
          for (let j = 0; j < c[keys[0]].length; j++) {
            if (arr[i][keys[0]].indexOf(c[keys[0]][j]) === -1) {
              reduced.push(c[keys[0]][j])
            }
          }
          if (reduced.length > 0) {
            const e = {
              [keys[0]]: [
                ...arr[i][keys[0]],
                ...c[keys[0]] ]
            }

            return [
              ...arr.slice(0, i),
              { ...arr[i], ...e },
              ...arr.slice(i + 1)
            ]
          } else {
            return arr
          }
        } else {
          return [
            ...arr.slice(0, i),
            { ...arr[i], ...c },
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
export const remove = (arr, id, c) => {
  console.log(id)
  console.log(c)
  if (!c) return arr

  const keys = Object.keys(c)
  if (keys.length === 0 || keys.length > 1) return arr

  const toBeDeleted = {}
  console.log('node')
console.log(c)
  if (Array.isArray(c[keys[0]])) {
    for (let j = 0; j < c[keys[0]].length; j++) {
     // console.log(c[keys[0]])
   //   console.log(c[keys[0]][j])
      toBeDeleted[c[keys[0]][j]] = true
    }
  }
console.log(toBeDeleted)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      const oldC = arr[i][keys[0]]
      if (Object.keys(arr[i]).indexOf(keys[0]) > -1) {
        if (Array.isArray(oldC)) {
          const newC = []
          for (let j = 0; j < oldC.length; j++) {
            if (!toBeDeleted[oldC[j]]) {
              newC.push(oldC[j])
            }
          }
          if (oldC.length !== newC.length) {
            const e = {
              [keys[0]]: newC
            }

            return [
              ...arr.slice(0, i),
              { ...arr[i], ...e },
              ...arr.slice(i + 1)
            ]
          } else {
            return arr
          }
        } else {
          delete arr[i][keys[0]]

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
