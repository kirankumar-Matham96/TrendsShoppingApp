import {useState} from 'react'
import ReactPopUp from '../ReactPopUp'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = props => {
  const {cartList} = props
  const [trigger, setTrigger] = useState(false)

  const numberOfItemsInTheCart = cartList.length
  const totalPriceList = cartList.map(
    eachItem => eachItem.price * eachItem.quantity,
  )

  const totalPrice = totalPriceList.reduce(
    (total, eachPrice) => total + eachPrice,
  )

  const onClosePopup = () => {
    setTrigger(false)
  }

  const onCheckout = () => {
    setTrigger(true)
    setTimeout(() => {
      onClosePopup()
    }, 3000)
  }

  return (
    <div className="cart-summary-bg-container">
      <div className="cart-summary-price-container">
        <h1 className="cart-summary-total-price-header">
          Order Total:{' '}
          <span className="cart-summary-total-price">Rs {totalPrice}/-</span>
        </h1>
        <p className="cart-summary-total-items">
          {numberOfItemsInTheCart} items in cart
        </p>
        <button
          type="button"
          className="checkout-button-lg"
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
      <button type="button" className="checkout-button-sm" onClick={onCheckout}>
        Checkout
      </button>
      {trigger ? (
        <ReactPopUp onClosePopup={onClosePopup}>
          <h1 className="popup-text">Thank you for shopping! 😃</h1>
        </ReactPopUp>
      ) : null}
    </div>
  )
}

export default CartSummary
