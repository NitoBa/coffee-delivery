import logo from '../../assets/logo.svg'
import { MapPin, ShoppingCartSimple } from 'phosphor-react'
import { IconButton } from '../Buttons/IconButton'

import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { useShoppingCart } from '../../contexts/shopping-cart'

export function Header() {
  const navigate = useNavigate()
  const { numberOfProductsInCart } = useShoppingCart()
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.logo}
          src={logo}
          alt="logo of coffee delivery"
          onClick={() => navigate('/', { replace: true })}
        />
        <div className={styles.actions}>
          <div className={styles.locationCard}>
            <MapPin weight="fill" />
            <span>Porto Alegre, RS</span>
          </div>
          <IconButton
            variant="yellow"
            productsAmountInCart={numberOfProductsInCart}
            icon={<ShoppingCartSimple weight="fill" />}
            onClick={() => navigate('/checkout')}
          />
        </div>
      </div>
    </header>
  )
}
