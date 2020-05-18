//手写图片懒加载
//图片出现在视窗内的情况： offsetTop < clientHeight + scrollTop
//element.getBoundingClientRect().top < clientHeight
// h5的IntersectionObserver方式
// intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1 ，完全不可见时小于等于 0
// function lazyload() {
//   let imgs = document.querySelectorAll("img.lazy")  //伪数组
//   let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//   for (let i = 0; i < imgs.length; i++) {
//     if (imgs[i].offsetTop < clientHeight + scrollTop) {
//       imgs[i].setAttribute('src', imgs[i].dataset.src)
//     }
//   }
// }
// document.addEventListener("scroll", lazyload);

// window.addEventListener("resize", lazyload);

// window.addEventListener("orientationChange", lazyload);
// function lazyload() {
//   let imgs = document.querySelectorAll("img.lazy")  //伪数组
//   let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//   // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//   for (let i = 0; i < imgs.length; i++) {
//    // console.log(i,imgs[i].getBoundingClientRect().top)
//     if (imgs[i].getBoundingClientRect().top < clientHeight) {
//       imgs[i].setAttribute('src', imgs[i].dataset.src)
//     }
//   }
// }
//  document.addEventListener("scroll", lazyload);

// window.addEventListener("resize", lazyload);

// window.addEventListener("orientationChange", lazyload);
function lazyload() {
    let imgs = document.querySelectorAll("img.lazy") //伪数组
    let io = new IntersectionObserver(function (changes) {
        // console.log(changes,'IntersectionObserver')
        changes.forEach(function (change) {
            if (change.intersectionRatio > 0) {
                let img = change.target;
                img.src = img.dataset.src;
                io.unobserve(img);
            }
        })
    })
    for (let i = 0; i < imgs.length; i++) {
        io.observe(imgs[i])
    }
}
//优点:不需要绑定window事件  自带防抖  可以反向懒加载  缺点:兼容性
lazyload()
//手写call,apply,bind
Function.prototype.myCall = function () {
    let obj = Array.from(arguments)[0]
    let args = Array.from(arguments).slice(1)
    let symbol = new Symbol()
    if (obj === undefined || obj === null) {
        obj = window
    } else {
        obj[symbol] = this
    }
    let result = obj[symbol](...arg)
    delete result[symbol]
    return result
}
Function.prototype.myApply = function () {
    let obj = Array.from(arguments)[0]
    let args = Array.from(arguments).slice(1)
    let symbol = new Symbol()
    if (obj === null || obj === null) {
        obj = window
    } else {
        obj[symbol] = this
    }
    let result = obj[symbol](args)
    delete obj[symbol]
    return result
}
Function.prototype.myBind = function () {
    let obj = Array.from(arguments)[0]
    let args = Array.from(arguments).slice(1)
    if (obj === null || obj === undefined) {
        obj = window
    }
    let self = this
    return function () {
        let newArgs = Array.from(arguments)
        self.apply(obj, args.concat(newArgs))
    }
}

//promise封装ajax
function Ajax(url, method, data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest() || window.ActiveXObject
        xhr.open(method, url)
        xhr.send(data)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText)
            } else {
                reject(xhr.status)
            }
        }
    })
}

//图片的异步加载
function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        let image = new Image()
        image.src = src
        image.onload = function () {
            resolve(image)
        }
        image.onerror = function () {
            reject(new Error('此路径' + url + '的图片加载失败'))
        }
    })
}

//防抖
function debounce(fn, delay) {
    let timer
    return function () {
        clearTimeout(timer)
        timer = setInterval(() => {
            fn.apply(this, arguments)
        }, delay);
    }
}

//节流
function throttle(fn, delay) {
    let canRun = true
    return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, delay);
    }
}

//原型链继承
function SupType(val) {
    this.name = {
        name: val,
        sex: '男'
    }
}

function SubType() {
    this.sex = '女'
}

SubType.prototype = new SupType()
// console.log(new SubType().name.name='徐娟')  原型链继承的缺点 引用类型会被不同的实例共享 不能向父类中传参数
// console.log(new SubType().name)
//call实现继承
function Animal(name) {
    this.name = name
}

function Cat() {
    this.sex = '老鼠'
    Animal.call(this, '大象')
}

// console.log(new Cat().name)   优点: 可以向超类中传递参数   解决了原型中的引用类型被所有实例共享的问题
//缺点:在超类的原型中的方法对子类来说是不可见的  方法都放在构造函数中复用无从谈起
//组合继承
function SuperType() {
    this.name = 'zc'
    this.colors = ['pink', 'blue', 'green'];
}

