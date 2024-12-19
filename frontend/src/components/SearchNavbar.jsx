import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup
        style={{
          borderRadius: "25px",
          overflow: "hidden",
          width: "500px",
          height: "50px",
        }}
      >
        <InputGroup.Text
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "gray",
          }}
        >
          
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Search..."
          aria-label="Search"
          
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: "2px solid lightgray",
             
            height: "100%",
            
          }}
        />
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
