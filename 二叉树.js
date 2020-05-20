//二叉树相关
//构造一个二叉树
function BinaryTree() {
  function Node(val) {
    this.value = val
    this.left = null
    this.right = null
  }

  this.root = null
  this.append = function (val) {
    function insertNode(val, root) {
      if (val > root.value) {
        if (root.right === null) {
          root.right = new Node(val)
        } else {
          insertNode(val, root.right)
        }
      }
      // else {                   //相同数值的节点能插进去
      //     if (root.left === null) {
      //         root.left = new Node(val)
      //     } else {
      //         insertNode(val, root.left)
      //     }
      // }
      if (val < root.value) { //相同的数值的节点不能插进去
        if (root.left === null) {
          root.left = new Node(val)
        } else {
          insertNode(val, root.left)
        }
      }
    }

    if (this.root === null) {
      this.root = new Node(val)
    } else {
      insertNode(val, this.root)
    }
  }
}

let Binary = new BinaryTree()
Binary.append(8)
Binary.append(6)
Binary.append(7)
Binary.append(9)
Binary.append(4)
Binary.append(2)
Binary.append(10)
Binary.append(11)
Binary.append(5)
Binary.append(4)
Binary.append(4)
Binary.append(4)
Binary.append(4)
Binary.append(4)
Binary.append(4)
Binary.append(4)
Binary.append(4)
console.log(Binary.root, '二叉树')
//求二叉树的节点数
// let nodeNum = 0
// function getNodenum(root) {
//     if (root === null) return
//     nodeNum++
//     getNodenum(root.right)
//     getNodenum(root.left)
//     return nodeNum
// }
function getNodenum(root) {
  if (root === null) {
    return 0
  }
  let leftNum = getNodenum(root.left)
  let rightNum = getNodenum(root.right)
  return leftNum + rightNum + 1
}

console.log(getNodenum(Binary.root), '二叉树的节点数')

//求二叉树的最大深度
function maxDepth(root) {
  if (root === null) {
    return 0
  }
  let leftDepth = maxDepth(root.left)
  let rightDepth = maxDepth(root.right)
  return Math.max(leftDepth, rightDepth) + 1
}

