import React, { Fragment } from 'react'
import "./cartpage.scss"
import Header from 'components/header/Header'
import Cart from 'components/cart/Cart'

const CartPage = () => {
  return (
	<Fragment>
		<Header/>
		<Cart/>
	</Fragment>
  )
}

export default CartPage