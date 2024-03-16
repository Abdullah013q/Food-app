"use client"
import UserTabs from '../../components/userTabs'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { RiArrowRightCircleLine } from "react-icons/ri";
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function MenuItemspage() {
    const { user, isLoaded } = useUser()
    const [menuItems, setMenuItems] = useState('')
    const [geted, stGeted] = useState(true)

    useEffect(() => {

        fetchData()
    }, [geted])

    const fetchData = async () => {
        try {
            const response = await fetch("/api/menu-items", {
                cache: "no-store",
            });

            if (response.ok) {
                const Items = await response.json();
                setMenuItems(Items)
                stGeted(false)
            }
        } catch (error) {
            console.error("Failed loading Menu Items:", error);
        }
    };

    return (
        <section className='mt-8'>
            <UserTabs active3={'active'} user={user} />
            <div className='mt-8 max-w-md mx-auto'>
                <Link href={'/menu-items/new'} className='simpleButton'>Create New Menu Items <RiArrowRightCircleLine /></Link>
            </div>
            <h2 className='mt-8 text-sm text-gray-500 text-center mb-3 font-bold cursor-pointer' onClick={() => stGeted(true)}>All Menu Items</h2>
            {
                    geted && (
                        <div className='py-5 text-center font-bold text-gray-700'>Loading...</div>
                    )
                }
            <div className='grid sm:grid-cols-5 grid-cols-3 gap-2'>
                {
                    menuItems?.length > 0 && menuItems.map((item) => (
                        <>
                        <div key={item._id}>

                            <Link
                                href={`/menu-items/edite/${item._id}`}
                                className='button bg-gray-100 rounded-xl p-2 mb-1 flex-row cursor-pointer'
                            >
                                <div className='relative pl-3'>
                                    <Image src={'/pngegg.png'} className='rounded-md' width={100} height={100} alt='Image'/>
                                </div>
                                <div className='text-center mt-2'>
                                    {item.menuName}
                                </div>
                            </Link>
                                </div>
                        </>
                    ))
                }
            </div>
        </section>
    )
}
