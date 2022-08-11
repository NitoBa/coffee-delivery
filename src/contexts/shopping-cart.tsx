import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

type Product = {
  id: number
  title: string
  price: number
  imageUrl: string
  quantity: number
}

type ShoppingCartContextProps = {
  products: Product[]
  numberOfProductsInCart: number
  addProductToCart: (product: Product) => void
  removeProduct: (id: number) => void
  handleIncrementProductQuantity: (id: number) => void
  handleDecrementProductQuantity: (id: number) => void
}

export const ShoppingCartContext = createContext<ShoppingCartContextProps>(
  {} as ShoppingCartContextProps,
)

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const addProductToCart = useCallback((product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product])
  }, [])

  const numberOfProductsInCart = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  )

  const removeProduct = useCallback((id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    )
  }, [])

  const handleIncrementProductQuantity = useCallback((id: number) => {
    const incrementedProducts = (prevProducts: Product[]) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      })
    setProducts(incrementedProducts)
  }, [])

  const handleDecrementProductQuantity = useCallback((id: number) => {
    const decrementedProducts = (prevProducts: Product[]) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 }
        }
        return product
      })

    setProducts(decrementedProducts)
  }, [])

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProduct,
        numberOfProductsInCart,
        handleIncrementProductQuantity,
        handleDecrementProductQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => useContext(ShoppingCartContext)
