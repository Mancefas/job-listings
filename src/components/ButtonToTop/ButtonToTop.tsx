const ButtonToTop = () => {

    const scrollToTop = () => window.scrollTo({top: 0, behavior: "smooth"})

  return <button onClick={scrollToTop}>🔝</button>
}

export default ButtonToTop