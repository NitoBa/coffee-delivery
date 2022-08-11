import { ReactNode } from 'react'
import styles from './styles.module.scss'
interface IconButtonProps {
  title: string
  icon: ReactNode
  onClick: () => void
}
export function SecondaryIconButton({ icon, onClick, title }: IconButtonProps) {
  return (
    <button className={styles.container} onClick={onClick}>
      {icon}
      <span className={styles.title}>{title}</span>
    </button>
  )
}
