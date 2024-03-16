"use client"
import { useState } from "react"

export default function MenuItemForm({onSubmit,menuItem}) {
    
    const [menuName, setMenuName] = useState(menuItem?.menuName)
    const [menuDisc, setMenuDisc] = useState(menuItem?.menuDisc)
    const [menuPrice, setMenuPrice] = useState(menuItem?.menuPrice)
    return (
        <form onSubmit={onSubmit} className='mt-8 max-w-md mx-auto'>
                <div className="flex items-start gap-4">
                    <div>
                        image
                    </div>
                    <div className='grow'>
                        <label htmlFor="menuName">Item Name</label>
                        <input type="text" name="menuName" id="menuName" value={menuName} onChange={(e) => setMenuName(e.target.value)} required />
                        <label htmlFor="menuDiscription">Item Discription</label>
                        <input type="text" name="menuDiscription" id="menuDiscription" value={menuDisc} onChange={(e) => setMenuDisc(e.target.value)} required />
                        <label htmlFor="menuPrice">Item Price</label>
                        <input type="text" name="menuPrice" id="menuPrice" value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} required />
                        <button className='my-4' type="submit">Create</button>
                    </div>
                </div>
            </form>
    )
}