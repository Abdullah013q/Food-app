"use client"
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useState } from 'react'

export default function Registerpage() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [userCreating, setUserCreating] = useState(false)
    // const [userCreated, setUserCreated] = useState(false)
    // const [userNotCreated, setUserNotCreated] = useState(false)

    // const handleSubmit =async (e) => {
    //     e.preventDefault();
    //     setUserCreating(true)
    //    try {
    //     if(email && password){
    //         const respo = await fetch("/api/register", {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ email, password })
    //         })
    //         if(respo.ok){
    //             setUserCreated(true)
    //         }else{
    //             setUserNotCreated(true)
    //             setTimeout(() => {
    //                 setUserNotCreated(false)
    //             }, 5000);
    //         }
    //     }else{
    //         alert("Enter email and password")
    //     }
    //    } catch (error) {
    //     console.log(error);
    // }
    // setUserCreating(false)

    // }
    return (
       <section className='mt-8'>
{/*             
            {userCreated?<div className="success">You are registerd, Now you can <Link className='text-primary font-bold underline' href={'/login'}>LogIn &raquo;</Link></div>:''}
            {userNotCreated?<div className="error">Resolve some error, Please try again</div>:''}
            <h1 className='text-center text-primary mb-4 text-2xl'>Register</h1>
            <form className='mx-auto max-w-xs block' onSubmit={handleSubmit}>
                <input type="email" disabled={userCreating} placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" disabled={userCreating} placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button disabled={userCreating} type="submit">Register</button>
                <div className='my-4 text-center text-gray-500 '>OR</div>
                <button disabled={userCreating} className='flex gap-3 disabled:cursor-not-allowed justify-center items-center '>
                    Login with
                    <Image src={'/google.png'} width={70} height={70} alt={'Google'} />
                </button>
                <div className='mt-6 mb-10 text-center'>
                    You have an account? <Link className='text-primary font-bold underline' href={'/login'}>LogIn here</Link>
                </div>
            </form> */}
        </section>
    )
}
