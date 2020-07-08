/*邮箱校验*/
export function email(value) {
  var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return reg.test(value);
}
