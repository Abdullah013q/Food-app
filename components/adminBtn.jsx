import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default function AdminBtn() {
    // const { sessionClaims } = auth()
    // return sessionClaims?.metadata.role === 'admin'? <Link href={'/admin/dashboard'}>Admin</Link>:''
    return ''
}
