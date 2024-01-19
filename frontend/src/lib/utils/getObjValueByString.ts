/* 
  Given an object, such as {author: { name: 'Joe' }}, and a dot-notation string referencing the nested 
  property you want to extract from the object, such as "author.name", this function return said nested 
  property (i.e. "Joe" in this example). If any key is not found or if the value is not an object along 
  the way, it returns `undefined`.
*/
export function getObjValueByString(
  obj: Record<string, any>,
  str: string
): unknown {
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
