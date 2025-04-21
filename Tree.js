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
    }
  }
}
