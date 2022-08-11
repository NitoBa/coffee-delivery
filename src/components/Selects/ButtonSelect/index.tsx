import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean
  title: string
  icon: ReactNode
  onClick: () => void
}
export function SelectButton({
  icon,
  onClick,
  title,
  selected,
  ...props
}: IconButtonProps) {
  const buttonClass = classNames(styles.container, {
    [styles.selected]: selected,
  })

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {icon}
      <span className={styles.title}>{title}</span>
    </button>
  )
}
