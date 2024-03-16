"use client"
import { useEffect, useState } from 'react'
import UserTabs from '../../../../components/userTabs'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { redirect, useParams } from 'next/navigation'
import MenuItemPriceprop from '../../../../components/menuItemPriceprop'
import DeleteButton from '../../../../components/deleteButton'
import Image from 'next/image'


export default function EditePage() {
    const { user, isLoaded } = useUser()
    const { id } = useParams()
    const [menuName, setMenuName] = useState('')
    const [menuDisc, setMenuDisc] = useState('')
    const [menuPrice, setMenuPrice] = useState()
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState('')
    const [sizes, setSizes] = useState([])
    const [ingredientPrices, setIngredientPrices] = useState([])
    const [isPost, setIsPost] = useState(false)

    useEffect(() => {

        
        fetchData()
        fetchCategory()
         }, [])

    if (!user?.publicMetadata.role === "admin") {
        redirect('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const savingPromis = new Promise(async (resolve, reject) => {
            // const sizeId = sizes._id
            const data = { menuName, menuPrice,category, menuDisc, _id: id }

            const res = await fetch("/api/menu-items", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (res.ok) resolve()
            else reject()
        })
        toast.promise(savingPromis, {
            loading: 'Item Updating...',
            success: 'Menu Item Created',
            error: "Item not Update, Please try again."
        })
        setIsPost(true)

    }
    if (isPost) {
        redirect('/menu-items')
    }

    const handleDelete = () => {
        const savingPromis = new Promise(async (resolve, reject) => {
            const res = await fetch(`/api/menu-items?_id=${id}`, {
                method: "DELETE"
            })
            if (res.ok) resolve()
            else reject()
        })
        toast.promise(savingPromis, {
            loading: 'Item Deleting...',
            success: 'Menu Item Deleted',
            error: "Item not Deleted, Please try again."
        })
        setIsPost(true)
    }



   

    const fetchData = async () => {
        try {
            const response = await fetch("/api/menu-items", {
                cache: "no-store",
            });

            if (response.ok) {
                const user = await response.json();
                const item = user.find((i) => i._id === id)
                // const userdata = user
                setMenuName(item?.menuName)
                setMenuDisc(item?.menuDisc)
                setMenuPrice(item?.menuPrice)
                setSizes(item?.sizes)
                setIngredientPrices(item?.ingredientPrices)
                setCategory(item?.category)

            }
        } catch (error) {
            console.error("Failed loading topics:", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await fetch("/api/category", {
                cache: "no-store",
            });

            if (response.ok) {
                const categories = await response.json();
               setCategories(categories)

            }
        } catch (error) {
            console.error("Failed loading topics:", error);
        }
    };

    return (
        <section className='mt-8'>
            <UserTabs active3={'active'} user={user} />
            <div className='mt-8 max-w-md mx-auto text-center'>
                <Link href={'/menu-items'} className='simpleButton'><HiOutlineArrowCircleLeft /> Show All Menu Items</Link>
            </div>
            <form onSubmit={handleSubmit} className='mt-8 max-w-md mx-auto'>
                <div className="sm:grid items-start gap-4">
                <Image className='rounded-lg w-full h-full' src={'/pngegg.png'} width={250} alt='avatar' height={250}/>
                {/* <div className='p-4 rounded-lg mb-1 text-center text-gray-500 bg-gray-300'>
                       No image
                    </div> */}
                    {/* <label>

                    <input type="file"className='hidden' onChange={handelOnflie} />
                    <div className='block border rounded-lg p-2 text-center cursor-pointer border-gray-300'>
                        Change image
                    </div>
                    </label> */}
                    <div className='grow'>
                        <label htmlFor="menuName">Item Name</label>
                        <input type="text" name="menuName" id="menuName" value={menuName || ''} onChange={(e) => setMenuName(e.target.value)} required />
                        <label htmlFor="menuDiscription">Item Discription</label>
                        <input type="text" name="menuDiscription" id="menuDiscription" value={menuDisc || ''} onChange={(e) => setMenuDisc(e.target.value)} required />
                        <label htmlFor="SelectCategory">Ctegory</label>
                        <select name="SelectCategory" id="SelectCategory" value={category || ''} onChange={(e)=>setCategory(e.target.value)}>
                            {
                                categories?.length > 0 && categories.map((item)=>(
                                    <option key={item._id} value={item._id} className='mt-1 rounded-xl bg-transparent'>{item.name}</option>
                                ))
                            }
                        </select>
                        <label htmlFor="menuPrice">Item Price</label>
                        <input type="text" name="menuPrice" id="menuPrice" value={menuPrice || ''} onChange={(e) => setMenuPrice(e.target.value)} required />
                        <MenuItemPriceprop props={sizes} setProps={setSizes} addLable={'Add Item size'} name={"Size"} />
                        <MenuItemPriceprop props={ingredientPrices} setProps={setIngredientPrices} addLable={'Add Ingredients prices'} name={"Extra Ingredients"} />
                        <button className='my-4' type="submit">Update</button>
                           <DeleteButton onClick={handleDelete} Class={'button mt-2'} lable={"Delete this Item"}/>
                    </div>
                </div>
            </form>
        </section>
    )
}
