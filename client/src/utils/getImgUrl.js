export function getImgUrl (name, location) {
  return new URL(`../assets/${location}/${name}`, import.meta.url)
}