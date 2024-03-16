import React from 'react'

export default function AddToCartButton({onClick,menuPrice,hasSizesOrExtras}) {
  return (
    <button
    type='button'
    onClick={onClick}
    className='bg-primary mt-4 border-0 text-white rounded-full'
>{hasSizesOrExtras ?
    <span>Add cart (From ${menuPrice})</span>:
    <span>Add cart ${menuPrice}</span>
}
    
</button>
  )
}
