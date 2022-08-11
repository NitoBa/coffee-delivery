import { ShoppingCartSimple } from 'phosphor-react'
import { CounterButton } from '../../Buttons/CounterButton'
import { IconButton } from '../../Buttons/IconButton'
import styles from './styles.module.scss'

type Tag = {
  title: string
}

type CoffeeCardProps = {
  id: number
  title: string
  description: string
  image: string
  price: number
  tags: Tag[]
  onAdd: (value: number) => void
}

export function CoffeeCard({
  id,
  title,
  description,
  image,
  price,
  tags,
  onAdd,
}: CoffeeCardProps) {
  let quantity = 1

  const handleAddToCart = () => {
    onAdd(quantity)
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="" />

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span className={styles.tag} key={tag.title}>
            {tag.title.toUpperCase()}
          </span>
        ))}
      </div>

      <div className={styles.titles}>
        <strong className={styles.title}>{title}</strong>

        <span className={styles.description}>{description}</span>
      </div>

      <div className={styles.prices}>
        <strong className={styles.price}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)}
        </strong>

        <div className={styles.actions}>
          <CounterButton
            onChange={(value) => {
              quantity = value
            }}
          />
          <IconButton
            variant={'purple'}
            icon={<ShoppingCartSimple weight="fill" />}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}
