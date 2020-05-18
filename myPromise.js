 //手写promise
 let MyPromise = (function () {
    function resolve(res) {
      //如果存在状态就直接return
      if (this['[[PromiseStatus]]'] !== 'pending') return
      this['[[PromiseStatus]]'] = 'resolved'
      this['[[PromiseValue]]'] = res
      if (this.callBacks.length > 0) {
        let timer = setTimeout(() => {
          this.callBacks.forEach(
            //   {
            //   onFulfilled
            // } => {
            //   onFulfilled(res)  //报错箭头函数的参数不能用解构???
            // }
            value => {
              // console.log(value,'value1')
              value.onFulfilled(res)
            }
          );
          clearTimeout(timer)
        }, 0);
      }
    }

    function reject(res) {
      if (this['[[PromiseStatus]]'] !== 'pending') return
      this['[[PromiseStatus]]'] = 'rejected'
      this['[[PromiseValue]]'] = res
      if (this.callBacks.length > 0) {
        let timer = setTimeout(() => {
          this.callBacks.forEach(value => {
            // console.log(value,'value2')
            value.onRejected(res)
          })
          clearTimeout(timer)
        }, 0);
      }
    }

    return function (fn) {
      this['[[PromiseStatus]]'] = 'pending'
      this['[[PromiseValue]]'] = undefined
      this.callBacks = [] // 每个元素的结构：{ onFulfilled(){}, onRejected(){}}
      try { //立刻同步执行 如果执行器抛出异常，promise对象变为 rejected 状态
        fn(resolve.bind(this), reject.bind(this))
      } catch (e) {
        // console.log(e, 'eeeeeeeeeeee')
        reject.bind(this)(e)
      }
    }
  })()
  MyPromise.prototype.then = function (onFulfilled, onRejected) {
    // console.log(onFulfilled, onRejected, 'fulfilled&&rejected0')
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value =>
      value //当then里面的函数不传的时候  为下一个then能接受到参数准备的
    onRejected = typeof onRejected === 'function' ? onRejected : err => { //就是为了防止callbacks调用foreach报错
      throw err
    }
    // console.log(onFulfilled, onRejected, 'fulfilled&&rejected1')
    let that = this
    return new MyPromise(function (resolve, reject) {
      //1. 如果抛出异常，return 的promise就会失败，reason 就是 error
      //2. 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
      //3.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
      function handle(callback) { //处理上一个then的返回值
        try {
          const result = callback(that['[[PromiseValue]]'])
          if (result instanceof MyPromise) {
            result.then(
              value => resolve(value), //当result成功时，让return的promise也成功
              reason => reject(reason) //当result失败时，让return的promise也失败
            )
            // result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          // 如果抛出异常，return 的promise就会失败，reason 就是 error
          reject(error)
        }
      }

      if (that['[[PromiseStatus]]'] === 'pending') {
        that.callBacks.push({
          onFulfilled(value) {
            handle(onFulfilled) //修改promise的状态为onFulfilled状态
          },
          onRejected(reason) {
            handle(onRejected) //修改promise的状态为onRejected状态
          }
        })
      } else if (that['[[PromiseStatus]]'] === 'resolved') {
        setTimeout(() => {
          handle(onFulfilled)
        }, 0);
      } else {
        setTimeout(() => {
          handle(onRejected)
        }, 0);
      }
    })
  }
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }
  MyPromise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => {
        throw reason
      })
    );
  };
  MyPromise.resolve = function (result) {
    return new MyPromise(function (resolve, reject) {
      resolve(result)
    })
  }
  MyPromise.reject = function (result) {
    return new MyPromise(function (resolve, reject) {
      reject(result)
    })
  }
  MyPromise.all = function (promiseArr = []) {
    return new Promise((resolve, reject) => {
      let index = 0;
      let arr = []
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(result => {
          index++
          arr[i] = result
          if (index === promiseArr.length) {
            resolve(arr)
          }
        }, reason => {
          reject(reason)
        })
      }
    })
  }
  // Promise.race = function (promises) {
  //   if (!Array.isArray(promises)) {
  //     throw new TypeError('You must pass array')
  //   }

  //   return new Promise(function (resolve, reject) {
  //     function resolver(value) {
  //       resolve(value)
  //     }

  //     function rejecter(reason) {
  //       reject(reason)
  //     }

  //     for (var i = 0; i < promises.length; i++) {
  //       promises[i].then(resolver, rejecter)
  //     }
  //   })
  // }

  MyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject)
      };
    })
  }
  let p = new MyPromise(function (resolve, reject) {
    resolve(1)
  }).then(() => {
    return 6 //识别到是个数字就改变了PromiseValue
  }).finally(() => {
    console.log('finally1')
  }).then().then(res => {
    console.log(res, 'res')
  }).catch(e => {
    console.log(e, 'error')
  }).finally(() => {
    console.log('finally2')
  })