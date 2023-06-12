import { Box, Flex, Image, Text, Checkbox, Button,} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CarDiv({car , handleDelCar , arr , setArr}){
    const  c = arr.find((ele)=>ele==car._id)
    const [a , setA] = useState(c);
    
const handleDel = ()=>{
    handleDelCar(car._id)
}

const handleChecked = (e)=>{
    if(e.target.checked){
      let newArr = arr.slice();
      newArr.push(car._id);
      setA(true)
      setArr(newArr);
      localStorage.setItem('attryb_arr' , JSON.stringify(newArr))
   }
   else{
    let arr2 = arr.filter((ele)=>ele!==car._id);
      setA(false)
      setArr(arr2);
      localStorage.setItem('attryb_arr' , JSON.stringify(arr2))
   }
}

    return <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="white"
  >
    <Image  h='auto' w='100%' m='auto' src={car.images} alt={car.model} />
    <Box p="6">
      <Box d="flex" alignItems="baseline">
        <Flex gap='10px'>
          <Flex gap='7px' alignItems='center'>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600" mr="2">
             {car.year}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600" mr="2">
             {car.car_Manufacturer}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600" mr="2">
             {car.model}
          </Text>
          </Flex>
        </Flex>
       
       <Flex gap='30px' alignItems='center'>
       <Text fontSize="md" fontWeight="semibold" color="gray.900">
        ₹  {car.price}
        </Text>
       <Text fontSize="14px" color="gray.500">
        Mileage {car.mileage} KM/L
        </Text>
       </Flex>
      </Box>
      <Box mt="1" lineHeight="tight">
        <Text fontSize="sm" fontWeight='600' color='blue'>
          KMs on Odometer : {car.KMs_on_Odometer} KMs
        </Text>
      </Box>
      <Flex gap='7px' alignItems='center'>
          <Text fontSize="sm" fontWeight="semibold" color={car.Original_Paint=='White' || car.Original_Paint=='white' ?"gray.600":car.Original_Paint } mr="2">
             color : {car.Original_Paint}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600" mr="2">
            Place : {car.Registration_Place}
          </Text>
          </Flex>
    <Link to={`/single/${car._id}`}>
    <Button mt='10px' w='100%' bg='black' color='white' _hover={{bg:'blue'}}>
    View Details
    </Button>
    </Link>

    <Flex justifyContent='space-between' alignItems='center' mt='10px' p='0px 20px'>
     <Link className="edit" to={`/car/${car._id}`}>
      Edit
     </Link>
     <Link className="delete" onClick={()=>handleDel()}>
      Delete
     </Link>
    </Flex>
    </Box>
  </Box>
}

export default CarDiv