function SubType() {
    SuperType.call(this)
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
let a = new SubType()
let b = new SubType()
//用原型链实现对原型属性和方法的继承，
//通过借用构造函数来实现对实例属性的继承，
//既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。
//无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
//原型式集成
function object(o) {
    function F() {}

    F.prototype = o
    return new F()
}

//ECMAScript5通过新增 Object.create()方法规范了原型式继承。
//这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象(可以覆盖原型对象上的同名属性)，
//在传入一个参数的情况下，Object.create() 和 object() 方法的行为相同。
//寄生式集成
function object(o) {
    function F() {}

    F.prototype = o
    return new F()
}

function createAnother(original) {
    let clone = object(original)
    clone.sayHi = function () {}
    return clone
}

//基于 person 返回了一个新对象 -—— person2，
//新对象不仅具有 person 的所有属性和方法，而且还有自己的 sayHi() 方法。
//在考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。
//使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下。
//同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。
//寄生组合式集成
function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ['pink', 'blue', 'green'];
}

function subType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(subType, SuperType);

//手写new
function _new(fn, ...args) {
    let obj = {}
    fn.apply(obj, args)
    fn.prototype.constructor = fn
    obj._proto_ = fn.prototype
    return obj
}

fn = function (val) {
    this.name = '付光雄'
    this.sex = '男'
    this.eat = val
}
// console.log(_new(fn,'大便'))
//手写用递归实现一个深拷贝
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

function clone(target) {
    let targetType = checkedType(target)
    let result
    if (targetType === 'Array') {
        result = []
    } else if (targetType === 'Object') {
        result = {}
    } else {
        return target
    }
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            const element = target[key];
            if (checkedType(element) === 'Array' || checkedType(element) === 'Object') {
                result[key] = clone(element)
            } else {
                result[key] = element
            }
        }
    }
    return result
}

//手写一个柯里化
// function curry(fn, args) {
//     var length = fn.length; // 函数参数的长度
//     // 闭包保存参数列表
//     args = args || [];
//     return function () {
//         // 获取参数列表。
//         var _args = args.slice(0);
//         Array.prototype.push.apply(_args, Array.prototype.slice.call(arguments))
//         if (_args.length < length) {
//             // 如果传入的参数列表长度还没有超过函数定义时的参数长度，就 push 新的参数到参数列表中保存起来。
//             // 自己调用自己，将保存的参数传递到下一个柯里化函数。
//             return curry.call(this, fn, _args);
//         } else {
//             // 如果传入的参数列表长度已经超过函数定义时的参数长度，就执行。
//             return fn.apply(this, _args);
//         }
//     }
// }
function curry(fn, ...args) {
    if (fn.length > args.length) {
        return function () {
            return curry.call(this, fn, ...args, ...arguments)
        }
    } else {
        fn(...args)
        //fn.call(this,...args)
    }
}

const add = curry(function (a, b, c) {
    console.log([a, b, c].reduce((a, b) => a + b))
})
// add(1, 2, 3)
// add(1, 2)(3)
// add(1)(2)(3)
// add(1)(2, 3)
//手写一个双向绑定
let vm = {} //想象成vue的实例
let obj = { //想象成vue的data
    name: 'zc',
    age: '123'
}
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        Object.defineProperty(vm, key, {
            get: function () {
                return obj[key]
            },
            set: function (val) {
                obj[key] = val
            }
        })
    }
}
obj.age = '30'
vm.age = '112221' //触发set
vm.age //触发get
//手写一个双向绑定这个proxy版本
let vm1 = new Proxy(obj, {
    get: function (target, propKey, receiver) {
        // console.log(target, propKey, receiver, '...............1')
        // console.log(Reflect.get(target, propKey, receiver), '..............11')    //112221
    },
    set: function (target, propKey, value, receiver) {
        // console.log(target, propKey, value, receiver, '...............2')
        // console.log(Reflect.set(target, propKey, value, receiver), '.............22')  //true   它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。
    }
})
vm1.age
vm1.age = '30'
//观察者模式
// 目标者类
class Subject {
    constructor() {
        this.observers = []; // 观察者列表
    }

    // 添加
    add(observer) {
        this.observers.push(observer);
    }

    // 删除
    remove(observer) {
        let idx = this.observers.findIndex(item => item === observer);
        idx > -1 && this.observers.splice(idx, 1);
    }

    // 通知
    notify() {
        for (let observer of this.observers) {
            observer.update();
        }
    }
}

// 观察者类
class Observer {
    constructor(name) {
        this.name = name;
    }