console.log(maxDepth(Binary.root), '二叉树最大深度')
//二叉树的最小深度
// 1.如果根节点为空，则最小深度为0
// 2.如果只有一个根节点(根节点的左右子树为空)，则最小深度为1
// 3.如果左子树为空，右子树不为空，最小深度为1+右子树的最小深度
// 4.如果右子树为空，左子树不为空，最小深度为1+左子树的最小深度
// 5.如果左右子树都不为空，则最小深度为1+左右子树最小深度中的较小值
var minDepth = function (root) {
  if (!root) {
    return 0;
  }
  if (!root.left) {
    return minDepth(root.right) + 1;
  }
  if (!root.right) {
    return minDepth(root.left) + 1;
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
console.log(minDepth(Binary.root), '二叉树最小深度')

//二叉树的前中后序遍历
function preTraverse(root) {
  if (root === null) {
    return
  }
  console.log(root.value, '前序遍历')
  preTraverse(root.left)
  preTraverse(root.right)
}

preTraverse(Binary.root)

function middleTraverse(root) {
  if (root === null) {
    return
  }
  middleTraverse(root.left)
  console.log(root.value, '中序遍历')
  middleTraverse(root.right)
}

middleTraverse(Binary.root)

function lastTraverse(root) {
  if (root === null) {
    return
  }
  lastTraverse(root.left)
  lastTraverse(root.right)
  console.log(root.value, '后序遍历')
}

lastTraverse(Binary.root)

//分层遍历（非递归）  有待进一步研究
function bfs(root) {
  let queue = [],
    result = []
  if (root !== null) {
    queue.push(root)
  }
  let pointer = 0
  while (pointer < queue.length) {
    let temp = queue[pointer++]
    result.push(temp.value)
    temp.left && queue.push(temp.left)
    temp.right && queue.push(temp.right)
  }
  return result
}

console.log(bfs(Binary.root), '分层遍历')

//二叉树的第k层的节点数
function getknum(root, k) {
  if (root === null) {
    return 0
  }
  if (root !== null && k === 1) {
    return 1
  }
  return getknum(root.left, k - 1) + getknum(root.right, k - 1)
}

console.log(getknum(Binary.root, 3), '第k层的节点数')

//求二叉树第K层的叶子节点个数
function getksonnum(root, k) {
  if (root === null) {
    return 0
  }
  if (root !== null && k === 1) {
    if (root.left === null && root.right === null) {
      return 1
    } else {
      return 0
    }
  }
  return getksonnum(root.left, k - 1) + getksonnum(root.right, k - 1)
}

console.log(getksonnum(Binary.root, 3), '第k层的叶子节点数')

//反转二叉树
function reverseRoot(root) {
  if (root === null) {
    return
  }
  let temp
  temp = root.left
  root.left = root.right
  root.right = temp
  reverseRoot(root.right)
  reverseRoot(root.left)
}

//求二叉树的直径<<转化为求左子树的最大深度与右子树的最大深度和>>
function longerlength(root) {
  let path = 0
  getlongerlength(root)
  return path

  function getlongerlength(root) {
    if (root == null) {
      return
    }
    let left = longerlength(root.left)
    let right = longerlength(root.right)
    path = Math.max(path, left + right)
    return Math.max(left, right) + 1
  }
}

//给定一棵二叉搜索树，请找出其中的第k小的结点。(中序遍历+ k小)
// 二叉树中和为某一值的路径
// function getPath(root, target) {
//     let result = []
//     if (root) {
//         findPath(root, target, [], 0, result)
//     }
//     return result
//     function findPath(root, target, stack, sum, result) {
//         stack.push(root.key)
//         sum += root.key
//         if (!root.left && !root.right && sum === target) {
//             result.push(stack.slice(0))
//         }
//         if (root.left) {
//             findPath(root.left, target, stack, sum, result)
//         }
//         if (root.right) {
//             findPath(root.right, target, stack, sum, result)
//         }
//         stack.pop()
//     }
// }
function FindPath(root, expectNumber) {
  // write code here
  if (root === null) {
    return [];
  }
  let res = []
  traversalTree(root, [], 0, res, expectNumber);
  return res.sort(function (a, b) {
    return b.length - a.length
  });
}

function traversalTree(root, path, sum, res, expectNumber) {
  if (root === null && expectNumber === sum) {
    res.push(path);
    return;
  } else if (root === null) {
    return;
  }
  let newPath = path.concat(root.value);
  sum += root.value;
  if (root.left === null && root.right === null && expectNumber === sum) {
    res.push(newPath);
    return;
  }
  traversalTree(root.left, newPath, sum, res, expectNumber);
  traversalTree(root.right, newPath, sum, res, expectNumber);
}

console.log(FindPath(Binary.root, 21), '二叉树的路径')

//查找二叉树的最小值
function findMin(root) {
  if (root === null) {
    return
  }
  if (root.left === null) {
    return root.value
  }
  return findMin(root.left)
}

console.log(findMin(Binary.root), '二叉树的最小值')

//查找二叉树的最大值
function findMax(root) {
  if (root === null) {
    return
  }
  if (root.right === null) {
    return root.value
  }
  return findMax(root.right)
}

console.log(findMax(Binary.root), '二叉树的最大值')
//判断是否为平衡二叉树
//所谓的平衡二叉树，就是指数中任一结点的左右子树深度相差不超过1。
var isBalanced = function (root) {
  function getHeight(node) {
    if (node === null) return 0;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  }

  if (root === null) return true;
  return isBalanced(root.left) && isBalanced(root.right) &&
    Math.abs(getHeight(root.left) - getHeight(root.right)) < 2;
};

//二叉树的右视图
//深度优先搜索&&广度优先搜索
var rightSideView = function (root) {
  if (!root) return []
  let arr = []
  dfs(root, 0, arr)
  function dfs(root, step, res) {
    if (root) {
      if (res.length === step) {
        res.push(root.val) // 当数组长度等于当前 深度 时, 把当前的值加入数组
      }
      // console.log(step, '-------', res)
      dfs(root.right, step + 1, res) // 先从右边开始, 当右边没了, 再轮到左边
      dfs(root.left, step + 1, res)
    }
  }
  return arr
};

var rightSideView = function (root) {
  if (!root) return []
  let queue = [root] // 队列 把树顶加入队列
  let arr = [] // 用来存储每层最后个元素值
  while (queue.length > 0) {
    let len = queue.length
    while (len) {
      let node = queue.shift() // 取出队列第一个元素
      if (len === 1) arr.push(node.val) // 当是 当前一层的最后一个元素时，把值加入arr
      if (node.left) queue.push(node.left) // 继续往队列添加元素
      if (node.right) queue.push(node.right)
      len--
    }
  }
  return arr
};