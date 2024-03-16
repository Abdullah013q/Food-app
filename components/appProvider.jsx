"use client"
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export function CartProductPrice(cartProduct) {
    let price = cartProduct.menuPrice
    if(cartProduct?.size){
        price += cartProduct.size.price;
    }
    if(cartProduct?.extras?.length > 0){
        for(const extras of cartProduct.extras){
            price += extras.price
        }
    }
    return price;
}

export const CarrtContext = createContext()

export default function AppProvider({children}) {
    const [cartProducts,setCartProducts] = useState([])
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    },[])

    function saveLS(cartProducts) {
        if(ls){
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
        
    }

    function clearCart() {
        setCartProducts([])
        saveLS([])
        
    }

    function removeCart(indexToRemove) {
        setCartProducts((prve) =>{
            const newCartproduct = prve.filter((v,index)=>index !== indexToRemove)
            saveLS(newCartproduct)
            return newCartproduct;
        })
        toast.success('Product Remove')
        
    }

    function addToCart(product,size=null, extras=[]) {
        setCartProducts(prve =>{
            const cartproduct =  {...product , size, extras}
            const newProduct = [...prve ,cartproduct]
            saveLS(newProduct)
            return newProduct
        })
        
    }

  return (
<CarrtContext.Provider 
value={{
    cartProducts,
    setCartProducts,
    addToCart,
    removeCart,
    clearCart,
}}
>
   {children}
</CarrtContext.Provider>
  )
}
