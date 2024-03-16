import React from 'react'
import SectionHeader from './sectionHeader'

export default function Contact() {
    return (
        <section className='text-center my-7' id='contact'>
            <SectionHeader heading={'Don\'t hesitate'} subheading={'Contact Us'} />
            <div className='text-gray-500 mt-8'>
                <a className='text-2xl' href="tel:+923237450077">+92 323 7450077</a>
            </div>
        </section>
    )
}
