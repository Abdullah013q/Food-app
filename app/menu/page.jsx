"use client"
import React, { useEffect, useState } from 'react'
import SectionHeader from '../../components/sectionHeader'
import MenuOneItem from '../../components/menuoneItem'

export default function Menupage() {
    const [Categories, setCategories] = useState([])
    const [menuitems, setmenuitems] = useState([])
    const [getTrue, settrue] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/category", {
                    cache: "no-store",
                });

                if (response.ok) {
                    const category = await response.json();
                    setCategories(category)

                }
            } catch (error) {
                console.error("Failed loading topics:", error);
            }
        };
        fetchData()
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("/api/menu-items", {
                    cache: "no-store",
                });

                if (response.ok) {
                    const menuitem = await response.json();
                    setmenuitems(menuitem)


                }
            } catch (error) {
                console.error("Failed loading topics:", error);
            }
        };
        fetchMenuItems()
        settrue(false)
    }, [getTrue])
    return (
        <section className='mt-8'>
            {
                getTrue && (
                    <div className='py-5 text-center font-bold text-gray-700'>Loading...</div>
                )
            }
            {
                Categories?.length > 0 && Categories.map((c) => (
                    <div key={c._id}>
                        <div>
                            <SectionHeader subheading={c.name} />
                        </div>

                        <div className='grid sm:grid-cols-3 gap-4 text-center mt-4 mb-8'>
                            {
                                menuitems.filter((item => item.category === c._id)).map((item) => (
                                    <MenuOneItem key={item._id} {...item} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </section>
    )
}
