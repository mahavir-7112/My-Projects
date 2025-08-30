
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'; // use for react toastify use 
import { v4 as uuidv4 } from 'uuid';  // also use for generate uniq id 

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" }) // also handle the from
    const ref = useRef(); // this handle image eye image 
    const refpass = useRef(); // also handle for password
    const [passwordarray, setpasswordarray] = useState([]) // handle for save password in local storage 

    // get password from api


    const getPassword = async () => {

        let req = await fetch("http://localhost:3000/") // get the data 
        let pasword = await req.json()
        setpasswordarray(pasword)
        console.log(pasword)


    }

    useEffect(() => {

        getPassword() // call this function



    }, [])


    const savePassword = async () => {

        if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {


            // if any such id exxist in the database so delete 

             await fetch("http://localhost:3000/", {method:"DELETE" , headers:{ "Content-Type":"application/json" }, body:JSON.stringify({...form, id:form.id}) }) 


            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }]) // new password add in this with id  array
             await fetch("http://localhost:3000/", {method:"POST" , headers:{ "Content-Type":"application/json" }, body:JSON.stringify({...form, id:uuidv4()}) })
            console.log([...passwordarray, form]);         // this print all the data 
            setform({ site: "", username: "", password: "" }) // click save button so also clear all 


            toast('🦄 Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,    // when copy any field than show the toast
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        } else {


            toast('🦄 must length is 3 ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,    // when copy any field than show the toast
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }

    }







    // delete button 




    const deletePassword = async (id) => {

        console.log("deleting password with id ", id)

        let c = confirm("do you want a delete password")

        if (c) {



            setpasswordarray(passwordarray.filter(item => item.id !== id))
              let res = await fetch("http://localhost:3000/", {method:"DELETE" , headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ id}) })

          //  localStorage.setItem("password", JSON.stringify(passwordarray.filter(item => item.id !== id))) // this line for work on localstorage




            toast('🦄 Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,    // when copy any field than show the toast
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }

    }


    // edit the text

    const editpassword = (id) => {

        console.log("edit password with id ", id)

        setform({...passwordarray.filter(i => i.id === id)[0], id:id })
        setpasswordarray(passwordarray.filter(item => item.id !== id))


        toast('🦄 Password Edited', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,    // when copy any field than show the toast
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }



    const showpassword = () => {

        ref.current.type = "text"

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            refpass.current.type = "password"
        } else {

            refpass.current.type = "text"
            ref.current.src = "icons/eyecross.png"

        }

    }


    // make handle function 


    const handlechange = (e) => {

        setform({ ...form, [e.target.name]: e.target.value }) // this name is also in input field name = "" you also give 


    }


    const copyText = (text) => {

        //alert("copy clipboard" + text)

        // HERE USE TOAST 


        toast('🦄 Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,    // when copy any field than show the toast
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

        navigator.clipboard.writeText(text); // this code of copy text 

    }



    return (

        // here use background from ibelickbg website

        // here two div is not allowed so also rap in <> </>

        <>

            {/* HERE USE TOASTIFY  */}



            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />


            <ToastContainer />



            <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>

            <div className=" p-3 md:p-0 md:mycontainer min-h-[85vh] ">

                <h1 className='text-4xl font-bold text-center'>

                    <span className='text-green-500'>   / &lt; </span>
                    Pass
                    <span className='text-green-500'>OP  / &gt; </span>

                </h1>

                <p className=' text-green-900 text-lg text-center'>Your Own Password Manager</p>

                <div className=' flex flex-col p-4 text-black gap-8 items-center'>

                    <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='bg-white rounded-full border-2 border-green-500 w-full  p-4 py-1' type="text" name="site" id="site" />

                    <div className="flex md:flex-row flex-col w-full justify-between gap-5 ">

                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='bg-white rounded-full border-2 border-green-500 w-full  p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative">

                            <input ref={refpass} value={form.password} onChange={handlechange} placeholder='Enter Password' className='bg-white rounded-full border-2 border-green-500 w-full  p-4 py-1' type="password" name="password" id="password" />

                            {/* here type = "password " this show like dots.... */}

                            <span className='absolute right-[1px]  top-[4px] cursor-pointer' onClick={showpassword}>



                                <img ref={ref} className='p-1 ' width={26} src="/icons/eye.png" alt="" />

                                {/* here write ref for access the src of image */}

                            </span>

                        </div>






                    </div>

                    {/* Note : here use icon from lordicon website very useful */}





                    <button onClick={savePassword} className=' flex justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 gap-2 border-2 border-green-700'>

                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>


                        Save Password</button>



                </div>


                {/* MAKE TABLE FOR SHOW PASSWORD  */}


                <div className="passwordShow">

                    <h2 className='font-bold text-xl py-4'> Your Passwords </h2>

                    {passwordarray.length === 0 && <div> No Password To Show </div>}
                    {passwordarray.length != 0 &&
                        <table className="table-auto w-full rounded-xl overflow-hidden mb-7">   {/*here use overflow hidden for table roundend  */}
                            <thead className=' bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordarray.map((item, index) => {

                                    return <tr key={index}>

                                        {/* here also give index because this requirement of react to give uniqe key for map */}


                                        <td className='py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <a href={item.site} target='_blank' > {item.site} </a>

                                                <div className=' lordcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>

                                                    <lord-icon

                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} // changes in this icon also posible in react this value pass as object                                                    

                                                        src="https://cdn.lordicon.com/iykgtsbt.json"

                                                        trigger="hover">

                                                    </lord-icon>

                                                </div>

                                            </div>

                                        </td>    {/*  here click so this website open in new tab */}
                                        <td className=' text-center  py-2 border-white '>

                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>

                                                <div className=' lordcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>

                                                    <lord-icon

                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} // changes in this icon also posible in react this value pass as object                                                    

                                                        src="https://cdn.lordicon.com/iykgtsbt.json"

                                                        trigger="hover">

                                                    </lord-icon>

                                                </div>
                                            </div>

                                        </td>
                                        <td className=' text-center  py-2 border-white'>

                                            <div className='flex items-center justify-center'>
                                                {/* <span>{item.password}</span>       this see the password  */}

                                                 <span> {"*".repeat(item.password.length)} </span>  {/* // this is the hide password  */}


                                                <div className=' lordcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }} >

                                                    <lord-icon

                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} // changes in this icon also posible in react this value pass as object                                                    

                                                        src="https://cdn.lordicon.com/iykgtsbt.json"

                                                        trigger="hover">

                                                    </lord-icon>

                                                </div>
                                            </div>


                                        </td>


                                        <td className=' justify-center text-center  py-2 border-white'>

                                            <span className='cursor-pointer mx-2' onClick={() => { editpassword(item.id) }}>

                                                <lord-icon

                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }} >

                                                </lord-icon>

                                            </span>


                                            <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>

                                                <lord-icon

                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }} >

                                                </lord-icon>

                                            </span>




                                        </td>




                                    </tr>


                                })}


                            </tbody>
                        </table>

                    }

                </div>


            </div>

        </>



    )
}

export default Manager
