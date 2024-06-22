import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      cartList.forEach(e => {
        totalAmount += e.quantity * e.price
      })

      return (
        <div className="total-balance-container">
          <div>
            <h1 className="total-amount-text">
              Order Total:{' '}
              <span className="total-amount">Rs {totalAmount}/- </span>
            </h1>
            <p>{cartList.length} Items in cart</p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
