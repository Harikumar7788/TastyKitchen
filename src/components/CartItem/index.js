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
      const {id, imageUrl, name, quantity, cost} = cartItemDetails

      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      const totalPrice = cost * quantity

      return (
        <li className="cart-item">
          <div className="cart-product-title-brand-container">
            <img className="cart-product-image" src={imageUrl} alt={name} />
            <h1 className="cart-product-title">{name}</h1>
          </div>
          <div className="cart-item-details-container">
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={14} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickIncrement}
              >
                <BsPlusSquare color="#52606D" size={14} />
              </button>
            </div>
            <p className="cart-total-price">Rs {totalPrice}/-</p>
          </div>
          <div className="remove-container">
            <button
              className="remove-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              Remove
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
