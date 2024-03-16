"use client"
import { useUser } from '@clerk/nextjs'
import UserTabs from '../../components/userTabs'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import DeleteButton from '../../components/deleteButton'

export default function Categoriespage() {
    const { user } = useUser()
    if (!user && !user?.publicMetadata.role === "admin") {
        redirect('/')
    }

    const [Category, setCategory] = useState('')
    const [newCategory, setnewCategory] = useState('')
    const [editeCategory, setEditeCategory] = useState('')
    const [getTrue, settrue] = useState(true)

    useEffect(() => {

        fetchData()
    }, [getTrue])


    const handleSubmit = (e) => {
        e.preventDefault()
        const savingPromis = new Promise(async (resolve, reject) => {

            const data = { name: newCategory }
            if (editeCategory) {
                data._id = editeCategory._id
            }
            const res = await fetch(`/api/category`, {
                method: editeCategory ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            if (res.ok) resolve()
            else reject()


        })
        toast.promise(savingPromis, {

            loading: editeCategory ? "Updating category..." : "Creating new category...",
            success: editeCategory ? "Category Updated" : "New Categoy Created",
            error: editeCategory ? "Categoy not Update, Please try again." : "Categoy not Created, Please try again.",
        })
        setEditeCategory('')
        setnewCategory('')
        settrue(true)


    }

    const handleDelete = async (_id) => {
        const deletePromis = new Promise(async (resolve, reject) => {

            const res = await fetch(`/api/category?_id=${_id}`, {
                method: "DELETE",
            })
            if (res.ok) resolve()
            else reject()
        })
        toast.promise(deletePromis, {
            loading: 'Category Deleting...',
            success: 'Category Deleted',
            error: 'Category not Deleted, Please try again.'
        })
        settrue(true)
    }



    const fetchData = async () => {
        try {
            const response = await fetch("/api/category", {
                cache: "no-store",
            });

            if (response.ok) {
                const user = await response.json();
                const userdata = user
                // console.log(userdata);
                setCategory(userdata)
                settrue(false)

            }
        } catch (error) {
            console.error("Failed loading topics:", error);
        }
    };

    return (
        <section className='mt-8 mb-8'>
            <UserTabs user={user} active2={'active'} />
            <div className='mt-8 max-w-md mx-auto'>
                <form className='flex gap-2 items-end pb-3' onSubmit={handleSubmit}>
                    <div className='grow'>
                        <label htmlFor="catagory">{editeCategory ? 'Update Category:' : 'New Category'} <b>{editeCategory.name}</b></label>
                        <input id='catagory' type="text" placeholder='Category' onChange={(e) => setnewCategory(e.target.value)} value={newCategory} required />
                    </div>
                    <div className='pb-1 flex gap-2'>
                        <button className='border border-primary' type='submit'>{editeCategory ? 'Update' : 'Create'}</button>
                        <button type="button" className='' onClick={() => {
                            setEditeCategory('')
                            setnewCategory('')
                        }}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
                <div >

                    {
                        !getTrue && (
                            <h2 className='mt-8 text-sm text-gray-500 cursor-default'>
                                {Category?.length > 0 ? 'Existing Categories' : 'No Category Exist'}
                            </h2>
                        )
                    }
                    {
                        getTrue && (
                            <div className='py-5 text-center font-bold text-gray-700'>Loading...</div>
                        )
                    }
                    {
                        Category?.length > 0 && Category.map((item) => (
                            <>
                                <div key={item.name} className='bg-gray-100 rounded-xl p-2 mb-3 px-4 flex gap-2'>
                                    <div className='grow cursor-default items-center'>{item.name}</div>
                                    <div className='flex gap-1'>
                                        <button type="button" className="text-gray-800 font-semibold"
                                            onClick={() => {
                                                setEditeCategory(item)
                                                setnewCategory(item.name)
                                            }}
                                        >
                                            <MdModeEditOutline/>
                                        </button>
                                        <DeleteButton Class={"text-red-400"} lable={<FaTrashAlt />} onClick={() => handleDelete(item._id)}>

                                        </DeleteButton>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
