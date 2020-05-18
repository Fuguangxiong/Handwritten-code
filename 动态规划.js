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
        let state = [], max = nums[0];
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