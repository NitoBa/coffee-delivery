import landingImage from '../../assets/images/landing.png'
import { Clock, Coffee, Cube, ShoppingCartSimple } from 'phosphor-react'
import { CoffeeCard } from '../../components/Cards/CoffeeCard'
import { coffees } from '../../database/coffees'

import { useShoppingCart } from '../../contexts/shopping-cart'

import styles from './styles.module.scss'

export function Home() {
  const { addProductToCart } = useShoppingCart()
  return (
    <div className={styles.container}>
      <section className={styles.sectionLanding}>
        <div className={styles.contentLanding}>
          <div className={styles.sectionLandingLeft}>
            <div className={styles.sectionTitle}>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>
              <p>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </p>
            </div>

            <div className={styles.iconsText}>
              <div className={styles.iconText}>
                <div className={styles.yellowDark}>
                  <ShoppingCartSimple />
                </div>
                <span>Compra simples e segura</span>
              </div>
              <div className={styles.iconText}>
                <div className={styles.brown}>
                  <Cube />
                </div>
                <span>Embalagem mantém o café intacto</span>
              </div>
              <div className={styles.iconText}>
                <div className={styles.yellow}>
                  <Clock />
                </div>
                <span>Entrega rápida e rastreada</span>
              </div>
              <div className={styles.iconText}>
                <div className={styles.purple}>
                  <Coffee />
                </div>
                <span>O café chega fresquinho até você</span>
              </div>
            </div>
          </div>
          <img
            className={styles.landingImage}
            src={landingImage}
            alt="Imagem de um copo de café"
          />
        </div>
      </section>

      <section className={styles.coffeesContainer}>
        <h3>Nossos Cafés</h3>

        <div className={styles.coffeesGallery}>
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              id={coffee.id}
              title={coffee.title}
              description={coffee.description}
              image={coffee.imageUrl}
              price={coffee.price}
              tags={coffee.tags}
              onAdd={(value) =>
                addProductToCart({
                  id: coffee.id,
                  title: coffee.title,
                  imageUrl: coffee.imageUrl,
                  price: coffee.price,
                  quantity: value,
                })
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}
