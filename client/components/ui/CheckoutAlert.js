import React from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export default function CheckoutAlert({
  isOpen,
  onClose,
  userId,
  subTotal,
  handleCheckout,
}) {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {userId
              ? "Do you want to checkout now?"
              : "Create an account to checkout your current cart"}
          </AlertDialogHeader>

          <AlertDialogBody>
            Go do it. {userId && `You gotta pay $${subTotal}`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            {userId ? (
              <Button colorScheme="green" onClick={handleCheckout} ml={3}>
                Confirm
              </Button>
            ) : (
              <Button
                as={Link}
                to="/auth"
                onClick={onClose}
                ml={3}
                colorScheme="green"
              >
                Sign-up
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
