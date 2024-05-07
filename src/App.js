import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import { Routes, Route, Redirect } from "react-router-dom";
// import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";

import "./App.css";

class App extends Component {
  state = {
    cartList: [],
  };

  addCartItem = (product) => {
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, product],
    }));
  };

  removeCartItem = (productId) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter(
        (eachItem) => eachItem.id !== productId
      ),
    }));
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  incrementCartItemQuantity = (productId, quantity = 1) => {
    const { cartList } = this.state;

    const oldQuantity = cartList.filter((eachItem) => {
      if (eachItem.id === productId) {
        return eachItem.quantity;
      }
      return 0;
    });
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachItem) => {
        if (eachItem.id === productId) {
          return {
            ...eachItem,
            quantity: parseInt(oldQuantity[0].quantity) + parseInt(quantity),
          };
        }
        return eachItem;
      }),
    }));
  };

  decrementCartItemQuantity = (productId, quantity = 1) => {
    const { cartList } = this.state;

    const oldQuantity = cartList.filter((eachItem) => {
      if (eachItem.id === productId) {
        return eachItem.quantity;
      }
      return 0;
    });
    if (oldQuantity[0].quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachItem) => {
          if (eachItem.id === productId) {
            return {
              ...eachItem,
              quantity: parseInt(oldQuantity[0].quantity) - parseInt(quantity),
            };
          }
          return eachItem;
        }),
      }));
    } else {
      this.removeCartItem(productId);
    }
  };

  render() {
    const { cartList } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          {/* <Route exact path="/login" element={<LoginForm />} /> */}
          <ProtectedRoute exact path="/" component={Home} />
          {/* <ProtectedRoute exact path="/" element={<Home />} /> */}
          <ProtectedRoute exact path="/products" component={Products} />
          {/* <ProtectedRoute exact path="/products" element={<Products />} /> */}
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          {/* <ProtectedRoute
            exact
            path="/products/:id"
            element={<ProductItemDetails />}
          /> */}
          <ProtectedRoute exact path="/cart" component={Cart} />
          {/* <ProtectedRoute exact path="/cart" element={<Cart />} /> */}
          <Route path="/not-found" component={NotFound} />
          {/* <Route path="/not-found" component={<NotFound />} /> */}
          <Redirect to="not-found" />
          {/* <Navigate to="not-found" /> */}
        </Switch>
      </CartContext.Provider>
    );
  }
}

export default App;
