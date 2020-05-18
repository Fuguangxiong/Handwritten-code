//冒泡排序最终优化版
function bubble(arr) {
    for (let i = 0; i < arr.length; i++) {
        let Change = false
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                Change = true
                arr[j] = arr[j] ^ arr[j + 1]
                arr[j + 1] = arr[j] ^ arr[j + 1]
                arr[j] = arr[j + 1] ^ arr[j]
            }
        }
        if (!Change) {
            return arr
        }
    }
}

// console.log(bubble([1, 5, 9, 7, 5, 3, 2, 4]))
//选择排序
function selectSort(arr) {
    let minIndex, temp
    for (let i = 0; i < arr.length; i++) {
        minIndex = i //假设第一项是值最小的索引
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        temp = arr[minIndex]
        arr[minIndex] = arr[i]
        arr[i] = temp
    }
    return arr
}

// console.log(selectSort([1, 5, 9, 7, 5, 3, 2, 4]))
//插入排序
function insertSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    let temp, j
    for (let i = 1; i < arr.length; i++) {
        j = i
        temp = arr[i]
        // while (j > 0 && arr[j - 1] > temp) {
        //     arr[j] = arr[j - 1]
        //     j--
        // }
        for (let k = i - 1; k < i && k > -1; k--) {
            if (temp < arr[k]) {
                arr[k + 1] = arr[k]
                arr[k] = temp
            }
        }
    }
    return arr
}

//希尔排序 (对插入排序的升级)
var shellSort = function () {
    if (this.array === null || this.array.length < 2) return this.array
    let length = this.array.length
    //初始化增量
    var gap = Math.floor(length / 2)
    // whlie循环
    while (gap > 1) {
        for (let i = gap; i < length; i++) {
            let temp = this.array[i]
            let j = i
            while (this.array[j - gap] > temp && j > gap - 1) {
                this.array[j] = this.array[j - gap]
                j -= gap
            }
            this.array[j] = temp
        }
        gap = Math.floor(gap / 2)
    }
}

// console.log(insertSort([1, 5, 9, 7, 5, 3, 2, 4]))
//快速排序
//方法一优化版
// function quickSort(arr, left, right) { //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
//     if (left < right) {
//         let pos = left - 1 //pos即“被置换的位置”，第一趟为-1
//         for (let i = left; i <= right; i++) { //循环遍历数组，置换元素
//             let pivot = arr[right] //选取数组最后一位作为基准数，
//             if (arr[i] <= pivot) { //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
//                 pos++
//                 let temp = arr[pos]
//                 arr[pos] = arr[i]
//                 arr[i] = temp
//             }
//         }
//         //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
//         quickSort(arr, left, pos - 1)
//         quickSort(arr, pos + 1, right)
//     }
//     return arr //数组只包含1或0个元素时(即left>=right)，递归终止
// }
// //使用
// var arr = [5, 1, 4, 2, 3]
// var start = 0;
// var end = arr.length - 1;
// quickSort(arr, start, end)
//方法二普通版
// function quickSort(arr) {
//   if (arr.length < 2) {
//     return arr
//   }
//   let end = arr.length - 1
//   let pivot = arr.splice(Math.floor(end / 2), 1)[0];
//   // let base = arr[Math.floor(end / 2)]
//   let leftArr = []
//   let rightArr = []
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] <= pivot) {
//       leftArr.push(arr[i])
//     } else {
//       rightArr.push(arr[i])
//     }
//   }
//   return quickSort(leftArr).concat([pivot], quickSort(rightArr))
// }
//方法三while版
// var arr = [3, 3, -5, 6, 0, 2, -1, -1, 3];
// console.log(arr);
// quick_sort(arr, 0, arr.length - 1);
// console.log(arr);
/**
题目：快速排序算法
思路：两个哨兵，i,j,j从右边找比基数小的，i从左边找比基数大的，然后交换两个目标元素的位置，直到i=j,然后交换i和基数的位置，递归处理。
**/
function quickSort(arr, from, to) {
    var i = from; //哨兵i
    var j = to; //哨兵j
    var key = arr[from]; //标准值
    if (from >= to) { //如果数组只有一个元素
        return;
    }
    while (i < j) {
        while (arr[j] > key && i < j) { //从右边向左找第一个比key小的数，找到或者两个哨兵相碰，跳出循环
            j--;
        }
        while (arr[i] <= key && i <
            j) { //从左边向右找第一个比key大的数，找到或者两个哨兵相碰，跳出循环,这里的=号保证在本轮循环结束前，key的位置不变，否则的话跳出循环，交换i和from的位置的时候，from位置的上元素有可能不是key
            i++;
        }
        /**
          代码执行道这里，1、两个哨兵到找到了目标值。2、j哨兵找到了目标值。3、两个哨兵都没找到(key是当前数组最小值)
        **/
        if (i < j) { //交换两个元素的位置
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

        }
    }
    arr[from] = arr[i] //将基数与下标为 i 的元素原地交换，从而实现划分；
    arr[i] = key;
    quickSort(arr, from, i - 1);
    quickSort(arr, i + 1, to);
}

// arr = [2, 1, 5, 8, 3, 7, 4, 6, 9];
// console.log(quickSort(arr)); //[1, 2, 3, 4, 5, 6, 7, 8, 9]

//合并两个有序数组
function Merger(a, b) {
    let len1 = a && a.length //a ?.length //链判断运算符
    let len2 = b && b.length //b ?.length
    let index1 = 0
    let index2 = 0
    let arr = []
    while (index1 < len1 && index2 < len2) { //保证有一个有序数组已经遍历完
        if (a[index1] > b[index2]) {
            arr.push(b[index2++])
        } else {
            arr.push(a[index1++])
        }
    }
    while (index1 < len1) {
        arr.push(a[index1++])
    }
    while (index2 < len2) {
        arr.push(b[index2++])
    }
    return arr
}

// console.log(Merger([2, 5, 9],[1,6,8,11]))  无序数组为什么不能用这个方法??
//归并排序
function mergeSort(arr = [1, 9, 7, 5, 6, 4, 9, 8, 1, 3]) {
    if (arr.length === 1) {
        return arr
    }
    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)
    // return mergeSort(left).concat(mergeSort(right))
    return Merger(mergeSort(left), mergeSort(right))
}

  // console.log(mergeSort(),'归并排序')