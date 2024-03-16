"use client"
import { useEffect, useState } from 'react'
import MenuOneItem from './menuoneItem'

export default function MenuItems() {
    const [bestSellers,setBestSellers] = useState([])
    const [getTrue,setTrue] = useState(true)
    useEffect(() => {

        fetchData()
    },[getTrue])
    
    const fetchData = async () => {
        try {
            const response = await fetch("/api/menu-items", {
                cache: "no-store",
            });

            if (response.ok) {
                const menuItem = await response.json();
                const bestSellers = menuItem.slice(-3)
                setBestSellers(bestSellers)
                setTrue(false)
            }
        } catch (error) {
            console.error("Failed loading topics:", error);
        }
    };
    return (
        <>
        <div className='grid sm:grid-cols-3 gap-4 text-center'>
         {
            bestSellers?.length > 0 && bestSellers.map((item)=>(
            <MenuOneItem  key={item._id} {...item}/>
            ))
         }
        </div>
        </>
    )
}
