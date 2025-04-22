import { Tree } from './Tree.js'

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)

// tree.insert(6)
tree.insert(6.5)
// tree.insert(6.8)
console.log(tree.height(tree.root.right.data))
console.log(tree.height(tree.root.left.data))

let sortedArr = []
tree.inOrder(n => { sortedArr.push(n.data) })
console.log(sortedArr)
Tree.prettyPrint(tree.root)
// console.log(tree.depth(6.9))
// console.log(tree.isBalanced())
tree.rebalance()
console.log('After')
sortedArr = []
tree.inOrder(n => { sortedArr.push(n.data) })
console.log(sortedArr)

Tree.prettyPrint(tree.root)
