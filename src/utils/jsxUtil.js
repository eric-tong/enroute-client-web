// @flow

export function getClass(...classNames: (?string)[]) {
  return classNames.filter(className => className).join(" ");
}
