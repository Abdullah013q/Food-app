"use client"
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserTabs from '../../components/userTabs'
import ClientOrders from '../../components/orders'



export default function Orderpage() {
  const { user, isLoaded } = useUser()

  if (!user?.publicMetadata.role === "admin") {
    redirect('/')
  }
  const [order, setOrder] = useState('')

  const [getdata, setGetdata] = useState(true)

  const email = user?.emailAddresses.toString();

  useEffect(() => {

    fetchData()    
    setGetdata(false)
  }, [getdata])

  
  
  const fetchData = async () => {
    try {
      const response = await fetch("/api/checkout", {
        cache: "no-store",
      });
      if (response.ok) {
        const orders = await response.json();
        setOrder(orders.reverse())
      }
    } catch (error) {
      console.error("Failed loading topics:", error);
    }
  };

 


  return (
    <section className='mt-8'>
      <UserTabs user={user} active4={'active'} />
      <div className='mt-8 max-w-2xl mx-auto'>
        {
           getdata && (
            <div className='py-5 text-center font-bold text-gray-700'>Loading...</div>
           )
        }
        {
          order && user?.publicMetadata.role === "admin" ? (
            <>
            {
               order && order.map((item)=>(
    
                <ClientOrders key={item._id} {...item}/>
                ))
              }
              </>
          ): (
            <>
            {
               order && order.filter((item => item.email === user?.emailAddresses.toString())).map((item)=>(
    
                <ClientOrders key={item._id} {...item}/>
                ))
              }
            </>
          )
        }
      </div>
    </section>
  )
}
