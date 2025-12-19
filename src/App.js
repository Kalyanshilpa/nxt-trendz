import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useState} from 'react'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = product => {
    const existingItem = cartList.find(item => item.id === product.id)

    if (existingItem) {
      setCartList(prev =>
        prev.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        ),
      )
    } else {
      setCartList(prev => [...prev, product])
    }
  }

  const removeCartItem = id => {
    setCartList(prev => prev.filter(item => item.id !== id))
  }

  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prev =>
      prev
        .map(item =>
          item.id === id
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductItemDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
