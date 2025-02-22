import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Pagination = ({ page, limit, handlePrev, handleNext }) => {
  const [nextPageLength, setNextPageLength] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products?_page=${page + 1}&_limit=${limit}`)
      .then((res) => {
        setNextPageLength(res.data.length);
      })
      .catch((err) => {
        console.log("something went wrong in getting products:", err);
      });
  }, [page, limit]);

  const prev = (
    <Button
      onClick={handlePrev}
      isDisabled={page === 1}
      bgColor={"brand"}
      color={"white"}
      _hover={{ backgroundColor: "#0076cecc" }}
    >
      Previous
    </Button>
  );
  const next = (
    <Button
      onClick={handleNext}
      isDisabled={nextPageLength <= 0}
      bgColor={"brand"}
      color={"white"}
      _hover={{ backgroundColor: "#0076cecc" }}
    >
      Next
    </Button>
  );

  return (
    <Flex gap={2} my={4}>
      {prev}
      <Button>{page}</Button>
      {next}
    </Flex>
  );
};

export default Pagination;
