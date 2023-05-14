import { useState } from 'react'
import './button.css'

const Button = ({ primary = true }) => {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const className = primary ? 'primary' : 'secondary';

  return (
    <button className={className} onClick={() => setIsToggleOn(!isToggleOn)}>
      {isToggleOn ? 'ON' : 'OFF'}
    </button>
  )
}

export { Button }
