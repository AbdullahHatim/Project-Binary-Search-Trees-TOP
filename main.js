import { Tree } from './Tree.js'

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr)

// tree.insert(6)
Tree.prettyPrint(tree.root)
