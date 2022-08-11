import { Trash } from 'phosphor-react'
import { HTMLAttributes } from 'react'
import { useShoppingCart } from '../../../contexts/shopping-cart'
import { currencyFormatter } from '../../../utils/formatter'
import { CounterButton } from '../../Buttons/CounterButton'
import { SecondaryIconButton } from '../../Buttons/SecondaryIconButton'
import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  productId: number
  imageUrl: string
  title: string
  price: number
  defaultQuantity?: number
}

export function CoffeeCardInCheckout({
  productId,
  title,
  imageUrl,
  price,
  className,
  defaultQuantity = 1,
  ...props
}: Props) {
  const {
    removeProduct,
    handleDecrementProductQuantity,
    handleIncrementProductQuantity,
  } = useShoppingCart()

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <div className={styles.trailing}>
        <img src={imageUrl} alt="" />
        <div>
          <h4>{title}</h4>
          <div className={styles.buttons}>
            <CounterButton
              onDecrement={() => handleDecrementProductQuantity(productId)}
              onIncrement={() => handleIncrementProductQuantity(productId)}
              defaultValue={defaultQuantity}
            />
            <SecondaryIconButton
              icon={<Trash />}
              title="Remove"
              onClick={() => removeProduct(productId)}
            />
          </div>
        </div>
      </div>
      <div className={styles.leading}>
        <span>{currencyFormatter(price)}</span>
      </div>
    </div>
  )
}
