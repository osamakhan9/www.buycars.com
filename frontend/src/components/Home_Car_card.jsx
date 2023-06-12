import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";

function Car({car}){

    return   <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="white"
  >
    <Image h='auto' w='100%' m='auto' src={car.images} alt={car.model} />
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
    <Button mt='10px' w='100%' _hover={{bg:'blue'}} color='white' bg='black' >
      View Details
    </Button>
    </Link>
    </Box>
  </Box>
}

export default Car