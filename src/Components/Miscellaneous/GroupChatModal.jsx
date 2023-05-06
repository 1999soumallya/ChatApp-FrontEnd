import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import { GetUserBySearchAction } from '../../Redux/Action/ChatAction'

export default function GroupChatModal({ children }) {

    const [GroupDetails, setGroupDetails] = useState({ groupName: "", groupUsers: [] })
    const [Search, setSearch] = useState("")
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(false)

    const toast = useToast()
    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { loading, users, error } = useSelector((state) => state.getUserBySearch)

    useEffect(() => {
        setLoading(loading)
        if (users) {
            if (users.users?.length > 0) {
                setSearchResult(users.users)
            } else {
                setSearchResult(users.message)
            }
        }
        if (error) {
            toast({ title: "Error occured!", description: error.message, status: "error", duration: 5000, isClosable: true, position: "bottom-left" })
        }
    }, [SearchResult, error, loading, toast, users])

    const handleSearch = () => {
        setSearchResult([])
        if (Search === "") {
            toast({ title: "Please enter something in search", status: "warning", duration: 5000, isClosable: true, position: "top-left" })
            return
        }
        dispatch(GetUserBySearchAction(Search))
    }


    return (
        <>
            {
                children && (<span onClick={onOpen}> {children} </span>)
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Lorem count={2} /> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
