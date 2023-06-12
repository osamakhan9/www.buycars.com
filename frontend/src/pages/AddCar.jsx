import { Button, Flex, FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

let init = {
  car_Manufacturer: '',
  Original_Paint: '',
  Number_of_accidents_reported: '',
  Number_of_previous_buyers: '',
  Registration_Place: '',
  KMs_on_Odometer: '',
  Major_Scratches: '',
  price: '',
  mileage: '',
  model: '',
  year: ''

}
export default function EditCar() {
  const [obj, setObj] = useState(init)
  const [imageUrl, setImageUrl] = useState("")
  const [url, setUrl] = useState("")
  const { user } = useContext(AuthContext);
  const [load, setLoad] = useState(false)
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setObj({ ...obj, [name]: value })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoad(true)
    const data = new FormData();
    data.append("file", imageUrl)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "omeshcloud")
    fetch("https://api.cloudinary.com/v1_1/omeshcloud/image/upload", {
      method: "POST",
      body: data
    }).then(res => res.json())
      .then((data) => setUrl(data.url))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (url) {
      async function postCar() {
        let res = await axios.post(`https://buyc-car-backend.onrender.com/car/create`, { car: obj, images: url, userID: user._id });
        let ans = await res.data;
        if (ans.status) {
          setLoad(false)
          toast({
            title: 'Car Added',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          })
          setObj(init)
          navigate('/myposts')
        }
        else {
          setLoad(false)
          toast({
            title: 'Error Occured',
            description: ans.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
          })
        }
      }

      postCar();
    }
  }, [url])

  return <Flex flexDirection='column' w={['300px', '400px', '500px', '500px']} m='auto' mt='20px' gap='10px'>
    <form onSubmit={(e) => handleClick(e)}>
      <FormLabel>Image of Car</FormLabel>
      <Input pt='5px' required type="file" accept='image/*' onChange={(event) => {
        setImageUrl(event.target.files[0])
      }} />
      <FormControl>
        <FormLabel>Company</FormLabel>

        <Select placeholder='Select Company' value={obj.car_Manufacturer} name="car_Manufacturer" onChange={handleChange}>

          <option value="Maruti">Maruti</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Tata">Tata</option>
          <option value="Mahindra">Mahindra</option>
        </Select>

      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Model</FormLabel>
        <Input required type='text' value={obj.model} placeholder='for example safari, thar BMW' name="model" onChange={handleChange} />

      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Year</FormLabel>
        <Input value={obj.year} required type='number' placeholder='ex-2010,2023' name="year" onChange={handleChange} />

      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Paint</FormLabel>
        <Select placeholder='Select color' value={obj.Original_Paint} name="Original_Paint" onChange={handleChange} >
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="Gray">Gray</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Accidents Number</FormLabel>
        <Input required type='number' placeholder='for example 1,2,3' value={obj.Number_of_accidents_reported} name="Number_of_accidents_reported" onChange={handleChange} />

      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Mileage</FormLabel>
        <Input required type='number' placeholder='for example 60,90,95' value={obj.mileage} name="mileage" onChange={handleChange} />

      </FormControl>
      <FormControl mt={4}>
        <FormLabel>previous buyers</FormLabel>
        <Input required type='number' placeholder='for example 1,2,3' value={obj.Number_of_previous_buyers} name="Number_of_previous_buyers" onChange={handleChange} />

      </FormControl>


      <FormControl mt={4}>
        <FormLabel>Registration </FormLabel>
        <Input required type='text' placeholder='for example city.. banglore' value={obj.Registration_Place} name="Registration_Place" onChange={handleChange} />

      </FormControl>
      <FormControl mt={4}>
        <FormLabel>KMs Odometer</FormLabel>
        <Input required type='number' placeholder='for example 12000,15000....' value={obj.KMs_on_Odometer} name="KMs_on_Odometer" onChange={handleChange} />

      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Major Scratches</FormLabel>
        <Input required type='number' placeholder='for example 1,2..' value={obj.Major_Scratches} name="Major_Scratches" onChange={handleChange} />

      </FormControl>
      <FormControl mt={4}>
        <FormLabel>price</FormLabel>
        <Input required type='number' placeholder='for example Rs-500000,110000' value={obj.price} name="price" onChange={handleChange} />

      </FormControl>
      <Button isLoading={load} w='100%' bg="black" color='white' mt='30px' _hover={{ bg: 'teal' }} type='submit' >Post Car</Button>
    </form>
  </Flex>
}