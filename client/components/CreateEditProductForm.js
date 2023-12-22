import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Input,
  Center,
  VStack,
  Textarea,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../styles";
import { createProduct, editProduct, getProduct } from "../store/product";
function CreateEditProductForm({
  createProduct,
  match,
  singleProduct,
  getProduct,
  editProduct,
}) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (match.params.id) getProduct(match.params.id);
  }, []);

  useEffect(() => {
    if (match.params.id && +match.params.id === +singleProduct.id) {
      if (singleProduct.description === null) singleProduct.description = "";
      setProduct({
        name: singleProduct.name,
        price: `${singleProduct.price}`,
        imageUrl: singleProduct.imageUrl,
        description: singleProduct.description,
      });
    }
  }, [singleProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, imageUrl, description } = product;
    if (match.path.includes("create")) {
      if (!name.trim() && !price.trim() && !imageUrl.trim()) {
        setError(true);
        return;
      }
      setError(false);
      createProduct({ name, price, imageUrl, description });
    } else {
      editProduct(singleProduct.id, { name, price, imageUrl, description });
    }
  };
  return (
    <Center>
      <VStack as="form" spacing="1rem" width="70%" onSubmit={handleSubmit}>
        <Input
          {...inputStyle}
          placeholder="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <NumberInput min={0.01} width="100%" value={product.price}>
          <NumberInputField
            {...inputStyle}
            placeholder="$ Price"
            name="price"
            onChange={handleChange}
          />
        </NumberInput>
        <Input
          {...inputStyle}
          placeholder="Image Url"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />
        <Textarea
          {...inputStyle}
          placeholder="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <Box as="button" type="submit" {...buttonStyle()}>
          Submit
        </Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>
              Please provide proper inputs for the name, price, and image
            </AlertTitle>
          </Alert>
        )}
      </VStack>
    </Center>
  );
}
const mapStateToProps = (state) => ({
  singleProduct: state.product.singleProduct,
});
export default connect(mapStateToProps, {
  createProduct,
  editProduct,
  getProduct,
})(CreateEditProductForm);
