import { Minus, Plus } from 'phosphor-react'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type CounterButtonProps = {
  defaultValue?: number
  onChange?: (value: number) => void
  onIncrement?: (value: number) => void
  onDecrement?: (value: number) => void
}

export function CounterButton({
  onChange,
  defaultValue = 1,
  onIncrement,
  onDecrement,
}: CounterButtonProps) {
  const [count, setCount] = useState(defaultValue)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
    if (onIncrement) {
      onIncrement(count + 1)
    }
  }
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1)
      if (onDecrement) {
        onDecrement(count - 1)
      }
    }
  }

  useEffect(() => {
    if (onChange) onChange(count)
  }, [count])

  return (
    <div className={styles.container}>
      <Minus onClick={handleDecrement} weight="bold" />
      <span>{count}</span>
      <Plus onClick={handleIncrement} weight="bold" />
    </div>
  )
}
