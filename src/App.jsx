import { useState, useEffect } from "react";
import Header from "./component/Header.jsx";
import Guitar from "./component/Guitar.jsx";
import { db } from "./data/db.js";

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }


  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  function addToCart(item){

    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

    if(itemExists >= 0){
      if(cart[itemExists].cantidad >= 5) return 
      const updateCart = [...cart]
      updateCart[itemExists].cantidad++
      setCart(updateCart)

    }else{
      item.cantidad = 1
      setCart([...cart,item])
    }
    
    
  }

  function removeFromCart(id){
    
    const deleteCart = cart.filter((item) => { return item.id !== id})
    setCart(deleteCart)

    // setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    
  }

  function increasequantity(id){
    const updateCart = cart.map( item => {
      if(item.id === id && item.cantidad < MAX_ITEMS){
        return {
          ...item,
          cantidad: item.cantidad + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreasequantities(id){
    const udpdateCart = cart.map((item) => {
      if(item.id === id && item.cantidad > 0){
        return {
          ...item,
          cantidad: item.cantidad - 1
        }
      }
      return item
    })
    setCart(udpdateCart)
  }

  function cleanCart(){
    setCart([])
  }


  return (
    <>
      <Header
      cart = {cart}
      removeFromCart = {removeFromCart}
      increasequantity = {increasequantity}
      decreasequantities = {decreasequantities}
      cleanCart = {cleanCart}

      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id} 
              guitar={guitar} 
              addToCart = {addToCart}       
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Guitar - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
