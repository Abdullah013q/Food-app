"use client"
import { useContext, useEffect, useState } from 'react'
import SectionHeader from '../../components/sectionHeader'
import { CarrtContext, CartProductPrice } from '../../components/appProvider'
import { FaTrashAlt } from 'react-icons/fa'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function CartPage() {
    const { cartProducts, removeCart } = useContext(CarrtContext)

    const { user, isLoaded } = useUser()
    const users = useUser()
    // console.log(user?.publicMetadata.role);
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [city, setCity] = useState('')
    const [postalcode, setPostalcode] = useState('')
    const [street, setStreet] = useState('')
    const [country, setCountry] = useState('')
    // const [getdata, setGetdata] = useState(true)
    const [UserOrders, setUserOrders] = useState(false)

    const email = user?.emailAddresses.toString();
    // const get = getdata && user && email;


        useEffect(() => {

            fetchData()
        }, [])

    // if (user && isLoaded) {
    //     setUserOrders(true);
    // }

    const fetchData = async () => {
        try {
            const response = await fetch("/api/topic", {
                cache: "no-store",
            });

            if (response.ok) {
                const user = await response.json();
                const userdata = user.result[0]
                // console.log(userdata);
                setName(userdata?.name)
                setPhoneNumber(userdata?.phoneNumber)
                setStreet(userdata?.street)
                setPostalcode(userdata?.postalcode)
                setCity(userdata?.city)
                setCountry(userdata?.country)
                // setGetdata(false)

            }
        } catch (error) {
            console.error("Failed loading topics:", error);
        }
    };

    async function proceedToCheckout(ev) {
        ev.preventDefault();
            
            const promise = new Promise(async (resolve, reject) => {
            await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name, city, postalcode, country, email, street, phoneNumber, cartProducts
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    // window.location = await response.json();
                } else {
                    reject();
                }
            });
        });
        toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
        })
    }
    
    let total = 0;
    for (const p of cartProducts) {
        total += CartProductPrice(p)
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeader mainHeader="Cart" />
                <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }
    return (
        <>
            <section className='mt-8'>
                <SectionHeader subheading={'Cart'} />
                <div className='md:grid grid-cols-2 gap-20'>
                    <div>
                        {
                            cartProducts?.length > 0 && cartProducts.map((item, index) => (
                                <div key={item._id} className='flex gap-3 border-b py-4 mb-4 items-center '>
                                    <div className='grow flex items-center'>
                                        <div className='w-16'>
                                            <Image src={'/pngegg.png'} width={100} height={100} alt='Image' />
                                        </div>
                                        <div>
                                            <h3 className='font-semibold'>{item.menuName}</h3>
                                            {
                                                item.size && (
                                                    <div className='text-sm text-gray-700'>Size:
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
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => removeCart(index)}
                                            className=""><FaTrashAlt /></button>
                                    </div>
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
                    <div className='bg-gray-100 rounded-lg p-3'>
                        <h2 className='text-center font-semibold text-lg text-gray-400'>Check Out</h2>
                        <form className='grow' onSubmit={proceedToCheckout}>
                            {/* <input disabled={false} onChange={(e) => setName(e.target.value)} type="text" value={user?.fullName} /> */}
                            <label htmlFor="name">First and Last Name</label>
                            <input disabled={false} id='name' onChange={(e) => setName(e.target.value)} type="text" value={name || ''} placeholder='full name' required />
                            <label className='hidden' htmlFor="emailAdress">Email Address
                                <input disabled={true} id='emailAdress' type="text" value={user?.emailAddresses || ''} readOnly />
                            </label>
                            <label htmlFor="Phone">Phone Number</label>
                            <input disabled={false} id='Phone' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber || ''} type="text" placeholder='+92 300 0000000' minLength={10} maxLength={11} required />
                            <label htmlFor="Street">Street</label>
                            <input disabled={false} id='Street' onChange={(e) => setStreet(e.target.value)} value={street || ''} type="text" name='street' placeholder='Street address' required />
                            <div className="flex gap-4">
                                <div>
                                    <label htmlFor="Postalcode">Postal Code</label>
                                    <input disabled={false} id='Postalcode' onChange={(e) => setPostalcode(e.target.value)} value={postalcode || ''} type="text" placeholder='Postal code' required minLength={6} />
                                </div>
                                <div>
                                    <label htmlFor="City">City</label>
                                    <input disabled={false} id='City' onChange={(e) => setCity(e.target.value)} value={city || ''} type="text" name='city' placeholder='City' required />
                                </div>
                            </div>
                            <label htmlFor="Country">Country</label>
                            <input id='Country' onChange={(e) => setCountry(e.target.value)} value={country || ''} type="text" name='country' placeholder='Country' required />
                            <button type='submit'>Pay ${total + 5}</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}