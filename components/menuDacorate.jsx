import Image from 'next/image'

export default function MenuDacorate() {
  return (
    <div className='absolute left-0 right-0'>

      <div className='h-48 w-48 absolute right-0'>
        <Image src={'/salad1.png'} layout={'fill'} objectFit={'contain'} alt={'salad1'}></Image>
      </div>
      <div className='h-48 w-48 absolute -top-10 left-0'>
        <Image src={'/slad3.png'} layout={'fill'} objectFit={'contain'} alt={'salad3'}></Image>
      </div>
      <div className='h-48 w-48 absolute top-10 right-0'>
        <Image src={'/salad2.png'} layout={'fill'} objectFit={'contain'} alt={'salad2'}></Image>
      </div>
    </div>
  )
}
