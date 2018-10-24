// getScrollTop
export function getScrollTop() {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    window.scrollY ||
    document.body.scrollTop
  )
}
