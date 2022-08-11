import illustration from '../../assets/images/success-payment.svg'
import locationIcon from '../../assets/images/location-icon.svg'
import timeIcon from '../../assets/images/time-icon.svg'
import dollarIcon from '../../assets/images/dollar-icon.svg'
import styles from './styles.module.scss'
import { useLocation } from 'react-router-dom'

type PaymentSuccessState = {
  address: {
    number: number
    street: string
    city: string
    neighborhood: string
    uf: string
  }
  paymentMethod: 'credit' | 'debit' | 'cash'
}

export function SuccessPaymentPage() {
  const { address, paymentMethod } = useLocation().state as PaymentSuccessState

  const paymentMethodLabel = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'credit':
        return 'Cartão de crédito'
      case 'debit':
        return 'Cartão de débito'
      case 'cash':
        return 'Dinheiro'
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Uhu! Pedido confirmado</h1>
        <p>Agora é só aguardar que logo o café chegará até você</p>
      </header>
      <div className={styles.content}>
        <div className={styles.orderInfo}>
          <div className={styles.cardInfoContainer}>
            <img src={locationIcon} alt="" />
            <p>
              Entrega em{' '}
              <strong>
                {address.street}, {address.number}
              </strong>
              <br />
              {address.neighborhood} - {address.city}, {address.uf}
            </p>
          </div>
          <div className={styles.cardInfoContainer}>
            <img src={timeIcon} alt="" />
            <div className={styles.contentCardInfo}>
              <h4>Previsão de entrega</h4>
              <span>20 min - 30 min</span>
            </div>
          </div>
          <div className={styles.cardInfoContainer}>
            <img src={dollarIcon} alt="" />
            <div className={styles.contentCardInfo}>
              <h4>Pagamento na entrega</h4>
              <span>{paymentMethodLabel(paymentMethod)}</span>
            </div>
          </div>
        </div>
        <img
          src={illustration}
          alt="homem sobre uma moto com pagagem para fazer entrega"
        />
      </div>
    </div>
  )
}
