import classNames from 'classnames'
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { full?: boolean }

// eslint-disable-next-line react/display-name
export const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ full = false, ...props }, ref) => {
    const inputClasses = classNames(styles.container, {
      [styles.full]: full,
    })
    return <input className={inputClasses} ref={ref} {...props} />
  },
)
