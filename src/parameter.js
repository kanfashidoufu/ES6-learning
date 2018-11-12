{
  //ES5中默认参数写法
  function f(x,y,z) {
    if (y===undefined) {
      y=7;
    }
    if (z===undefined) {
      z=42;
    }
    return x+y+z;
  }
  console.log(f(1)) //结果是50
  console.log(f(1,3))  //结果是46
}
//在ES5中默认参数在代码中没有赋值并且没有做参数校验的话代码是会出现问题的

//ES6中默认参数写法
{
  function f(x,y=7,z=42) {
    return x+y+z;
  }
  console.log(f(1, 3))
}

{
  function checkParameter() {
    throw new Error('can\'t be empty')
  }
  function f(x=checkParameter(), y=7, z=42) {
    return x+y+z;
  }
  console.log(f(1)); //结果50
  try {
    f()
  } catch (e) {
    console.log(e) //结果抛出异常Error: can't be empty
  }
}

{
  //ES5可变参数使用arguments表示当前参数列表
  function f() {
    var a=Array.prototype.slice.call(arguments);
    var sum = 0;
    a.forEach(function(item){
      sum+=item*1;
    })
    return sum;
  }
  console.log(f(1,2,3,6));
}

{
  //ES6中 使用扩展运算符...
  function f(...a) {
    let sum=0;
    a.forEach(item=>{
      sum+=item*1
    });
    return sum
  }
  console.log(f(1,2,3,6));
}

{
  //ES5合并数组
  var params = ['hello', true, 7];
  var other = [1,2].concat(params);
  console.log(other);//结果是[1, 2, "hello", true, 7]
}

{
  //ES6中合并数组
  let params = ['hello', true, 7];
  let other = [1,2, ...params];
  console.log(other);//结果是[1, 2, "hello", true, 7]
  //写法非常简洁
}
