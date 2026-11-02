export const scrollToHash = (path: string) => {
  setTimeout(() => {
    const elementWithId = document.getElementById(
      path.split('#').slice(1).join()
    )
    elementWithId?.scrollIntoView({ behavior: 'smooth' })
  }, 0)
}
