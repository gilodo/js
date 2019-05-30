/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
function returnFirstArgument(x) {
    console.log(x);
    return x;
}
returnFirstArgument(10);            // 10
returnFirstArgument('Привет!');     // Привет!


/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6

 2.1 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */
function sumWithDefaults(a, b) {
    console.log(a + b);
    return a + b;
}
sumWithDefaults(10, 20);        // 30
sumWithDefaults(2, 4);          // 6

function sumWith100(a) {
    console.log(a + 100);
    return a + 100;
}
sumWith100(10);                 // 110


/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */
function first(fn) {
  console.log(fn());          // 10 
  return fn();
}

function second() {
  return 10;
}

first(second);


/*
 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */
function returnCounter(number) {
  return function() {
    console.log(number + 1);
    return number + 1;
  }
}

returnCounter(1);

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */

// Способ №1 (с использованием псевдомассива arguments (см. вебинар вопрос-ответ))
function returnArgumentsArray1() {
  let array = [];
  for (let i = 0; i < arguments.length; i++) {
    array.push(arguments[i]);
  }
  console.log(array);                     // [1, 2, 3, 4]
  return array;
}

returnArgumentsArray1(1, 2, 3, 4);

// Способ №2 (с использованием прародителя всех массивов Array, метода from и псевдомассива arguments)
function returnArgumentsArray2() {
  console.log(Array.from(arguments))      // [1, 2, 3, 4]
  return Array.from(arguments);
}

returnArgumentsArray2(1, 2, 3, 4);

// Способ №3 (с использованием спред-оператора (...) и псевдомассива arguments)
function returnArgumentsArray3() {
  console.log([...arguments]);            // [1, 2, 3, 4]
  return([...arguments]);
}

returnArgumentsArray3(1, 2, 3, 4);

// Способ №4 (с использованием спред-оператора (...) в аргументе функции)
function returnArgumentsArray4(...rest) {
  console.log(rest);                      // [1, 2, 3, 4]
  return rest;
}

returnArgumentsArray4(1, 2, 3, 4);


/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */
function bindFunction(a, b, c) {
  console.log(this.divan, a, b, c);
  return this.divan;
}

const object = {
  divan: '10'
}

bindFunction.call(object, 15, 100, 'string');


export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction
}
