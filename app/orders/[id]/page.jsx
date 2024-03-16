"use client"
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react'
import SectionHeader from '../../../components/sectionHeader'
// import { redirect } from 'next/navigation'
import { FaArrowLeftLong } from "react-icons/fa6";
import { CarrtContext, CartProductPrice } from '../../../components/appProvider'
import Image from 'next/image'
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useUser } from "@clerk/nextjs";

export default function Orderpage() {
  const { cartProducts } = useContext(CarrtContext)
  const { id } = useParams()
  const { user, isLoaded } = useUser()
  const [order, setOrder] = useState('')
  const [paid, setPaid] = useState()
  const router = useRouter()



  useEffect(() => {
    oneOrder()
  }, [])
  const oneOrder = async () => {
    try {

      const response = await fetch(`/api/orders?_id=${id}`, {
        cache: "no-cache",
      })
      if (response.ok) {
        const orders = await response.json();
        setOrder(orders);
        const checkPaid = orders.paid;
        setPaid((prve) => prve !== checkPaid)
      }
    } catch (error) {
      console.log(error);
    }
  }

  let total = 0;
  if (order.cartProducts) {

    for (const p of order.cartProducts) {
      total += CartProductPrice(p)
    }
  }

  function onPaid(e) {
    e.preventDefault()

    try {
      const savingPromis = new Promise(async (resolve, reject) => {
        const res = await fetch(`/api/orders?_id=${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ paid, id })
        })
        if (res.ok) {
          resolve()
          router.push("/orders")
        }
        else reject()
      })
      toast.promise(savingPromis, {
        loading: 'Loading...',
        success: `Mark ${paid ? 'Paid' : 'Not Paid'}`,
        error: "Bill not marked, Please try again."
      })
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <section className="mt-8">
      <Link href={'/orders'} className='font-bold text-gray-600'>
        <FaArrowLeftLong size={20} />
      </Link>
      <SectionHeader subheading={'Your Orders'} />
      <div className="my-4 text-center">
        <p>Thanks for Order.</p>
        <p>We will call you when your order will be on the way.</p>
      </div>
      {
        order && (
          <>

            <div key={order._id} className='md:grid grid-cols-2 gap-16 my-8'>
              <div>
                <div className='my-3 flex justify-center'>
                  <span className={order.paid ? ' bg-green-400 p-2 rounded-sm text-white' : 'bg-red-400 p-2 rounded-sm text-white '}>
                    {order.paid ? 'Paid' : 'Not Paid'}</span>
                </div>
                {
                  order && order.cartProducts.map((item) => (
                    <div key={item._id} className='flex gap-3 border-b py-4 mb-4 items-center '>
                      <div className='grow flex items-center'>
                        <div className='w-16'>
                          <Image src={'/pngegg.png'} width={100} height={100} alt="Image" />
                        </div>
                        <div>
                          <h3 className='font-semibold'>{item.menuName}</h3>
                          {
                            item.size && (
                              <div key={item._id} className='text-sm text-gray-700'>Size:
                                <span> {item.size.name}</span>
                              </div>
                            )
                          }
                          {
                            item.extras.length > 0 && (
                              <div className='text-sm text-gray-500'>
                                {
                                  item.extras.map((item) => (
                                    <div key={item._id}>Extra
                                      <span> {item.name} ${item.price},</span>
                                    </div>
                                  ))
                                }
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <div className='font-semibold'>${CartProductPrice(item)}</div>

                    </div>
                  ))
                }
                <div className="py-2 pr-20 flex justify-end items-center">
                  <div className="text-gray-500">
                    Subtotal:<br />
                    Delivery:<br />
                    Total:
                  </div>
                  <div className="font-semibold pl-2 text-right">
                    ${total}<br />
                    $5<br />
                    ${total + 5}
                  </div>
                </div>
              </div>
              <div className='bg-gray-100 p-4 rounded-lg flex flex-col gap-3 ml-8 border-l-4'>
                <form className='grow'>
                  {/* <input disabled={false} onChange={(e) => setName(e.target.value)} type="text" value={user?.fullName} /> */}
                  <label htmlFor="name">First and Last Name</label>
                  <input disabled={true} id='name' type="text" value={order.name || ''} placeholder='full name' required />
                  <label className='' htmlFor="emailAdress">Email Address</label>
                  <input disabled={true} id='emailAdress' type="text" value={order.email || ''} readOnly />

                  <label htmlFor="Phone">Phone Number</label>
                  <input disabled={true} id='Phone' value={order.phoneNumber || ''} type="text" placeholder='+92 300 0000000' minLength={10} maxLength={11} required />
                  <label htmlFor="Street">Street</label>
                  <input disabled={true} id='Street' value={order.street || ''} type="text" name='street' placeholder='Street address' required />
                  <div className="flex gap-4">
                    <div>
                      <label htmlFor="Postalcode">Postal Code</label>
                      <input disabled={true} id='Postalcode' value={order.postalcode || ''} type="text" placeholder='Postal code' required minLength={6} />
                    </div>
                    <div>
                      <label htmlFor="City">City</label>
                      <input disabled={true} id='City' value={order.city || ''} type="text" name='city' placeholder='City' required />
                    </div>
                  </div>
                  <label htmlFor="Country">Country</label>
                  <input id='Country' disabled={true} value={order.country || ''} type="text" name='country' placeholder='Country' required />
                </form>

              </div>
            </div>
            {
              isLoaded && user.publicMetadata.role === "admin" && (

                <div className='flex md:flex-row flex-col gap-8 items-center py-2'>
                  <div className='text-gray-700 font-semibold'>
                Customer Total bill of ${total + 5} is {order.paid ? 'Paid' : 'not-Paid'}.
              </div>
              <div className='flex flex-row gap-3 md:ml-8 md:border-l-4'>
                <div className=" md:w-7 md:text-gray-700 "></div>
                <div>
                  <button
                    onClick={(e) => onPaid(e)}
                    type="button"
                  >Mark {order.paid ? 'Not Paid' : 'Paid'}
                  </button>
                </div>
              </div>
            </div>
              )}
          </>
        )
      }
    </section>
  )
}
