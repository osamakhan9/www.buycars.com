import { Box, Button, Flex, Image, Select, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "./api";
import { useSearchParams } from "react-router-dom";
import Car from "../components/Home_Car_card";
function Home(){
    let idArr = JSON.parse(localStorage.getItem('attryb_arr'))||[]
    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(false);
    const [searchParams, setSearchParam] = useSearchParams();
    let a = searchParams.get('color')||'';
    const [color , setColor] = useState(a)
    let b = searchParams.get('mileage')||'';
    const [mileage , setMileage] = useState(b)
    let c = searchParams.get('price')||'';
    const [price , setPrice] = useState(c);


     useEffect(()=>{
        // get all cars data
        setLoading(true)
        async function getData(){
            let api = API(mileage , price ,color , `https://buyc-car-backend.onrender.com/car`)
            let res = await axios.get(api);
            let ans = await res.data;
            console.log(ans)
            if(ans.status){
                setData(ans.cars);
            }
            setLoading(false)
        }
        getData();
     },[price , mileage , color])
 
     // set search params
     useEffect(() => {
        let paramsObject = {
        }
        if (price) {
            paramsObject.price = price;
        }
        if (mileage) {
            paramsObject.mileage = mileage;
        }
        if (color) {
            paramsObject.color = color
        }
        setSearchParam(paramsObject)
    },[price , mileage , color])
    if(loading){
        return <Flex w='100%' h='85vh' justifyContent='center' alignItems='center'>
               <Image src='https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif' />
        </Flex>
     }
    return <Box w='90%' m='auto' mt='40px' mb='50px'>
        <SimpleGrid gap='10px' mb='40px' columns={['1','1','2','3']}>
            <Select value={color} onChange={(e)=>setColor(e.target.value)}>
                <option value="">Select Colour</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="navy">Navy</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="gray">Gray</option>
            </Select>
            <Select value={mileage} onChange={(e)=>setMileage(Number(e.target.value))}>
                <option value="">Select Mileage</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={60}>60</option>
                <option value={80}>80</option>
                <option value={120}>120</option>
                <option value={140}>140</option>
                <option value={100}>100</option>
                <option value={160}>160</option>
            </Select>
            <Select value={price} onChange={(e)=>setPrice(Number(e.target.value))}>
                <option value="">Select Price</option>
                <option value={100000}>100000</option>
                <option value={200000}>200000</option>
                <option value={300000}>300000</option>
                <option value={500000}>500000</option>
                <option value={700000}>700000</option>
                <option value={900000}>900000</option>
                <option value={1500000}>1500000</option>
                <option value={2000000}>2000000</option>
            </Select>
        </SimpleGrid>
        {
            loading ? <SimpleGrid gap='10px' columns={['1','1','2','4']}>
                {
                    [1,2,3,4,5,6,7,8].map((ele)=>{
                        return <Skeleton key={ele} h='250px' w='100%'></Skeleton>
                    })
                }
            </SimpleGrid>:data?.length==0?
            
            <Flex mt='250px' justifyContent='center' alignItems='center'w='100%' h='300px' >

          
               <Image w='auto' h='auto' src="https://cdn.dribbble.com/users/5187354/screenshots/14032905/no_data_found_4x.jpg"/>
              

            </Flex>:<SimpleGrid gap='20px' columns={['1','1','2','4']}>
                {
                    data?.map((ele)=>{
                        return <Car key={ele._id} car={ele} />
                    })
                }
            </SimpleGrid>
        }
    </Box>
}


export default Home;