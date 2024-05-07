import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onIncrementItemQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const onDecrementItemQuantity = () => {
        decrementCartItemQuantity(id)
      }

      return (
        <Link to={`/products/${id}`} className="link-item">
          <li className="cart-item">
            <img className="cart-product-image" src={imageUrl} alt={title} />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <p className="cart-product-title">{title}</p>
                <p className="cart-product-brand">by {brand}</p>
              </div>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  testid="minus"
                  className="quantity-controller-button"
                  onClick={onDecrementItemQuantity}
                >
                  <BsDashSquare
                    color="#52606D"
                    size={12}
                    title="decrease quantity"
                  />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  type="button"
                  testid="plus"
                  className="quantity-controller-button"
                  onClick={onIncrementItemQuantity}
                >
                  <BsPlusSquare
                    color="#52606D"
                    size={12}
                    title="increase quantity"
                  />
                </button>
              </div>
              <div className="total-price-remove-container">
                <p className="cart-total-price">Rs {price * quantity}/-</p>
                <button
                  className="remove-button"
                  type="button"
                  testid="remove"
                  onClick={onRemoveCartItem}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              <AiFillCloseCircle
                color="#616E7C"
                size={20}
                title="Remove from cart"
              />
            </button>
          </li>
        </Link>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
