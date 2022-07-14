export { asyncWrap } from "./asyncWrap";

export const isEmpty = (obj: any) => {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
