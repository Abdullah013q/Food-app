import React from 'react'
import MenuItems from './menuItems'
import SectionHeader from './sectionHeader'
import MenuDacorate from './menuDacorate'
import Contact from './contact'

export default function HomeManu() {
    return (
        <section>
            <SectionHeader heading={'Check Out'} subheading={'Our best seller'} />
            <MenuDacorate />
            <MenuItems />
            <div className='py-4' id='about'>
            <section className='text-center my-16'>
                <SectionHeader heading={'Our Story'} subheading={'About Us'} />
                <div className='max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4'>
                    <p >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex recusandae, sapiente nemo velit asperiores similique accusamus libero ratione est quibusdam blanditiis vel totam accusantium laboriosam eveniet, nobis doloribus fugit excepturi!</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia illo doloribus libero voluptates architecto distinctio repellendus placeat laboriosam, ad nulla aspernatur. Voluptatibus mollitia tempora accusantium quam vel quaerat voluptates veritatis.</p>
                </div>
            </section>
            </div>
            <Contact/>
        </section>
    )
}
