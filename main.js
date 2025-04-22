import { Tree } from './Tree.js'
function getRandomNumber (n = 100) {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * n)
  }
  return arr
}

const tree = new Tree(getRandomNumber())
Tree.prettyPrint(tree.root)
console.log('1- isBalanced(): ', tree.isBalanced())

let preOrder = []
tree.preOrder(n => preOrder.push(n.data))
let inOrder = []
tree.inOrder(n => inOrder.push(n.data))
let postOrder = []
tree.postOrder(n => postOrder.push(n.data))
console.log(
  `2- All Elements (Depth-First Traversal):
  Pre Order: [${preOrder.toString()}]
  \n
  In Order: [${inOrder.toString()}]
  \n
  Post Order: [${postOrder.toString()}]
  `)

for (let i = 0; i < 10; i++) {
  tree.insert(i + 101)
}

console.log('3- isBalanced(): ', tree.isBalanced())
console.log('4- Balancing')
tree.rebalance()
console.log('5- isBalanced(): ', tree.isBalanced())

preOrder = []
tree.preOrder(n => preOrder.push(n.data))
inOrder = []
tree.inOrder(n => inOrder.push(n.data))
postOrder = []
tree.postOrder(n => postOrder.push(n.data))
console.log(
  `6- All Elements (Depth-First Traversal):
  Pre Order: [${preOrder.toString()}]
  \n
  In Order: [${inOrder.toString()}]
  \n
  Post Order: [${postOrder.toString()}]
  `)
