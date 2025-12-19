import {useState} from 'react'

import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const showEmptyView = cartList.length === 0

       

        const onCheckout = () => {
         
          setIsOrderPlaced(true)
        }

        if (isOrderPlaced) {
          return (
            <>
              <Header />
              <div className="cart-container">
                <h1 className="cart-heading">Order Placed Successfully 🎉</h1>
                <p className='cart-desc'>Thank you for shopping with us.</p>
              </div>
            </>
          )
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>

                  <button
                    type="button"
                    className="remove-all-btn"
                    
                  >
                    Remove All
                  </button>

                  <CartListView />
                  <CartSummary onCheckout={onCheckout} />
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
