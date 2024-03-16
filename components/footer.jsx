import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className='border-t p-8 text-center text-gray-500'>
            &copy; 2024 All Rights Reserved <br/>
            <Link href={'https://abdullah013q.github.io/portfolio.com/'}> Developed by Pro-Coder</Link>
        </footer>
    )
}
