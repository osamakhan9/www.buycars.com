import { Box, ColorModeProvider, Flex, ThemeProvider, theme,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Button,
    Image,
    useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import { useState } from "react";
const init = {
    password:'',
    email:'',
    username :''
}
function Signup(){
    const [obj , setObj] = useState(init);
    const [load , setLoad] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {value , name} = e.target;
        setObj({...obj , [name]:value})
    }


    const handleSubmit = async(e)=>{
        setLoad(true)
        e.preventDefault();
        try {
            let res = await axios.post('https://buyc-car-backend.onrender.com/user/signup' , obj);
            let data = await res.data;
            console.log(data)
            if(data.status){
                setLoad(false)
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position:'top'
                  })
                  navigate('/login')
            }
            else{
                setLoad(false)
                toast({
                    title: 'Error Occured',
                    description: data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position:'top'
                  })
            }
        } catch (error) {
          setLoad(false);
          console.log(error)
            toast({
                title: 'Error Occured',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        }
    }
    return <ThemeProvider theme={theme}>
    <ColorModeProvider>
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
    <Box 
      px={4}
      width='full'
      maxWidth='500px'
      borderRadius='10px'
      textAlign='center'
    >
      <Box p={4}>
      <Box textAlign='center'>
        <Image borderRadius='50%'  maxW='100px' m='auto' mb='20px' src='https://png.pngtree.com/png-clipart/20210606/original/pngtree-sport-car-logo-vector-png-image_6398339.jpg' />
      <Heading color='black'>SIGN IN</Heading>
    </Box>
    <Box my={8} textAlign='left'>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <FormControl mt={4}>
          <FormLabel>Username</FormLabel>
          <Input required type='text' name='username' value={obj.username} onChange={(e)=>handleChange(e)} placeholder='Enter your username' />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input required type='email' name='email' value={obj.email} onChange={(e)=>handleChange(e)} placeholder='Enter your email address' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input required type='password' name='password' value={obj.password} onChange={(e)=>handleChange(e)} placeholder='Enter your password' />
        </FormControl>

        <Stack isInline justifyContent='right' mt={4} pr='10px'>
            <Box color='blue.300'>
              <Link to='/login' color={`teal.500`}>Allready Have an Account</Link>
            </Box>
        </Stack>

        <Button isLoading={load} type='submit' _hover={{bg:'teal'}}  bg='black' color='white'  width='full' mt={4}>SIGN UP</Button>
      </form>
    </Box>
      </Box>
    </Box>
    </Flex>
    </ColorModeProvider>
    </ThemeProvider>
}


export default Signup;