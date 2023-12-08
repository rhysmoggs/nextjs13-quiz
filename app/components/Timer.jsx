const { useState, useEffect } = require('react')

const Timer = () => {
  const [count, setCount] = useState(5)
  console.log('external count: ', count)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <div className='container'>
        <p>Time left: {count} seconds</p>
      </div>
    </>
  )
}

export default Timer
