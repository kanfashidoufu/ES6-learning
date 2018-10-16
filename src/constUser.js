//ES5中的常量的写法 利用给对象增加属性的方法,JS中全局对象是window，对于常量来说可以绑定在window上

Object.defineProperty(window,"PI2", {
	value: 3.1415926,
	writable: false, //只读
}) 

console.log(window.PI2);

// ES6中常量的写法
const PI = 3.1415926;
console.log(PI);


