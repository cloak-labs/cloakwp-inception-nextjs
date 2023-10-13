/* 
  This function first splits the string by '.' to get an array of keys. Then, it iterates 
  through these keys, checking if each key exists in the current value, and if it does, it 
  updates the value to the nested object. If any key is not found or if the value is not 
  an object along the way, it returns undefined. Otherwise, it returns the final value found.

  Example:
  const post = { author: { name: 'Joe' } };
  const propertyName = 'author.name';
  const result = getObjValueByString(post, propertyName);
  console.log(result); // Output: 'Joe'
*/

export function getObjValueByString(obj, str) {
  const keys = str.split('.');
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined; // Key not found or value is not an object
    }
  }

  return value;
}
