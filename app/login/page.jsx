"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginProcess, setloginProcess] = useState(false)


  const handleSubmit = async (e) => {

    e.preventDefault();
    setloginProcess(true)


    setloginProcess(false)

  }
  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary mb-4 text-2xl'>LogIn</h1>
      <form className='mx-auto max-w-xs block' onSubmit={handleSubmit} >
        <input disabled={loginProcess} type="email" name="email" placeholder="text@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input disabled={loginProcess} type="password" name="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loginProcess} type="submit">Log In</button>
        <div className='my-4 text-center text-gray-500 '>OR</div>
        <button disabled={loginProcess} onClick={() => signIn('google')}  className='flex gap-3 disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-300 justify-center items-center '>
          Login with
          <Image src={'/google.png'} width={70} height={70} alt={'Google'} />
        </button>
        <div className='mt-6 mb-10 text-center'>
          You have not an account? <Link className='text-primary font-bold underline' href={'/register'}>Register here</Link>
        </div>
      </form>
    </section>
  )
}
