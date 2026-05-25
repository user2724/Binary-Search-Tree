class Node {
            constructor(value) {
             this.value = value
             this.left = null;
             this.right = null
             this.parent = parent //parent
            }
        }

        class BST {
            constructor(array = []) {
                this.root = this.buildTree(array);
                
            }

      /*prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}*/

          buildTree(array) {
        
          if (array.length === 0) {return null}
          
           const uniqueArray = [...new Set(array)]
            let ascending = uniqueArray.sort((a, b) => a - b)
            let middleIndex = Math.floor(ascending.length / 2)  // Finds median number in an array
            
            const median = ascending[middleIndex]

            let root = new Node(median)

            
            const higher = uniqueArray.slice(middleIndex + 1)
            const lower = uniqueArray.slice(0, middleIndex)  



// if a number in higher or lower is higher or lower than a node, it goes to the right or left of that node

            root.right = this.buildTree(higher) // anything higher than the root
            root.left =  this.buildTree(lower) // anything lower than the root
            
            
            return root
          }

          // If the root equals the value, return true.
          //Otherwise, traverse through the tree until the right and left nodes are null
        

         includes(value) {
      /*if (tree.root === value) {
        return true
      }*/

      let node = this.root
      let higher = []
      let lower =  []


      while (node) {
        if (node.value === value) {
          return true
        }

        if (node.value < value) {
          if (node.right == null) {
            return false
          }
          node = node.right
        } else if (node.value > value) {
          if (node.left == null) {
            return false
          }
          node = node.left
        } else {
          return true
        }
        
        //node = node.right
      
      }
      
    }

    insert(value) {
      
      if (this.includes(value)) {
        return "value already exists in this tree"
      }

      let node = this.root


    

    while (node) {
      while (value > node.value) {
        if (node.right == null) {
          if (value > node.value) {
          node.right = new Node(value)
          return
          } else {
            node.left = new Node(value)
            return
          }
        }
        node = node.right
      }
      

      while (value < node.value) {
        if (node.left == null) {
          if (value < node.value ) {
          node.left = new Node(value)
           return
          } else {
            node.right = new Node(value)
             return
          }
        }
        node = node.left
      }
      
    }
  }

 deleteItem(value) {
  if (!this.includes(value)) {
    return "Value is already not in tree"
  }

  let node = this.root

  while (node) {
    if (node.value === value) {
      //return parent
      // 1st case: if it is a leaf node
      if (node.right == null && node.left == null) {
              //nullify the node's parent
              if (node.value > parent.value) {
                   parent.right = null
                   return
              } else if (node.value < parent.value) {
                parent.left = null
                return
              }
            
                         
          // 2nd case: If the node has only one child
      } else if ((!node.right && node.left) || (!node.left && node.right)) {
    if (node.value > parent.value) {  
                   parent.right = node.left
                   return
              } else if (node.value < parent.value) {
                parent.left = node.right
                return
              }
// 3rd case: If the node has two children
   } else if (node.right && node.left) {
     let successor = node.right.left
    if (!node.right.left) {
      successor = node.right
    } else {
      successor = node.right.left
    }



      if (node.value > parent.value) {
            parent.right = successor
      } else if (node.value < parent.value) {
        parent.left = successor
      }
      
      
      if (node.right.left) {
      successor.right = node.right;
      successor.left = node.left;
      node.right.left = null 
      
      
      } else if (!node.right.left) {
        successor.right = null
        successor.left = node.left
        
        
      }
    
      return node
   }

      
    }


    if (value > node.value) {
      parent = node
      node = node.right
    }
    if (value < node.value) {
      parent = node
      node = node.left 
    }
  }

 }   



 levelOrderForEach(callback) {

  let node = this.root

  let visited = []
 let queue = []
 queue.push(node)

while (queue.length != 0) {

  let currNode = queue[0]
  callback(currNode.value)

  if (currNode.right !== null) {
    queue.push(currNode.right)
  }

  if (currNode.left !== null) {
      queue.push(currNode.left)
  }

  queue = queue.slice(1)
  
 
}

return

 // once a node is visited, enqueue its children (node.right and node.left)
}



preOrderForEach(callback) {
  let queue = []
  let node = this.root
  
  callback(node)
  queue.push(node.left)


  while (queue.length != 0) {
    let currNode = queue[0]
     
     callback(currNode)
     console.log(currNode.value)

     if (currNode.left !== null) {
      queue.push(currNode.left)
     }

     if (currNode.right !== null) {
        queue.push(currNode.right)
     }
     queue = queue.slice(1)

  }

  queue.push(node.right)

  while(queue.length != 0) {
    let currNode = queue[0]
    callback(currNode)
    console.log(currNode.value) 
 
    if (currNode.left !== null) {
      queue.push(currNode.left)
     }

     if (currNode.right !== null) {
        queue.push(currNode.right)
     }
     queue = queue.slice(1)

  }

   return queue
}

inOrderForEach(callback, node = this.root, result = []) {
// Put all left nodes in ascending order, the put all right nodes in ascending order
// For each node, go to its left it exists, visit/enqueue the node, go to its right if it exists, and return to its parent.

let parent = null

if (node == null) {
  return result
}

this.inOrderForEach(callback, node.left);

result.push(node)
callback(node)

this.inOrderForEach(callback, node.right);




/*while (queue.length !== 14) {
 
 while (node.left && !queue.includes(node.left)) {
    parent = node
node = node.left

}
 queue.push(node)
visited.push(node)

while (node.right && !queue.includes(node.right)) {
    parent = node
node = node.right



}
if (node == parent.right) {
  queue.push(node)
  
}

if ((queue.includes(node.left) && queue.includes(node.right)) || (!node.left && !node.right)) {
    node = parent
    

}

Once the node no longer has a right node,*/// node = parent // Can't access a node's parent
//visited.push(node)


//}

}

postOrderForEach(callback, node = this.root) {

  if (node === null) {
  return
}

this.postOrderForEach(callback, node.left);
this.postOrderForEach(callback, node.right);
callback(node)



}

 height(value) {
//# of edges in the path from the node to a leaf node
let node = this.root
let leftCount = 0
let rightCount = 0;
let count = 0
/*if ((!node.right && !node.left) || node.value == value) {

  return count
}*/

while (node.value !== value) {
  if (node.value < value) {
    node = node.right
  }

if (node.value > value) {
    node = node.left
  }

}

let originalNode = node

  while (node.right) {
    rightCount += 1
    node = node.right
  }
  node = originalNode
  

while (node.left) {

    leftCount += 1
    node = node.left
}
node = originalNode

  
if (leftCount > rightCount) {
  return leftCount
} else {
  return rightCount
}


 }

 depth(value) {
  //# of edges in the path from the root node to the node

let node = this.root
let count = 0;

while (node !== value) {
        if (node.value === value) {
          return count
        }

        if (node.value < value) {
          count += 1;
          node = node.right
        } else if (node.value > value) {
          count += 1;
          node = node.left
        }
          
      
}


return count



 }

 subtreeHeight(value) {

let node = this.root
let leftCount = 0
let rightCount = 0;

/*if ((!node.right && !node.left) || node.value == value) {

  return count
}*/

while (node.value !== value) {
  if (node.value < value) {
    node = node.right
  }

if (node.value > value) {
    node = node.left
  }

}

let originalNode = node

  while (node.right) {
    rightCount += 1
    node = node.right
  }
  node = originalNode
  

while (node.left) {

    leftCount += 1
    node = node.left
}
node = originalNode

const rightDiff = (rightCount - leftCount)
const leftDiff = (leftCount - rightCount) 
  
if ((leftDiff > 1) || (rightDiff > 1)) {
  return "NOT BALANCED!"
} else {
  return leftDiff//"balanced."
}

 }

 isBalanced() {

// for each node, check whether the length of one of its subtrees is greater than the other subtree by more than 1
// Incorporate this.height(value)

let nodeArray = []

this.levelOrderForEach(node => {
  nodeArray.push(this.subtreeHeight(node))
  
})

if (nodeArray.includes("NOT BALANCED!")) {
  return "NOT BALANCED!"
} else {
  return "balanced."
}

 }

rebalance() {

let array = []

this.inOrderForEach(node => array.push(node.value))  

          
const uniqueArray = [...new Set(array)]

let middleIndex = Math.floor(uniqueArray.length / 2)  // Finds median number in an array
const median = uniqueArray[middleIndex]

let root = new Node(median)

const higher = uniqueArray.slice(middleIndex + 1)
const lower = uniqueArray.slice(0, middleIndex)  



// if a number in higher or lower is higher or lower than a node, it goes to the right or left of that node

            root.right = this.buildTree(higher) // anything higher than the root
            root.left =  this.buildTree(lower) // anything lower than the root
            
            
            this.root = root
            return this.root

  
  
}

}



       const test = new BST([1, 3, 4, 7, 5, 7, 67, 8, 9, 6345, 324, 4, 9])
       test.insert(5000)
       test.insert(6000)
       test.insert(7000)
       test.insert(58000)
       test.insert(10000)
       test.insert(9000)
       test.insert(5000)
       test.insert(8000)
       test.insert(57000)

       // console.log(test.postOrderForEach(node => console.log(node.value)))
        
        //console.log(test.rebalance())
        
        console.log(test.rebalance())
        console.log(test.isBalanced())

     
     //test.buildTree(array)
        

        console.log(test.root)
        //console.log(test.prettyPrint())