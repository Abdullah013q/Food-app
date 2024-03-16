"use client"
import { UserButton, UserProfile, useAuth, useSession, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useContext, useState } from "react";
import { CarrtContext } from "./appProvider";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";



export default function Header() {
  const { user, isLoaded } = useUser()
  const [naveBar , setNaveBar] = useState(false)
  const { cartProducts } = useContext(CarrtContext)


  return (
    <div>
      <header className="">
        <div className="flex items-center md:hidden">
          <button
           type="button"
           onClick={()=> setNaveBar(prve=> !prve)}
          className="flex border-0 p-0 w-8"
            >
            <div className="mr-5 font-bold"><RxHamburgerMenu /></div>
          </button>
          <Link className="text-primary font-semibold text-2xl grow" href="/">ABC POINT</Link>
          <Link href={'/cart'} className="relative">
            <FaCartShopping className="size-6" />
            <span className="absolute -top-2.5 -right-3 bg-primary text-white  px-1 text-sm rounded-lg">
              {cartProducts.length === 0 ? '' : cartProducts.length}
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-between">

          <nav className="flex gap-8 items-center text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href="/">ABC POINT</Link>
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
            {
              user?.publicMetadata.role === "admin" && (
                <Link href={'/admin/dashboard'}>Admin</Link>
              )
            }
          </nav>
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link href={'/cart'} className="relative">
              <FaCartShopping className="size-6" />
              <span className="absolute -top-2.5 -right-3 bg-primary text-white  px-1 text-sm rounded-lg">
                {cartProducts.length === 0 ? '' : cartProducts.length}
              </span>
            </Link>

            {isLoaded && user ? <><Link href={'/profile'}>{user.fullName}</Link> <UserButton afterSignOutUrl="/" />  </> : <>
              <Link href={'/sign-in'}>LogIn</Link>
              <Link href={'/sign-up'} className="bg-primary border-0 text-white rounded-full px-6 py-2">Register</Link>
            </>
            }
          </nav>

        </div>
        {naveBar && (
          
        <div
        onClick={()=> setNaveBar(false)}
         className="md:hidden bg-gray-200 rounded-lg p-4 mt-2 flex flex-col gap-2 text-center ">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          {
            user?.publicMetadata.role === "admin" && (
              <Link href={'/admin/dashboard'}>Admin</Link>
            )
          }
          <div className="flex items-center justify-center flex-row gap-2">

            {isLoaded && user ? <><Link href={'/profile'}>{user.fullName}</Link> <UserButton afterSignOutUrl="/" />  </> : <>
              <Link href={'/sign-in'}>LogIn</Link>
              <Link href={'/sign-up'} className="bg-primary border-0 text-white rounded-full px-6 py-2">Register</Link>
            </>
            }
          </div>
        </div>
        )}

      </header>
    </div>
  )
}
