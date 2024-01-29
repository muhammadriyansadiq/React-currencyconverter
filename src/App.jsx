import { useEffect, useState } from 'react'
import './App.css'
import { FaEquals } from "react-icons/fa";


function App() {
const [firstcurrency,Setfirstcurrency] = useState("")
const [secondcurrency,Setsecondcurrency] = useState("")
const [keys,Setkeys] = useState("")
const [keysandval,Setkeysandval] = useState("")
const [conversioncurrency,Setconversioncurrency] = useState("")
const [checked,Setchecked] = useState("none")
const [result,Setresult] = useState("none")
const [btn,Setbtn] = useState("none")

let data;

useEffect(()=>{
  keys &&  keys.forEach(key => {
    if(key === secondcurrency){
     let final =  `${keysandval[key]}${key}`
     Setconversioncurrency(final)
     console.log(final);
    }      
      })
},[secondcurrency])


const currencytype = (e)=>{
  Setfirstcurrency(e.target.value);
  Setkeys("")
  Setconversioncurrency("")
  Setchecked("none")
  Setresult("none")
  Setbtn("block")
}

const check = ()=>{
  fetchData()
  console.log(firstcurrency);
  Setchecked("block")
}

const onchangecurrency = (e)=>{
  Setsecondcurrency(e.target.value)
Setresult("block")

}
  async function fetchData() {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${firstcurrency}.json`);
         data = await response.json();
        let kiey =  data[firstcurrency];
        console.log(kiey);
        Setkeysandval(kiey)// properties
        Setkeys(Object.keys(kiey)); // Getting all keys of the data object
        // console.log(keys); // Outputting all keys
        // If you want to access each value corresponding to each key:
        // keys.forEach(key => {
        //     console.log(`${key}: ${keysandval[key]}`);
        // });



    } 
    catch (error) {
        console.error('Error during fetching data:', error);
    }
}


  return (
    <div className='parent'>
    <div className='divbox'>
    <h1 className=' text-center text-white p-1 rounded-md text-4xl bg-zinc-900'>Currency Converter</h1>
<div className=' flex justify-around'>
 
  <input onChange={currencytype} type="text" placeholder='enter currency e.g usd' className=' input p-2 lg:p-3'/>

  {/* <p className='p-3 m-2'>To</p> */}

  </div>

  <div className=' flex justify-center '><button className=' input p-2 lg:p-3' onClick={check}style={{display:`${btn}`}}>Check</button></div>
<div className='flex justify-between'>
  <div>
<select style={{ display:`${checked}` }} className=' mr-1 p-1 lg:p-3' onChange={onchangecurrency} name="animals" id="animals" >

{
    keys && keys.map((mawad,ind)=>(
      <option className=' option'  key={ind} value={mawad}>{mawad}</option>
     )
     )
}
</select>
</div>

<div style={{display:`${result}`, display:"flex", justifyContent:"space-between",alignItems:"center" }} className=' w-2/3 mr-1'>
<p className=' input mr-1 p-1 lg:p-3 lg:mx-3' style={{display:`${result}`}}>1{firstcurrency}</p>
<p  style={{display:`${result}`,color:"#181a1e",fontSize:"24px"}}><FaEquals />

</p>
<p className='input mr-1 ml-1 p-1 lg:p-3 lg:ml-3' style={{display:`${result}`}}>{conversioncurrency}</p>
</div>

</div>


    </div>
    </div>
  )
}

export default App

