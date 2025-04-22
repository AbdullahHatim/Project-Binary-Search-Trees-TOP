import { Tree } from './Tree.js'

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)

tree.insert(6)
tree.insert(6.5)
tree.insert(6.8)
console.log(tree.height(8))
Tree.prettyPrint(tree.root)
