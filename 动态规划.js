 //求数组的最大子序列和
 // dp方程 dp[n] = Math.max(dp[n - 1], 0) + a[n]

 // 解释：

 // dp[n] 表示 n 个元素里面，出现连续元素相加和的最大值。
 // dp[n - 1] 只可能有两种结果 要么大于等于 0，要么小于 0，小于择舍弃，取 a[n]。
 // /**
 //  * @param {number[]} nums
 //  * @return {number}
 //  */

 // // dp[n] n 个元素里面 出现连续元素相加和的最大值
 // // dp 方程 dp[n] = Math.max(dp[n-1], 0) + a[n]
 // // dp[n-1] 只可能有两种结果 要么大于等于 0，要么小于 0，小于择舍弃，取 a[n]
 var maxSubArray = function (nums) {
   const dp = [nums[0]]
   for (let i = 1; i < nums.length; i++) {
     dp[i] = Math.max(dp[i - 1], 0) + nums[i]
   }
   return Math.max(...dp)
 }

 let arr = [1, -5, 8, 3, -4, 15, -8]

 //乘积最大子数组(连续)
 // dp 方程 dp[n] = Math.max(dp[n - 1] * nums[n], nums[n])

 // 解释

 // dp[n] 表示 n 个元素里面，出现连续元素相乘的最大乘积。
 // 该题的技巧，是注意乘积会出现 负负得正的 case ，存储上次乘积的结果 dp[n - 1] 的最大值和最小值。
 // /**
 //  * 需要考虑 负负得正的 case，需要存储存储最大值和最小值
 //  * dp[n] = Math.max(dp[n-1]*nums[n], nums[n])
 //  */

 var maxProduct = function (nums) {
   if (!nums.length) return null
   let state = [],
     max = nums[0];
   for (let i = 0; i < nums.length; i++) {
     state[i] = [0, 0];
   }

   state[0][0] = nums[0]; // 从 0 至 0 处的最大值
   state[0][1] = nums[0]; // 从 0 至 0 处的最小值

   for (let i = 1; i < nums.length; i++) {
     if (nums[i] >= 0) {
       state[i][0] = Math.max(state[i - 1][0] * nums[i], nums[i]);
       state[i][1] = Math.min(state[i - 1][1] * nums[i], nums[i]);
     } else {
       state[i][0] = Math.max(state[i - 1][1] * nums[i], nums[i]);
       state[i][1] = Math.min(state[i - 1][0] * nums[i], nums[i]);
     }
     if (max < state[i][0]) {
       max = state[i][0]
     }
   };
   return max
 }
 // 给定正整数 n， 找到若干个完全平方数（ 比如 1, 4, 9, 16, ...）使得它们的和等于 n。 你需要让组成和的完全平方数的个数最少。
 // 示例 1:
 //   输入: n = 12
 // 输出: 3
 // 解释: 12 = 4 + 4 + 4.
 // 示例 2:
 //   输入: n = 13
 // 输出: 2
 // 解释: 13 = 4 + 9.
 var numSquares = function (n) {
   const dp = [...Array(n + 1)].map(_ => 0); // 数组长度为n+1，值均为0
   for (let i = 1; i <= n; i++) {
     dp[i] = i; // 最坏的情况就是每次+1
     for (let j = 1; i - j * j >= 0; j++) {
       dp[i] = Math.min(dp[i], dp[i - j * j] + 1); // 动态转移方程
     }
   }
   return dp[n];
 };