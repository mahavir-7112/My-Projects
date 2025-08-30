
import React from 'react'

const Navbar = () => {
    return (

        <nav className='bg-slate-800 '>

            <div className="mycontainer flex justify-between px-4 items-center h-14 py-5 ">




                <div className='logo font-bold text-white text-2xl'> 
                    
                   <span className='text-green-500'>   / &lt; </span>
                     Pass 
                     <span className='text-green-500'>OP  / &gt; </span>
                  
                     
                     </div>

                {/* <ul>
                    <li className='flex gap-5'>
                        <a className='hover:font-bold text-white' href="/"> Home </a>
                        <a className='hover:font-bold text-white' href="#"> About </a>
                        <a className='hover:font-bold text-white' href="#"> Contact </a>
                    </li>
                </ul> */}


                <button className='text-white cursor-pointer bg-green-600 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
                    <img className='invert w-10 p-1 ' src="/icons/github.svg" alt="hello" />
                    <span className='font-bold px-2' > GitHub </span> 
                </button>

            </div>
        </nav>
    )
}

export default Navbar
