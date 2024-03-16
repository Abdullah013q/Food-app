"use client"
import React, { useContext, useState } from 'react'
import { CarrtContext } from '../components/appProvider'
import MenuOneTile from '../components/menuOneTile'
import toast from 'react-hot-toast';
import { FaCartPlus } from "react-icons/fa";
import Image from 'next/image';

export default function MenuOneItem(menuItem) {
    const { menuDisc, menuName, menuPrice, ingredientPrices, sizes, category } = menuItem;
    const [popup, setPopup] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sizes?.[0])
    const [selectedIngredient, setSelectedIngredient] = useState('')
    const { addToCart } = useContext(CarrtContext)

    const handelAddToCart = () => {
        const hasOptions = sizes.length > 0 || ingredientPrices.length > 0
        if(popup){
            addToCart(menuItem, selectedSize,selectedIngredient);
            toast.success('Added to Cart');
        }else{

            if (hasOptions && !popup) {
                setPopup(true)
            } else {
                addToCart(menuItem)
                toast.success('Added to Cart')
            }
        }
    }
    const trues = (sizes?.length > 0 || ingredientPrices?.length > 0)

    function handleIngredients(e, extras) {
        const checked = e.target.checked;
        console.log(checked);
        if (checked) {
            setSelectedIngredient(prev => [...prev,extras])
        } else {
            setSelectedIngredient(((prev) => {
                return prev.filter(e => e.name !== extras.name)
            }))
        }

    }

    let Prices = menuPrice;
    if(selectedSize){
        Prices += selectedSize.price; 
    }
    if(selectedIngredient.length > 0){
        for (const extra of selectedIngredient) {
            Prices += extra.price;
        }
    }


    return (
        <>
        
            {
                popup && (
                    <div  key={menuItem._id} onClick={() => setPopup(false)} className="flex inset-0 fixed bg-black/80 items-center justify-center">
                        <div onClick={(e)=> e.stopPropagation() } className="max-w-md bg-white p-4 rounded-lg overflow-y-scroll scroll-pl-2" style={{ maxHeight: 'calc(100vh - 70px)' }}>
                            <Image className='mx-auto' src={'/pngegg.png'} width={200} height={300} alt='Pizza Image' />
                            <h2 className='text-lg font-bold text-center mb-2'>{menuName}</h2>
                            <p className='text-sm text-center text-gray-500'>{menuDisc}</p>

                            {
                                trues && (
                                    <div className="bg-gray-200 mt-2 rounded-md p-2 ">
                                        <div className="grid grid-flow-col">
                                            {
                                                sizes?.length > 0 && (

                                                    <div className="flex flex-col">
                                                        <h3 className='text-start'>Pick your size</h3>

                                                        {
                                                            sizes.map((item , index) => (
                                                                <label key={item.name} className='block py-2 text-start'>
                                                                    <input
                                                                        type="radio"
                                                                        onClick={() => setSelectedSize(item)}
                                                                        name='size'
                                                                        className='mx-2 text-center'
                                                                    />
                                                                    {item.name} ${menuPrice + item.price}
                                                                </label>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                            {
                                                ingredientPrices?.length > 0 && (

                                                    <div className="flex flex-col">
                                                        <h3 className='text-start'>Add more Ingredients</h3>

                                                        {
                                                            ingredientPrices?.map((item) => (
                                                                <label key={item.name} className='block py-2 text-start'>
                                                                    <input
                                                                        className='mx-2'
                                                                        type="checkbox"
                                                                        onClick={(e) => handleIngredients(e, item)}
                                                                        name={item.name}
                                                                    />
                                                                    {item.name} ${item.price}
                                                                </label>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )
                            }
                            <button type="button"
                             onClick={()=>{
                                handelAddToCart();
                                setPopup(false)
                            }}
                                 className="mt-2 flex flex-row justify-center gap-2 bg-primary rounded-lg text-white border-0">Add to <FaCartPlus className='-rotate-12' /> ${Prices}</button>
                            <button type="button" onClick={()=> setPopup(false)} className="mt-2">Cancel</button>
                        </div>
                    </div>
                )
            }
            <MenuOneTile onAddToCart={handelAddToCart} {...menuItem} />
        </>
    )
}
