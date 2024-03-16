import Link from 'next/link'

export default function UserTabs({user ,active1,active2,active3,active4,active5}) {

    //  we use hook for add class with usePathname() like this:
    //  const path = usePathname()
    //  className={path === '/profile' ? 'active' : ''}
    //  But we use props because Hooks use in "client" components

  return (
    <div className='flex gap-1 tabs justify-end flex-wrap text-sm'>
    <Link className={active1} href={'/profile'}>Profile</Link>
    {
      user?.publicMetadata.role === "admin" && (
        <>
          <Link className={active2} href={'/categories'}>Categories</Link>
          <Link className={active3} href={'/menu-items'}>Menu Items</Link>
          {/* <Link className={active5} href={'/users'}>Users</Link> */}
        </>
      )
    }
    <Link className={active4} href={'/orders'}>Orders</Link>

  </div>
  )
}
