 //实现一个链表
 function LinkList() {
    function Node(value) {
      this.value = value
      this.next = null
    }

    this.head = null
    this.length = 0
    LinkList.prototype.append = function (data) {
      if (this.head === null) {
        this.head = new Node(data)
      } else {
        let current = this.head
        while (current.next) {
          current = current.next
        }
        current.next = new Node(data)
      }
      this.length++
    }
    LinkList.prototype.find = function (data) {
      let current = this.head
      do {
        if (current.value === data) {
          return current
        }
        current = current.next
      } while (current);
    }
    LinkList.prototype.fixed = function (data, newdata) {
      let current = this.find(data)
      current.data = newdata
    }
    LinkList.prototype.prefind = function (data) { }
    LinkList.prototype.delete = function (data) {
      if (data === this.head.value) {
        this.head = this.head.next
      } else {
        let current = this.head
        while (current) {
          if (current.next.value === data) {
            current.next = current.next.next
            break
          }
          current = current.next
        }
      }
    }
    LinkList.prototype.toString = function () {
      let result = ''
      let current = this.head
      if (this.head === null) {
        return result
      } else {
        while (current) {
          result += current.value + '=>'
          current = current.next
        }
        result = result + 'null'
        return result
      }
    }
  }

  let link = new LinkList()
  link.append(1)
  link.append(3)
  link.append('a')
  link.append(6)
  link.append('b')
  link.append('7')
  link.append(1)
  // link.delete('a')
  // link.delete(1)
  // link.delete(1)
  console.log(link.toString(), '链表的打印')
  console.log(link.find('a'), '链表的查找')

  // console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4], [8, 4]))
  //合并两个有序链表
  // 将两个升序链表合并为一个新的升序链表并返回。 新链表是通过拼接给定的两个链表的所有节点组成的。
  // 示例：
  // 输入： 1 - > 2 - > 4, 1 - > 3 - > 4
  // 输出： 1 - > 1 - > 2 - > 3 - > 4 - > 4
  function mergeTwoLists(l1, l2) {
    if (l1 === null) {
      return l2
    }
    if (l2 === null) {
      return l1
    }
    if (l1.val <= l2.val) {
      l1.next = mergeTwoLists(l1.next, l2)
      return l1
    } else {
      l2.next = mergeTwoLists(l2.next, l1)
      return l2
    }
  }

  //判断一个单链表是否有环
  //标记法
  // let hasCycle = function (head) {
  //     while (head) {
  //         if (head.flag) return true
  //         head.flag = true
  //         head = head.next
  //     }
  //     return false
  // };
  //利用 JSON.stringify() 不能序列化含有循环引用的结构
  // let hasCycle = function (head) {
  //     let flag = false
  //     try {
  //         JSON.stringify(head)
  //     } catch (error) {
  //         flag = true
  //     }
  //     return flag
  // };
  // 解法三： 快慢指针（ 双指针法）
  // 设置快慢两个指针， 遍历单链表， 快指针一次走两步， 慢指针一次走一步， 如果单链表中存在环， 则快慢指针终会指向同一个节点， 否则直到快指针指向 null 时， 快慢指针都不可能相遇
  let hasCycle = function (head) {
    if (!head || !head.next) {
      return false
    }
    let fast = head.next.next,
      slow = head.next
    while (fast !== slow) {
      if (!fast || !fast.next) return false
      fast = fast.next.next
      slow = slow.next
    }
    return true
  };
  //反转链表
  // 输入: 1 - > 2 - > 3 - > 4 - > 5 - > NULL
  // 输出: 5 - > 4 - > 3 - > 2 - > 1 - > NULL
  // var reverseList = function (head) {
  //     if (!head || !head.next) return head
  //     var next = head.next
  //     // 递归反转
  //     var reverseHead = reverseList(next)
  //     // 变更指针
  //     next.next = head
  //     head.next = null
  //     return reverseHead
  // };
  var reverseList = function (head) {
    let prev = null;
    let curr = head;
    while (curr != null) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev;
  };
  // var reverseList = function (head) {
  //     let reverse = (prev, curr) => {
  //         if (!curr) return prev;
  //         let next = curr.next;
  //         curr.next = prev;
  //         return reverse(curr, next);
  //     }
  //     return reverse(null, head);
  // };
  // console.log(reverseList(link).toString(), '链表的反转')
  //求链表的中间结点
  //遍历将节点放在数组中， 然后取中间值
  var middleNode = function (head) {
    if (!head) return []
    var arr = []
    while (head) {
      arr.push(head)
      head = head.next
    }
    return arr[Math.ceil((arr.length - 1) / 2)]
  };
  // 利用双指针，快指针走两步，慢指针走一步，快指针走完，慢指针则为中间值
  // const getMiddleNode = function (head) {
  // if (!head) return null;
  // let fast = head.next.next,
  // slow = head.next;
  // while (fast && fast.next) {
  // fast = fast.next.next;
  // slow = slow.next;
  // }
  // return slow;
  // };
  //删除链表倒数第 n 个结点
  // 这道题要用双指针来实现。先用first指针前进n，然后让second从head开始和first一起前进，直到first到了末尾，
  // 此时second的下一个节点就是要删除的节点。（另外，若first一开始前进n就已经不在链表中了，说明要删除的节点正是head节点，
  // 那么直接返回head的下一个节点接口。）
  var removeNthFromEnd = function (head, n) {
    let first = head,
      second = head;
    while (n > 0) {
      first = first.next
      n--
    }
    if (!first) return head.next; // 删除的是头节点
    while (first.next) {
      first = first.next;
      second = second.next;
    }
    second.next = second.next.next;
    return head
  };
  //编写一个程序，找到两个单链表相交的起始节点
  // 两次遍历， 先遍历一个链表， 给链表中的每个节点都增加一个标志位， 然后遍历另外一个链表， 遍历到第一个已被标志过的节点为两链表相交的起始节点。
  // 若遍历完都没有发现已被标志过的节点， 则两链表不相交， 返回 null
  var getIntersectionNode = function (headA, headB) {
    while (headA) {
      headA.flag = true
      headA = headA.next
    }
    while (headB) {
      if (headB.flag) return headB
      headB = headB.next
    }
    return null
  };
  //双指针法
  // var getIntersectionNode = function (headA, headB) {
  //     // 清除高度差
  //     let pA = headA,
  //         pB = headB
  //     while (pA || pB) {
  //         if (pA === pB) return pA
  //         pA = pA === null ? headB : pA.next
  //         pB = pB === null ? headA : pB.next
  //     }
  //     return null
  // };

   //判断一个链表是否为回文链表
   var isPalindrome = function (head) {
    if (head === null || head.next === null) return true;
    let mid = head;
    let pre = null;
    let reversed = null;
    // end每次走两格，这个循环的时间复杂度为O(n/2)
    while (head !== null && head.next !== null) {
      // 这个赋值要在mid被修改前提前
      pre = mid
      // 遍历链表
      mid = mid.next
      head = head.next.next
      // 反转前面部分的节点，并用reversed保存
      pre.next = reversed
      reversed = pre
    }
    // 奇数mid往后走一位
    if (head) mid = mid.next
    while (mid) {
      if (reversed.val !== mid.val) return false
      reversed = reversed.next
      mid = mid.next
    }
    return true
  };

  //排序链表
  var sortList = function (head) {
    function ListNode(val) {
      this.next = null
      this.val = val
    }
    // function merge(left, right) {  //方法1:合并两个有序链表
    //   let res = new ListNode(0);
    //   let pre = res;   //因为pre一直跟着链表移动所以需要 用一个res记录链表的起点
    //   while (left && right) {
    //     if (left.val <= right.val) {
    //       pre.next = left;
    //       left = left.next;
    //     } else {
    //       pre.next = right;
    //       right = right.next;
    //     }
    //     pre = pre.next;
    //   }
    //   pre.next = left ? left : right;
    //   return res.next;
    // }

    function merge(l1, l2) {   //方法2:合并两个有序链表
      if (l1 === null) {
        return l2
      }
      if (l2 === null) {
        return l1
      }
      if (l1.val <= l2.val) {
        l1.next = merge(l1.next, l2)
        return l1
      }
      if (l1.val > l2.val) {
        l2.next = merge(l1, l2.next)
        return l2
      }
    }
    function mergeSort(head) {
      if (!head || !head.next) {
        return head
      }
      let left //链表的中点前一部分
      let right //链表中点后一部分
      //  let mid //中间点
      //慢指针走一步  快指针走两步  快指针到达中点时 慢指针的位置就是我们认为的中点
      let fast = head //开始快慢指针均位于起点  
      let slow = head
      while (fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
      }
      //slow即是中间点
      right = slow.next
      slow.next = null
      left = head  //不能写left = slow因为slow一直在移动
      return merge(mergeSort(left), mergeSort(right))
    }
    return mergeSort(head)
  }

   //删除链表中重复的节点
    // 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，
    // 重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
    function deleteDuplication(head) {
      if (!head || !head.next) {
        return head
      } else if (head.val === head.next.val) { //如果从第一项开始重复
        head = head.next.next
        return deleteDuplication(head)
      } else { //如果第一项不重复
        head.next = deleteDuplication(head.next)
      }
      return head
    }