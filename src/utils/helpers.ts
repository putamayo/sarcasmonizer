export const makeId = (length: number): string => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function hasValue<T>(v: T | undefined | null): v is T {
  return v !== null && v !== undefined
}

// React.useEffect(() => {
//   const sarcasmizer = (value: string) => {
//     let tuple:[string | null, number | null] = [null, null];
//     return value
//       .split("")
//       .map((val: string) => {
//         const shouldLowercase: boolean = Math.floor(Math.random() * 10) >= 5;
//         const [type, amount] = tuple
//         if(val === ' '){
//           return val
//         }
//         if(tuple === [null,null]){
//            if(shouldLowercase){
//              tuple = ['l', 1]
//              return val.toLowerCase()
//         }
//         if(!shouldLowercase){
//           tuple = ['u', 1]
//         }
//         return val.toUpperCase()
//         }
//         if((type === 'l' && amount !== null && amount > 2) && shouldLowercase){
//           tuple = ['u', 1]
//           return val.toUpperCase()
//         }
//         if((type === 'u' && amount !== null && amount > 2) && !shouldLowercase){
//           tuple = ['l', 1]
//           return val.toLowerCase()
//         }
//         if(shouldLowercase){
//           tuple = ['l', amount !== null ? amount+1 : 1]
//           return val.toLowerCase()
//         }
//         if(!shouldLowercase){
//           tuple = ['u', amount !== null ? amount+1 : 1]
//           return val.toUpperCase()
//         }

//       })
//       .join("");
//   };

//   setValue(sarcasmizer(value));
// }, [active]);

export const makeSarcastic = (value: string, seed: boolean[]): string => {
  const valueArr = value.split('')
  const lowercaseValues = ['i']
  const uppercaseValues = ['l']
  const sarcasticValue =
    valueArr
      .map((val, index) => seed[index % seed.length] === true ? val.toLowerCase() : val.toUpperCase())
      .map(val => lowercaseValues.includes(val.toLowerCase()) ? val.toLowerCase() : val)
      .map(val => uppercaseValues.includes(val.toLowerCase()) ? val.toUpperCase() : val)

  return sarcasticValue.join('')
}

export const generateSeed = () => {
  return [...Array(20)].map(_ => Math.random() > 0.25)
}