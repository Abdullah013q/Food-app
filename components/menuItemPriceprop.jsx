// "use client"
import { FiPlus } from "react-icons/fi";
import { FaChevronDown, FaTrashAlt } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";


export default function MenuItemPriceprop({ setProps, props, addLable, name }) {

    const [isOpen, setIsOpen] = useState(true)

    const handleSizes = () => {

        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }]
        })

    }

    function editeProps(e, index, prop) {
        const newValue = e.target.value
        setProps(preProp => {
            const newProp = [...preProp]
            newProp[index][prop] = newValue
            return newProp
        })
    }
    function removeProps(indexToRemove) {
        setProps(prv => prv.filter((v, index) => index !== indexToRemove))
    }

    // const 


    return (
        <div className='bg-gray-200 p-2 rounded-md mb-2 gap-2'>
            <button type="button" className="inline-flex p-1 border-0 gap-2 justify-start items-center" onClick={() => setIsOpen(prv => !prv)}>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />} <span> {name}</span><span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'hidden' : 'block'}>

                {
                    props?.length > 0 && props.map((item, index) => (
                        <div key={item._id} className='flex items-end gap-2'>
                            <div>
                                <label>{name}</label>
                                <input type="text" placeholder='Size' value={item.name} onChange={(e) => editeProps(e, index, 'name')} />
                            </div>
                            <div>
                                <label>Extra Price</label>
                                <input type="text" placeholder='Extra price' value={item.price} onChange={(e) => editeProps(e, index, 'price')} />
                            </div>
                            <div>
                                <button type="button" className='bg-white mb-2' onClick={() => removeProps(index)}><FaTrashAlt /></button>
                            </div>
                        </div>
                    ))
                }
                <button
                    onClick={handleSizes}
                    type='button'
                    className='bg-white justify-center flex flex-row items-center gap-2 mt-2'
                >
                    <FiPlus /> {addLable} </button>
            </div>
        </div>
    )
}
