import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { PrimaryButton } from '../../components/Buttons/PrimaryButton'
import { CoffeeCardInCheckout } from '../../components/Cards/CoffeeCardInCheckout'
import { InputText } from '../../components/Inputs/InputText'
import { SelectButton } from '../../components/Selects/ButtonSelect'
import { useShoppingCart } from '../../contexts/shopping-cart'
import { currencyFormatter } from '../../utils/formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

const schema = z
  .object({
    cep: z.string().min(1),
    number: z.number().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    complement: z.string().min(1),
    uf: z.string().min(2).max(2),
    neighborhood: z.string().min(1),
    paymentMethod: z.enum(['credit', 'debit', 'cash']),
  })
  .required()

type FormData = z.infer<typeof schema>

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

export function CheckoutPage() {
  const navigate = useNavigate()
  const { products } = useShoppingCart()
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const deliveryFee = 3.5
  const subTotalAmountOfProducts = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  )
  const totalAmountOfProducts = subTotalAmountOfProducts + deliveryFee

  const handleCompletePayment = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // const newPayment = { ...data, totalPrice: totalAmountOfProducts }
    const successPaymentState: PaymentSuccessState = {
      address: {
        number: data.number,
        street: data.street,
        city: data.city,
        neighborhood: data.neighborhood,
        uf: data.uf,
      },
      paymentMethod: data.paymentMethod,
    }
    navigate('/success-payment', { state: successPaymentState })
  }
  return (
    <form
      id="hook-form"
      className={styles.container}
      onSubmit={handleSubmit(handleCompletePayment)}
    >
      <div className={styles.completePaymentContainer}>
        <h3>Complete seu pedido</h3>
        <div className={styles.completePaymentCards}>
          <div className={styles.formContainer}>
            <div className={styles.titleContainer}>
              <MapPin color={'var(--yellow)'} />
              <div className={styles.textsContainer}>
                <strong>Pagamento</strong>
                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </div>

            <div className={styles.formContent}>
              <InputText
                {...register('cep', { required: true })}
                placeholder="Cep"
              />

              <InputText {...register('street')} full placeholder="Rua" />

              <div className={styles.inputsGrid1}>
                <InputText
                  {...register('number', { valueAsNumber: true })}
                  full
                  placeholder="Número"
                  type="number"
                />

                <InputText
                  {...register('complement')}
                  full
                  placeholder="Complemento"
                />
              </div>
              <div className={styles.inputsGrid2}>
                <InputText {...register('neighborhood')} placeholder="Bairro" />

                <InputText {...register('city')} placeholder="Cidade" />

                <InputText {...register('uf')} placeholder="UF" maxLength={2} />
              </div>
            </div>
          </div>
          <div className={styles.paymentMethod}>
            <div className={styles.titleContainer}>
              <CurrencyDollar />
              <div className={styles.textsContainer}>
                <strong>Pagamento</strong>
                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </div>

            <Controller
              control={control}
              name="paymentMethod"
              defaultValue="credit"
              render={({ field }) => {
                return (
                  <div className={styles.actionsPaymentSelect}>
                    <SelectButton
                      type="button"
                      title="CARTÃO DE CRÉDITO"
                      icon={<CreditCard />}
                      selected={field.value === 'credit'}
                      onClick={() => field.onChange('credit')}
                    />
                    <SelectButton
                      type="button"
                      title="CARTÃO DE DÉBITO"
                      icon={<Bank />}
                      selected={field.value === 'debit'}
                      onClick={() => field.onChange('debit')}
                    />

                    <SelectButton
                      type="button"
                      title="DINHEIRO"
                      icon={<Money />}
                      selected={field.value === 'cash'}
                      onClick={() => field.onChange('cash')}
                    />
                  </div>
                )
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.summaryPaymentContainer}>
        <h3>Cafés selecionados</h3>
        <div className={styles.summaryPayment}>
          <div className={styles.items}>
            {products.map((coffee, index) => (
              <>
                <CoffeeCardInCheckout
                  key={coffee.id}
                  productId={coffee.id}
                  imageUrl={coffee.imageUrl}
                  title={coffee.title}
                  price={coffee.price * coffee.quantity}
                  defaultQuantity={coffee.quantity}
                />
                {products.length - 1 !== index && (
                  <span className={styles.divider} />
                )}
              </>
            ))}
          </div>

          <div className={styles.confirmation}>
            <div className={styles.pricesCalc}>
              <div className={styles.pricesContainer}>
                <h4>Total de items</h4>
                <span>{currencyFormatter(subTotalAmountOfProducts)}</span>
              </div>

              <div className={styles.pricesContainer}>
                <h4>Entrega</h4>
                <span>{currencyFormatter(deliveryFee)}</span>
              </div>

              <div className={styles.pricesContainer}>
                <h3>Total</h3>
                <strong>{currencyFormatter(totalAmountOfProducts)}</strong>
              </div>
            </div>
            <PrimaryButton
              type="submit"
              form="hook-form"
              disabled={products.length === 0 || isSubmitting}
              title="CONFIRMAR PEDIDO"
            />
          </div>
        </div>
      </div>
    </form>
  )
}
