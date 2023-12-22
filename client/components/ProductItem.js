import React from "react";
import { Link } from "react-router-dom";
import {
  GridItem as Gi,
  VStack,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { deleteProduct } from "../store/product";
import ProductToCartBtn from "./ProductToCartBtn";

function ProductItem({ product, auth, deleteProduct, view = false }) {
  return (
    <Gi>
      <VStack
        spacing="10px"
        align="start"
        as={Link}
        to={`/products/${product.id}`}
      >
        <Image src={product.imageUrl} alt="tea image" />
        <Heading color="tea.matcha">{product.name}</Heading>

        {!view && <Text fontSize="lg">${product.price}</Text>}
      </VStack>

      {!view && (
        <HStack>
          <ProductToCartBtn
            marginTop="2"
            product={product}
            btnStyle="outline"
          />
          <Spacer />
          {auth.id && auth.role === "admin" && (
            <Button
              colorScheme="red"
              borderRadius="full"
              size="xs"
              onClick={() => deleteProduct(product.id)}
            >
              X
            </Button>
          )}
        </HStack>
      )}
    </Gi>
  );
}

export default connect(null, { deleteProduct })(ProductItem);
