import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { RegistractionAction } from '../../Redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [show, setshow] = useState({ password: false, confirmPassword: false })
  const [Loader, setLoader] = useState(false)
  const [UploadUrl, setUploadUrl] = useState("")

  const { register, handleSubmit, reset, clearErrors, formState: { errors }, setError, getValues } = useForm()

  const toast = useToast()

  const navigate = useNavigate()

  const { loading, userInfo, error } = useSelector((state) => state.registerDetails)

  useEffect(() => {
    setLoader(loading)
    if (userInfo) {
      reset()
      clearErrors()
      toast({ title: userInfo.message, status: "success", duration: 5000, isClosable: true, position: "bottom" })
      navigate("/chats")
    }

    if (error) {
      toast({ title: error.message, status: "error", duration: 5000, isClosable: true, position: "bottom" })
    }
  }, [clearErrors, error, loading, navigate, reset, toast, userInfo])


  const dispatch = useDispatch()

  const handleEmailValidation = (email) => {
    const isValid = EmailValidator.validate(email.target.value);
    if (!isValid) {
      setError("email", { message: "Please Insert a valid email address", type: 'required' })
    } else {
      setError("email")
    }
  };

  const handlePasswordValidation = () => {
    if (getValues("password") !== getValues("confirmpassword")) {
      setError("confirmpassword", { message: "Password are not matched", type: 'required' })
    } else {
      setError("confirmpassword")
    }
  }

  const UploadImage = (pic) => {
    setLoader(true)
    if (pic === undefined) {
      toast({ title: "Please Select an Image!", status: "warning", duration: 5000, isClosable: true, position: "bottom" })
      return
    }

    if (pic.type.split("/")[0] === "image") {
      const deta = new FormData()
      deta.append("file", pic)
      deta.append("upload_preset", "chat_app")
      deta.append("cloud_name", "dv2rk4htu")
      axios.post(`https://api.cloudinary.com/v1_1/dv2rk4htu/image/upload`, deta).then((response) => {
        if (response) {
          setUploadUrl(response.data.url.toString());
          setLoader(false)
        }
      }).catch((error) => {
        console.log(error.response);
        setLoader(false)
        toast({ title: "Image Upload Failed!", status: "error", duration: 5000, isClosable: true, position: "bottom" })
      })
    } else {
      toast({ title: "Please Select an Image!", status: "warning", duration: 5000, isClosable: true, position: "bottom" })
    }
  }

  const formSubmit = (data) => {
    if (getValues("password") !== getValues("confirmpassword")) {
      toast({ title: "Password are not matched", status: "error", duration: 5000, isClosable: true, position: "bottom" })
      return
    }
    
    if (!EmailValidator.validate(getValues("email"))) { 
      toast({ title: "Password are not matched", status: "error", duration: 5000, isClosable: true, position: "bottom" })
      return
    }

    if (UploadUrl !== "") {
      data["picture"] = UploadUrl
    }
    dispatch(RegistractionAction(data))
  }

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <VStack spacing={"5px"}>
        <FormControl id='name'>
          <FormLabel> Name </FormLabel>
          <Input placeholder='Enter Your Name ...' {...register("name", { required: "Please Insert Your Name" })} />
          {errors.name && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.name.message}</Text>}
        </FormControl>
        <FormControl id='email'>
          <FormLabel> Email </FormLabel>
          <Input type="email" placeholder='Enter Your Email ...' {...register("email", { required: "Please Insert Your Email Address", onChange: handleEmailValidation })} />
          {errors.email && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.email.message}</Text>}
        </FormControl>
        <FormControl id='password'>
          <FormLabel> Password </FormLabel>
          <InputGroup>
            <Input type={show.password ? "text" : "password"} placeholder='Enter Your Password ...' {...register("password", { required: "Please Insert Your Password", onChange: handlePasswordValidation })} />
            <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size={"sm"} onClick={() => setshow({ ...show, "password": !show.password })}>{show.password ? "Hide" : "Show"}</Button></InputRightElement>
          </InputGroup>
          {errors.password && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.password.message}</Text>}
        </FormControl>
        <FormControl id='confirmpassword'>
          <FormLabel> Confirm Password </FormLabel>
          <InputGroup>
            <Input type={show.confirmPassword ? "text" : "password"} placeholder='Enter Your Password ...' {...register("confirmpassword", { required: "Please Insert Your Password", onChange: handlePasswordValidation })} />
            <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size={"sm"} onClick={() => setshow({ ...show, "confirmPassword": !show.confirmPassword })}>{show.confirmPassword ? "Hide" : "Show"}</Button></InputRightElement>
          </InputGroup>
          {errors.confirmpassword && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.confirmpassword.message}</Text>}
        </FormControl>
        <FormControl id='picture'>
          <FormLabel> Upload Your Picture </FormLabel>
          <InputGroup>
            <Input type={'file'} p={1.5} accept="image/" onChange={(e) => UploadImage(e.target.files[0])} />
          </InputGroup>
          {errors.file && <span>This is not a valid image</span>}
        </FormControl>
        <Button colorScheme="blue" isLoading={Loader} width={"100%"} style={{ "marginTop": "15px" }} type="submit">Sign Up</Button>
      </VStack>
    </form>
  )
}
