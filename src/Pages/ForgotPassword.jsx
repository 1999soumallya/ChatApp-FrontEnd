import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const [Loader, setLoader] = useState(false)
    const [show, setshow] = useState({ password: false, confirmPassword: false })


    const { register, handleSubmit, reset, clearErrors, formState: { errors }, setValue, getValues, setError } = useForm()
    const toast = useToast()

    useEffect(() => {
        setValue("email", sessionStorage.getItem("loginemail"))
    }, [setValue])


    const RemoveSession = () => {
        sessionStorage.removeItem("loginemail")
    }

    const formSubmit = (data) => {
        if (getValues("password") !== getValues("confirmpassword")) {
            toast({ title: "Password are not matched", status: "error", duration: 5000, isClosable: true, position: "bottom" })
            return
        }
        reset()
        clearErrors()
    }

    const handlePasswordValidation = () => {
        if (getValues("password") !== getValues("confirmpassword")) {
            setError("confirmpassword", { message: "Password are not matched", type: 'required' })
        } else {
            setError("confirmpassword")
        }
    }


    return (
        <>
            <Container maxW={"xl"} centerContent>
                <Box display={"flex"} justifyContent={"center"} p={3} bg={"white"} w={"100%"} m={"40px 0 15px 0"} borderRadius={"lg"} borderWidth={"1px"}>
                    <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"black"}> Talk-A-Tive </Text>
                </Box>
                <Box bg={"white"} w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"} color={"black"} >
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <VStack spacing={"5px"}>
                            <FormControl>
                                <FormLabel> Email </FormLabel>
                                <Input type="text" disabled placeholder='Enter Your Email ...' {...register("email", { required: "Please Insert Your Email Address" })} />
                                {errors.email && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.email.message}</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel> Password </FormLabel>
                                <InputGroup>
                                    <Input type={show.password ? "text" : "password"} placeholder='Enter Your Password ...' {...register("password", { required: "Please Insert Your Password", onChange: handlePasswordValidation })} />
                                    <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size={"sm"} onClick={() => setshow({ ...show, "password": !show.password })}>{show.password ? "Hide" : "Show"}</Button></InputRightElement>
                                </InputGroup>
                                {errors.password && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.password.message}</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel> Confirm Password </FormLabel>
                                <InputGroup>
                                    <Input type={show.confirmPassword ? "text" : "password"} placeholder='Enter Your Password ...' {...register("confirmpassword", { required: "Please Insert Your Password", onChange: handlePasswordValidation })} />
                                    <InputRightElement width={"4.5rem"}><Button h={"1.75rem"} size={"sm"} onClick={() => setshow({ ...show, "confirmPassword": !show.confirmPassword })}>{show.confirmPassword ? "Hide" : "Show"}</Button></InputRightElement>
                                </InputGroup>
                                {errors.confirmpassword && <Text color={"red"} fontWeight={"bold"} fontFamily={"Work sans"}>{errors.confirmpassword.message}</Text>}
                            </FormControl>
                            <Box display={"flex"} justifyContent={"right"} w={"100%"} color={"blue"}>
                                <Link to={"/"} onClick={RemoveSession}> Login User </Link>
                            </Box>
                            <Button colorScheme="blue" isLoading={Loader} width={"100%"} style={{ "marginTop": "10px" }} type="submit">Reset Password</Button>
                        </VStack>
                    </form>
                </Box>
            </Container>
        </>
    )
}
