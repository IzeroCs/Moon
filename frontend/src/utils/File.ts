export function isIconPath(icon: string): boolean {
  return icon.match(/^\/(?:\w.+\/?){0,}$/g) != null
}
