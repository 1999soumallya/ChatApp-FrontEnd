import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

export default function UserBadgeItem({ users, handleFunction }) {
    return (
        <>
            <Box px={2} py={1} borderRadius={"lg"} m={1} mb={2} fontSize={12} background={"purple"} color={"white"} cursor={"pointer"} onClick={handleFunction}>
                {users.name}
                <CloseIcon pl={1} />
            </Box>
        </>
    )
}
