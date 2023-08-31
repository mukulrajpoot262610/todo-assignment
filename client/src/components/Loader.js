import React from 'react'

const Loader = () => {
    return (
        <>
            <main className='h-screen w-full bg-white flex justify-center items-center flex-col fixed z-50 top-0 left-0'>
                <h1 className='animate-pulse text-4xl font-bold text-primary-blue'>Loading...</h1>
            </main>
        </>
    )
}

export default Loader