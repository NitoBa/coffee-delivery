import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
export function PrimaryButton({ onClick, title, ...props }: ButtonProps) {
  return (
    <button {...props} className={styles.container} onClick={onClick}>
      <span className={styles.title}>{title}</span>
    </button>
  )
}
