import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginAction } from '../../Redux/Action/UserAction'

export default function Login() {
  const [show, setshow] = useState(false)
  const [Loader, setLoader] = useState(false)
  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm()

  const dispatch = useDispatch()
  const { loading, userInfo, error } = useSelector((state) => state.loginDetails)

  const navigate = useNavigate()

  const toast = useToast()

  useEffect(() => {
    setLoader(loading)
    if (userInfo?.message) {
      toast({ title: userInfo.message, status: "success", duration: 5000, isClosable: true, position: "bottom" })
    }

    if (userInfo) {
      navigate("/chats")
    }

    if (error) {
      toast({ title: error.message, status: "error", duration: 5000, isClosable: true, position: "bottom" })
    }
  }, [error, loading, navigate, toast, userInfo])
  

  const formSubmit = (data) => {
    dispatch(LoginAction(data))
    reset()
    clearErrors()
  }

  const GuestLogin = (e) => {
    e.preventDefault()
    dispatch(LoginAction({ email: "guest@example.com", password: "12345678" }))
  }

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <VStack spacing={"5px"}>
          <FormControl id='login_email'>
            <FormLabel> Email </FormLabel>
            <Input type="text" placeholder='Enter Your Email ...' {...register("email", { required: "Please Insert Your Email Address" })} />
            {errors.email && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.email.message}</Text>}
          </FormControl>
          <FormControl id='login_password'>
            <FormLabel> Password </FormLabel>
            <InputGroup>
              <Input type={show ? "text" : "password"} placeholder='Enter Your Password ...' {...register("password", { required: "Please Insert Your Password" })} />
              <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size={"sm"} onClick={() => setshow(!show)}>{show ? "Hide" : "Show"}</Button></InputRightElement>
            </InputGroup>
            {errors.password && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.password.message}</Text>}
          </FormControl>
          <Button colorScheme="blue" isLoading={Loader} width={"100%"} style={{ "marginTop": "15px" }} type="submit">Login</Button>
        </VStack>
      </form>
      <Button colorScheme="red" disabled={Loader} variant={"solid"} width={"100%"} style={{ "marginTop": "15px" }} onClick={GuestLogin}>Get Guest User Credentials</Button>
    </>
  )
}