    // 目标对象更新时触发的回调
    update() {
        console.log(`目标者通知我更新了，我是：${this.name}`);
    }
}

// 实例化目标者
let subject = new Subject();
// 实例化两个观察者
let obs1 = new Observer('前端开发者');
let obs2 = new Observer('后端开发者');
// 向目标者添加观察者
subject.add(obs1);
subject.add(obs2);
// 目标者通知更新
subject.notify();
// 输出：
// 目标者通知我更新了，我是前端开发者
// 目标者通知我更新了，我是后端开发者
//发布订阅者模式
class Pubsub {
    list = []
    // constructor(){
    //     this.list = {}
    // }
    subscribe(event, fn) { //订阅
        if (!this.list[event]) {
            this.list[event] = []
        }
        this.list[event].push(fn)
    }

    publish(event, args) { //发布
        for (let fn of this.list[event]) {
            // console.log(fn,this)
            // fn.call(this, args)
            fn(args)
        }
    }

    unSubscribe(event) { //取消订阅
        this.list[event].length = 0
    }
}

let pubsub = new Pubsub()
pubsub.subscribe('oneat', function (a) {
    // console.log(a)
})
pubsub.subscribe('oneat', function (a) {
    // console.log(a)
})
pubsub.subscribe('oneat', function (a) {
    // console.log(a)
})
pubsub.publish('oneat', '米饭')
//手写instanceOf
function instance(left, right) {
    // if (left._proto_ = right.prototype) {
    //     return true
    // }
    left = left._proto_;
    right = right.prototype;
    while (true) {
        if (left === null) {
            return false
        }
        if (left === right) {
            return true
        }
        left = left._proto_
    }
}

//封装jsonp
function jsonp(url, params, callback, outTime) {
    let body = document.body
    let fnName = "_jsonpFn" + Math.random().toString().replace('.', '')
    let script = document.createElement('script')
    window[fnName] = function (data) {
        callback(data)
        delete window[fnName]
        body.removeChild(script)
    }
    let str = ''
    for (const key of params) {
        str += key + "=" + params[key] + "&"
    }
    str += 'callback=' + fnName
    script.src = url + '?' + str
    body.insertBefore(script, document.body.firstChild)
    if (outTime) {
        let timer = window.setTimeout(() => {
            body.removeChild(script)
            clearTimeout(timer)
        }, outTime)
    }
}

function jsonpromise(url) {
    let json;
    let s = document.createElement('script');
    s.src = url + '?callback=fn';
    window.fn = function (data) {
        json = data;
    }
    //当script被插入文档中时，src中的资源就会开始加载
    document.body.appendChild(s);

    return new Promise((resolve, reject) => {
        /* throw('err in promise'); */
        s.onload = function (e) {
            resolve(json);
        }
        s.onerror = function () {
            reject(json);
        }
    });
}
jsonpromise('http://localhost:8082').then(data => {
    console.log(data);
    throw ('err before then');
}).catch(err => {
    //可以捕捉到then里的err befor then也可以捕捉到new Promise里的err in promise。
    console.log(err)
})

//JavaScript深入之创建对象的多种方式以及优缺点
//1.工厂模式
function createPerson(name) {
    let o = new Object();
    o.name = name
    o.getName = function () {
        console.log(this.name)
    }
    return o
}
// 缺点：对象无法识别，因为所有的实例都指向一个原型
//2. 构造函数模式
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}
var person1 = new Person('kevin');
// 优点： 实例可以识别为一个特定的类型
// 缺点： 每次创建实例时， 每个方法都要被创建一次
//2.1 构造函数模式优化
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}
var person1 = new Person('kevin');
// 优点： 解决了每个方法都要被重新创建的问题
// 缺点： 这叫啥封装……
// 3. 原型模式
function Person(name) {

}
Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};
var person1 = new Person();
// 优点： 方法不会重新创建
// 缺点： 1. 所有的属性和方法都共享 2. 不能初始化参数
//3.1 原型模式优化
function Person(name) {

}
Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};
var person1 = new Person();
// 优点： 封装性好了一点
// 缺点： 重写了原型， 丢失了constructor属性
// 3.2 原型模式优化

function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
// 优点： 实例可以通过constructor属性找到所属构造函数
// 缺点： 原型模式该有的缺点还是有
// 4. 组合模式
// 构造函数模式与原型模式双剑合璧。
function Person(name) {
    this.name = name;
}
Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};
// var person1 = new Person();
// 优点： 该共享的共享， 该私有的私有， 使用最广泛的方式
// 缺点： 有的人就是希望全部都写在一起， 即更好的封装性