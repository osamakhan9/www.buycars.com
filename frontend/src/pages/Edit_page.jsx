import {Flex, FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCar(){
    const params = useParams();
    const [obj , setObj] = useState({})
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {value , name} = e.target;
            setObj({...obj , [name]:value})
        }
    

    const handleClick = async(e)=>{
      e.preventDefault();
        delete obj._id;
        delete obj.__v;
        delete obj.userID;
        let res = await axios.put(`https://buyc-car-backend.onrender.com/car/edit/${params.id}` ,{car : obj} );
        let ans = await res.data;
        if(ans.status){
            toast({
                title: 'Car Updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              navigate('/myposts')
        }
        else{
            toast({
                title: 'Error Occured',
                description: ans.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        }


    }

    useEffect(()=>{
      async function getObj(){
        let res = await axios.get(`https://buyc-car-backend.onrender.com/car/single/${params.id}`);
        let ans = await res.data;
        if(ans.status){
            setObj(ans.cars);
        }
      }
      getObj();
    },[])
    return <Flex flexDirection='column' w={['300px','400px','500px','500px']} m='auto' mt='20px' gap='10px'>
      <form onSubmit={(e)=>handleClick(e)}>
      <FormControl>
            <FormLabel>Company</FormLabel>

<Select  placeholder='Select Company' value={obj.car_Manufacturer}  name="car_Manufacturer" onChange={handleChange}>

<option value="Maruti">Maruti</option>
<option value="Hyundai">Hyundai</option>
<option value="Tata">Tata</option>
<option value="Mahindra">Mahindra</option>
</Select>

            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Model</FormLabel>
  <Input  required type='text' value={obj.model} placeholder='ex- i-10,safari,thar'  name="model" onChange={handleChange}  />

            </FormControl>

             <FormControl  mt={4}>
             <FormLabel>Year</FormLabel>
  <Input  value={obj.year} required type='number' placeholder='ex- 2010,2021' name="year" onChange={handleChange} />

             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Paint</FormLabel>
  <Select  placeholder='Select color' value={obj.Original_Paint}   name="Original_Paint" onChange={handleChange} >
    <option value="Red">Red</option>
    <option value="White">White</option>
    <option value="Black">Black</option>
    <option value="Blue">Blue</option>
    <option value="Gray">Gray</option>
    <option value="Green">Green</option>
  </Select>
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>No. of Accidents</FormLabel>
  <Input  required type='number' placeholder='ex- 1,2,3' value={obj.Number_of_accidents_reported} name="Number_of_accidents_reported" onChange={handleChange}  />
      
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Number_of_previous_buyers</FormLabel>
      <Input  required type='number' placeholder='ex- 1,2,3....' value={obj.Number_of_previous_buyers}  name="Number_of_previous_buyers" onChange={handleChange} />
      
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Registration_Place</FormLabel>
      <Input  required type='text' placeholder='ex- city name....' value={obj.Registration_Place}  name="Registration_Place"  onChange={handleChange}  />

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>KMs_on_Odometer</FormLabel>
  <Input  required type='number' placeholder='ex- 12000,15000....' value={obj.KMs_on_Odometer}  name="KMs_on_Odometer" onChange={handleChange} />

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>Major_Scratches</FormLabel>
  <Input  required type='number' placeholder='ex- 1,2,3....' value={obj.Major_Scratches}  name="Major_Scratches" onChange={handleChange}/>

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>price</FormLabel>
  <Input  required type='number' placeholder='ex- 500000,110000' value={obj.price}  name="price" onChange={handleChange} />
 
             </FormControl>
    <Input  mt='30px' _hover={{bg:'teal'}} bg="black" color='white' type='submit' value='Update' />
      </form>
           
    </Flex>
}