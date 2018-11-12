// ES5中
{
  var evens = [1,2,3,4,5];
  var odds = evens.map(function(v) {
    return v + 1;
  })
  console.log(evens,odds);
};
// ES6中
{
  let evens = [1,2,3,4,5];
  let odds = evens.map(v => v + 1);
  console.log(evens, odds);
};
//ES5中的函数写法和ES6中的函数写法久经区别在哪里，答案就是关于this的绑定
//ES5中的写法
{
  var factory = function() {
    this.a = 'a';
    this.b = 'b';
    this.c = {
      a: 'a+',
      b: function() {
        return this.a
      }
    }
  }
  console.log(new factory().c.b());
};
//输出结果是什么呢?答案是'a+'。
//总结了一句话：this的指向是该函数被调用的对象

//ES6中的写法
{
  let factory = function() {
    this.a = 'a';
    this.b = 'b';
    this.c = {
      a: 'a+',
      b: ()=>{
        return this.a
      }
    }
  }
  console.log(new factory().c.b());
};
//输出结果是'a'。为什么产生这样的差异呢？原因在于箭头函数函数体中的this的指向是定义时this的指向