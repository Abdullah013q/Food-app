"use client"
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import UserTabs from '../../components/userTabs'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const users = useUser()
  // console.log(user?.publicMetadata.role);
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [city, setCity] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [street, setStreet] = useState('')
  const [country, setCountry] = useState('')
  const [getdata, setGetdata] = useState(true)

  const email = user?.emailAddresses.toString();
  const userid = user?.id.toString();

  
  useEffect(() => {
    
    fetchData()
    setGetdata(false)
  }, [getdata])

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
        
        
        // console.log(user.result[0].name);
        // wet(user.result[0].name)
      }
    } catch (error) {
      console.error("Failed loading topics:", error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && phoneNumber && city && postalcode && street && country) {
      const savingPromis = new Promise(async (resolve, reject) => {

        // toast('Detail updated...')
        const res = await fetch(`/api/topic/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userid, name, email, phoneNumber, city, postalcode, street, country }),
        })
        if (res.ok) resolve()
        else reject()

      })
      toast.promise(savingPromis, {
        loading: "Detail updated...",
        success: "Your details updated",
        error: "Your details not update, Please try again."
      })
    } else {
      toast.error("All inputs requried")
    }
  }


  return (
    <section className='mt-8'>
    <UserTabs user={user} active1={'active'}/>
      {/* <h1 className='text-center text-primary mb-4 text-2xl'>{user?.lastName}'s</h1> */}
      <div className="mx-auto max-w-xs block">
        <div className="flex flex-col">
          <div className='flex gap-2 flex-row'>
            <Image  className='rounded-md' width={100} height={100} alt='profile pitcher' src={user?.imageUrl || ''} />
            <button type="button" className="simpleButton" onClick={()=>setGetdata(true)}>Current Profile</button>
          </div>
          <form className='grow' onSubmit={handleSubmit}>
            {/* <input disabled={false} onChange={(e) => setName(e.target.value)} type="text" value={user?.fullName} /> */}
            <label htmlFor="name">First and Last Name</label>
            <input disabled={false} id='name' onChange={(e) => setName(e.target.value)} type="text" value={name || ''} placeholder='full name' required />
            <label htmlFor="emailAdress">Email Address</label>
            <input disabled={true} id='emailAdress' type="text" value={user?.emailAddresses || ''} readOnly />
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
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}
