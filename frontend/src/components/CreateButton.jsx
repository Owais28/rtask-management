import { Button, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

export default function CreateButton({ handleCreateModal }) {
  return (
    <Button colorScheme='orange' position={'fixed'} onClick={handleCreateModal} bottom={10} right={10} maxWidth={1000} mx={"auto"} >
      <Text fontSize={'xl'} >
        Create +
      </Text>
    </Button>
  )
}

CreateButton.propTypes = {
  handleCreateModal: PropTypes.func
}
