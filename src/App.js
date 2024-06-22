import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {id} = product
    const {cartList} = this.state

    const duplicateProduct = cartList.filter(e => {
      if (e.id === id) {
        return e
      }
      return null
    })

    if (duplicateProduct.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedQuantityProduct = cartList.map(e => {
        if (e.id === id) {
          return {
            availability: e.availability,
            brand: e.brand,
            description: e.description,
            id: e.id,
            imageUrl: e.imageUrl,
            price: e.price,
            quantity: e.quantity + product.quantity,
            rating: e.rating,
            title: e.title,
            totalReviews: e.totalReviews,
          }
        }
        return e
      })
      this.setState({cartList: updatedQuantityProduct})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(e => {
      if (e.id !== id) {
        return e
      }
      return null
    })
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(e => {
        if (e.id === id) {
          return {
            availability: e.availability,
            brand: e.brand,
            description: e.description,
            id: e.id,
            imageUrl: e.imageUrl,
            price: e.price,
            quantity: e.quantity + 1,
            rating: e.rating,
            title: e.title,
            totalReviews: e.totalReviews,
          }
        }
        return e
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(e => {
        if (e.id === id) {
          if (e.quantity > 1) {
            return {
              availability: e.availability,
              brand: e.brand,
              description: e.description,
              id: e.id,
              imageUrl: e.imageUrl,
              price: e.price,
              quantity: e.quantity - 1,
              rating: e.rating,
              title: e.title,
              totalReviews: e.totalReviews,
            }
          }
          this.removeCartItem(id)
        }
        return e
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
