{
  //ES5中的数据保护
  var Person=function(){
    var data={
      name:'es5',
      sex:'male',
      age:15
    }
    this.get=function(key) {
      return data[key]
    }
    this.set=function(key, value) {
      if (key!='sex') {
        data[key]=value;
      }
    }
  }
  //声明一个实例
  var person = new Person();
  //读取数据
  console.table({
    name: person.get('name'),
    sex: person.get('sex'),
    age: person.get('age')
  })
  //修改数据
  person.set('name', 'es3-cname');
  console.table({
    name: person.get('name'),
    sex: person.get('sex'),
    age: person.get('age')
  })
  //尝试修改性别
  person.set('sex', 'female');
  console.table({
    name: person.get('name'),
    sex: person.get('sex'),
    age: person.get('age')
  })
}

{
  //ES5中使用常量实现
  var Person={
    name: 'es5',
    age: 15
  };
  Object.defineProperty(Person, 'sex', {
    writable: false,
    value:'male'
  });
  console.table({
    name: Person.name,
    age: Person.age,
    sex: Person.sex
  })
  Person.name='es5-cname';
  console.table({
    name: Person.name,
    age: Person.age,
    sex: Person.sex
  })
  try {
    Person.sex='female';
    console.table({
      name: Person.name,
      age: Person.age,
      sex: Person.sex
    })
  } catch (e){
    console.log(e)
  } finally {

  }
  //结果报错Uncaught TypeError: Cannot assign to read only property 'sex' of object '#<Object>'
}

{
  // ES6中的做法
  let Person={
    name: 'es6',
    sex: 'male',
    age: 15
  };
  let person = new Proxy(Person, {
    get(target, key){
      return target[key]
    },
    set(targt, key, value){
      if (key!=='sex') {
        target[key]=value;
      }
    }
  });
  console.table({
    name: person.name,
    sex: person.sex,
    age: person.age
  })
  try {
    person.sex='female';
    console.table({
      name: person.name,
      age: person.age,
      sex: person.sex
    })
  } catch (e){
    console.log(e)
  } finally {

  }
  //报错'set' on proxy: trap returned falsish for property 'sex'
}