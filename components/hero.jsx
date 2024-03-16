import Image from 'next/image'

export default function Hero() {
    return (
        <section className=' block md:grid grid-cols-2 mt-3'>
            <div className='py-12'>
                <h1 className='text-4xl font-semibold leading-normal'>Everything is better<br/> with  <span className='text-primary'>Fast Food</span></h1>
                <p className='my-4 text-gray-500 text-sm'>Sapiente eaque in itaque soluta. Quas, adipisci aut sint vero nesciunt enim accusamus eveniet accusantium sit odio laudantium non quibusdam eaque molestiae totam omnis quis minima?</p>
                <div className='flex gap-5 text-sm'>
                    <button className='bg-primary border-0 text-white rounded-full px-6 py-1'>
                        Order Now
                    </button>
                    <button className=' py-2 text-gray-500'>
                        Learn more
                        </button>
                </div>
            </div>
            <div className='relative hidden md:block'>
                <Image src={'/pngegg.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'}></Image>
            </div>
        </section>
    )
}
