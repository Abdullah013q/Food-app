import React from 'react'

export default function SectionHeader({heading,subheading}) {
    return (
        <div className="text-center mb-2">
            <h3 className='uppercase font-semibold text-gray-600 leading-3'>{heading}</h3>
            <h2 className='text-primary italic text-3xl font-bold'>{subheading}</h2>
        </div>
    )
}
