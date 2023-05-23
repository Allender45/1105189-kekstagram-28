// // const checkLength = (string, length) => {
// //   console.log(string.length === length);
// // };
//
// checkLength('проверяемая строка', 20); // Результат: true - строка проходит по длине
// checkLength('проверяемая строка', 18); // Результат: true - строка проходит по длине
// checkLength('проверяемая строка', 10); // Результат: false — строка не проходит
//
// const palindrome = (string) => {
//   const newString = string.replace(/\s/g, '').toLowerCase();
//   string = string.replace(/\s/g, '').toLowerCase();
//   console.log(newString.split('').join('') === string);
// };
//
// palindrome('топот'); // Результат: true - строка является палиндромом
// palindrome('ДовОд'); // Результат: true - несмотря на разный регистр, тоже палиндром
// palindrome('Кекс'); // Результат: false - это не палиндром
// palindrome('Лёша на полке клопа нашёл ');
//
// const getNumber = (string) => {
//   let number = '';
//   string = string.toString();
//   for (const item in string) {
//     if (!isNaN(parseInt(string[item], 10))) {
//       number += string[item];
//     }
//   }
//   if (number.length === 0) {
//     number = NaN;
//   }
//   console.log(number);
// };
//
// getNumber('2023 год'); // 2023
// getNumber('ECMAScript 2022'); // 2022
// getNumber('1 кефир, 0.5 батона'); // 105
// getNumber('агент 007'); // 7
// getNumber('а я томат'); // NaN
// getNumber(2023); // 2023
// getNumber(-1); // 1
// getNumber(1.5); // 15
//
// const modifyString = (string, length, mod) => {
//   if (string.length >= length) {
//     console.log(string);
//     return string;
//   }
//
//   const modCount = length - string.length;
//   const modString = mod.repeat(modCount / mod.length);
//   const modStringTail = mod.slice(0, modCount % mod.length);
//   console.log(modStringTail + modString + string);
// };
//
// // Добавочный символ использован один раз
// modifyString('1', 2, '0'); // '01'
// // Добавочный символ использован три раза
// modifyString('1', 4, '0'); // '0001'
// // Добавочные символы обрезаны с конца
// modifyString('q', 4, 'werty'); // 'werq'
// // Добавочные символы использованы полтора раза
// modifyString('q', 4, 'we'); // 'wweq'
// // Добавочные символы не использованы, исходная строка не изменена
// modifyString('qwerty', 4, '0'); // 'qwerty'
