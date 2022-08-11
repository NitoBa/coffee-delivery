import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface IconButtonProps {
  productsAmountInCart?: number
  variant: 'purple' | 'yellow'
  icon: ReactNode
  onClick: () => void
}

export function IconButton({
  icon,
  onClick,
  variant,
  productsAmountInCart,
}: IconButtonProps) {
  const variantClasses = classNames(styles.container, {
    [styles.purple]: variant === 'purple',
    [styles.yellow]: variant === 'yellow',
  })
  return (
    <button className={variantClasses} onClick={onClick}>
      {variant === 'yellow' && !!productsAmountInCart && (
        <span className={styles.tagProductCounter}>{productsAmountInCart}</span>
      )}
      {icon}
    </button>
  )
}
