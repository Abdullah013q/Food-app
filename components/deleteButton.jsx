import React, { useState } from 'react'

export default function DeleteButton({ lable, onClick, Class }) {
    const [conform, setConferm] = useState(false)

    if (conform) {
        return (
            <div disable={true} className="fixed bg-black/50  items-center inset-1 flex justify-center h-full">

                <div className=' p-4 bg-white rounded-lg'>
                    <h1 className='text-gray-500 font-bold items-center mb-1 ml-2 -mt-2'>Are you want to Delete?</h1>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setConferm(false)}>No</button>
                        <button
                            type="button"
                            className='bg-primary text-white border-0'
                            onClick={() => {
                                onClick();
                                setConferm(false)
                            }}
                        >
                            Yes,&nbsp;delete!
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (

        <button type="button" onClick={() => setConferm(true)} className={Class}>{lable}</button>
    )
}
