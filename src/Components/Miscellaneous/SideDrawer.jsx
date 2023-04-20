import React, { useRef, useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogoutAction } from '../../Redux/Action/UserAction'

export default function SideDrawer() {

    const [Search, setSearch] = useState("")
    // const [SearchResult, setSearchResult] = useState([])
    // const [Loading, setLoading] = useState(false)
    // const [LoadingChat, setLoadingChat] = useState()

    const { user } = ChatState()
    const nevigate = useNavigate()
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const toast = useToast()

    const loagoutHandlar = () => {
        dispatch(LogoutAction())
        nevigate("/")
    }

    const handleSearch = () => {
        if (Search === "") {
            toast({ title: "Please enter something in search", status: "warning", duration: 5000, isClosable: true, position: "top-left" })
            return
        }


    }

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} bg={"white"} w={"100%"} p={"5px 10px 5px 10px"} borderWidth={"5px"}>
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant={"ghost"} ref={btnRef} onClick={onOpen}>
                        <FontAwesomeIcon icon={faSearch} beatFade style={{ color: "#00fdff", }} />
                        <Text display={{ base: "none", md: "flex" }} px={"4"}>Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize={"2xl"} fontFamily={"Work sans"}>
                    Talk-A-Tive
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize={"2xl"} m={1} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.picture} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem> My Profile </MenuItem>
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={loagoutHandlar}> Logout </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth={"1px"}> Search Users </DrawerHeader>
                    <DrawerBody>
                        <Box display={"flex"} pb={2}>
                            <Input placeholder='Search by name or email' mr={2} value={Search} onChange={(e) => setSearch(e.target.value)} />
                            <Button variant={"solid"} colorScheme="blue" onClick={handleSearch} > Go </Button>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>

    )
}
