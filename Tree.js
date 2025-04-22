import { Node } from './Node.js'

export class Tree {
  constructor (arr) {
    this.root = Tree.buildTree(arr)
  }

  static buildTree (arr = []) {
    // Sort And Remove Duplicates
    arr.sort((a, b) => a - b)
    function removeDuplicates (arr) {
      const cleanArr = []
      arr.forEach(n => { if (!cleanArr.includes(n)) cleanArr.push(n) })
      return cleanArr
    }
    const cleanArr = removeDuplicates(arr)
    // Then Return the Tree
    return Tree.getBalancedBST(cleanArr, 0, cleanArr.length - 1)
  }

  static getBalancedBST (arr = [], start, end) {
    if (start > end) return null
    const mid = Math.floor((start + end) / 2)

    const root = new Node(arr[mid])
    root.left = this.getBalancedBST(arr, start, mid - 1)
    root.right = this.getBalancedBST(arr, mid + 1, end)

    return root
  }

  static prettyPrint (node, prefix = '', isLeft = true) {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      Tree.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }

  insert (value) {
    let next = this.root
    while (next !== null) {
      // Should (value) go into left sub-tree?
      if (value < next.data) {
        // if there is another sub-tree repeat
        if (next.left) {
          next = next.left
          continue
        }
        // otherwise make (value) the left sub-tree
        next.left = new Node(value)
        break
      }
      // Should (value) go into right sub-tree?
      if (value > next.data) {
        // if there is another sub-tree repeat
        if (next.right) {
          next = next.right
          continue
        }
        // otherwise make (value) the right sub-tree
        next.right = new Node(value)
        break
      }
      // nothing happens if value === next.data
      break
    }
  }

  deleteItem (value) {
    function findNodeAndParent (root) {
      // we are basically pushing our entire path then
      // the last two will be the parent and the node
      const stack = [null]

      let next = root
      do {
        stack.push(next)
        if (value < next.data) {
          next = next.left
          if (next === null) stack.push(next)
          continue
        }
        if (value > next.data) {
          next = next.right
          if (next === null) stack.push(next)
          continue
        }
        // If the value === next.data
        break
      } while (next !== null)

      //     |    Node   |   Parent    |
      return [stack.pop(), stack.pop()]
    }
    const [node, parent] = findNodeAndParent(this.root)

    // Case 1️⃣: Value doesn't exist [✅]
    if (!node) return false

    // * The property Name where parent is referencing node (left or right)
    // *    👇  = witch ever property name holds node
    let where = ''
    if (parent) {
      if (parent.left === node) {
        where = 'left'
      }
      if (parent.right === node) {
        where = 'right'
      }
    }

    // Case 2️⃣: Value is a leaf node [✅]
    if (!node.left && !node.right) {
      // de-reference it
      parent[where] = null
      return 'Leaf 🍁'
    }

    // Case 3️⃣: Value has either Left || Right [✅]
    //    A- Has Left only
    if (node.left && !node.right) {
      parent[where] = node.left
      node.left = null
      return 'Has Left only 👈'
    }
    //    B- Has Right only
    if (!node.left && node.right) {
      parent[where] = node.right
      node.right = null
      return 'Has Right only 👉'
    }

    // Case 4️⃣: Value Has Both Right & Left [✅]
    //   A- Go Right Then find Left Most node
    const target = getLeftMostOfRight()
    function getLeftMostOfRight () {
      let next = node.right
      while (next.left !== null) {
        next = next.left
      }
      return next
    }
    //   B- Replace node with target
    this.deleteItem(target.data)
    if (parent) parent[where] = target
    target.left = node.left
    target.right = node.right
    node.left = null
    node.right = null
    //   C- node is root then root = target
    if (node === this.root) this.root = target

    console.log(target.data)
    return 'Has Left & Right 🌳'
  }

  find (value) {
    let next = this.root
    do {
      if (value < next.data) {
        next = next.left
        continue
      }
      if (value > next.data) {
        next = next.right
        continue
      }
      // If the value === next.data
      break
    } while (next !== null)
    return next
  }

  levelOrder (callback) {
    if (!(callback instanceof Function)) throw new TypeError('Expected a function')

    const queue = []
    // 🧊 Syntactic Sugar
    queue.enqueue = queue.push
    queue.dequeue = queue.shift

    let next
    queue.enqueue(this.root)

    while (queue.length) {
      next = queue.dequeue()
      if (next.left) queue.enqueue(next.left)
      if (next.right) queue.enqueue(next.right)

      callback(next)
    }
  }

  levelOrderRec (callback) {
    if (!(callback instanceof Function)) throw new TypeError('Expected a function')
    // 🔁 Recursively Traverse Breadth-First
    function traverse (queue = []) {
      if (!queue.length) return

      const next = queue.shift()
      if (next.left) queue.push(next.left)
      if (next.right) queue.push(next.right)

      callback(next)
      traverse(queue)
    }
    traverse([this.root])
    // 🤔 I like the while loop version
  }

  // 👁‍🗨 Depth-First Traversal
  // * A- Pre order traversal   📞 👈 👉
  preOrder (callback) {
    if (!(callback instanceof Function)) throw new TypeError('Expected a function')
    function traverse (root) {
      if (!root) return
      callback(root)
      if (root.left) traverse(root.left)
      if (root.right) traverse(root.right)
    }
    traverse(this.root)
  }

  // * B- In order traversal    👈 📞 👉
  inOrder (callback) {
    if (!(callback instanceof Function)) throw new TypeError('Expected a function')
    function traverse (root) {
      if (!root) return
      if (root.left) traverse(root.left)
      callback(root)
      if (root.right) traverse(root.right)
    }
    traverse(this.root)
  }

  // * C- Post order traversal  👈 👉 📞
  postOrder (callback) {
    if (!(callback instanceof Function)) throw new TypeError('Expected a function')
    function traverse (root) {
      if (!root) return
      if (root.left) traverse(root.left)
      if (root.right) traverse(root.right)
      callback(root)
    }
    traverse(this.root)
  }
}
