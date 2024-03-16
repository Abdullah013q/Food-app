import React from 'react'
import AddToCartButton from './addToCartButton'

export default function MenuOneTile({onAddToCart,...items}) {
    const { menuDisc, menuName, menuPrice, ingredientPrices, sizes, category } =items
    const hasSizesOrExtras = (sizes?.length > 0 || ingredientPrices?.length > 0)

  return (
    <div className='bg-gray-200 py-6 px-2 transition-all hover:shadow-2xl hover:shadow-bg-gray-600 rounded-lg hover:bg-white'>
    <div className="text-center">
        <img className='mx-auto block max-h-24' src="/pngegg.png" alt="pizza" />
    </div>
    <h4 className='font-semibold text-xl my-2'>{menuName}</h4>
    <p className='text-gray-500 text-sm line-clamp-3'>
        {menuDisc}
    </p>
   <AddToCartButton onClick={onAddToCart} menuPrice={menuPrice} hasSizesOrExtras={hasSizesOrExtras}/>
</div>
  )
}
