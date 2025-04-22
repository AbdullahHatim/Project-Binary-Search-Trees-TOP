import { Tree } from './Tree.js'

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)

Tree.prettyPrint(tree.root)

console.log(tree.depth(4))
