import Link from 'next/link';
import {TimeAndDate} from '../components/minFunction/dataTime'
    
    export default function ClientOrders(item) {
        const {email,phoneNumber,name,paid,cartProducts,_id,createdAt} =item;
      return (
        <div key={_id} className='bg-gray-100 mb-2 p-4 rounded-md md:grid grid-cols-3 flex flex-col gap-2'>
        <div className='flex flex-row '>
          {
            email ? <span className='font-semibold grow text-gray-500'>{email}</span>:<span className='font-semibold grow text-gray-500'>{name}</span>
          }
          
          <span className='text-gray-500'>{phoneNumber}</span>
          </div>
        <div className='my-auto ml-14 grow flex items-center'>
          <span className={paid ? ' bg-green-400 p-2 rounded-sm w-24 text-center text-white' : 'bg-red-400 p-2 rounded-sm w-24 text-center text-white'}>
            {paid ? 'Paid' : 'Not Paid'}</span>
        </div>
          <div className='flex items-center justify-between'>

          <div className='flex flex-col gap-1 md:-ml-10'>
          <span className='font-semibold text-gray-500'>Order Items: {cartProducts.length}</span>
          <span className='text-gray-500'>{TimeAndDate(createdAt)}</span>
          </div>
        <Link href={'/orders/'+_id} className='border border-gray-500 py-3 px-2 rounded-xl text-gray-700 font-semibold bg-white'>Show Order</Link>
          </div>
      </div>
      )
    }
    