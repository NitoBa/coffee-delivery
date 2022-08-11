import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { ShoppingCartProvider } from '../../contexts/shopping-cart'
import styles from './styles.module.scss'

export function DefaultLayout() {
  return (
    <ShoppingCartProvider>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </ShoppingCartProvider>
  )
}
