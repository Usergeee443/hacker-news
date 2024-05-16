import { Button, CircularProgress, Input, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchOnButton, setSearchOnButton] = useState(false);

  useEffect(() => {
    if (searchOnButton) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
          setData(response.data.hits);
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      };

      if (query !== "") {
        fetchData();
      }
      setSearchOnButton(false);
    }
  }, [query, searchOnButton]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchOnButton(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        Hacker news
      </Typography>
      <div style={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          sx={{ mr: 1, background: "#ffffff", borderRadius: "4px", paddingLeft: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearchButtonClick} sx={{ borderRadius: "4px" }}>
          Search
        </Button>
      </div>
      {isLoading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
          Error: {error.message}
        </Typography>
      )}
      <List sx={{ width: "100%", maxWidth: 600 }}>
        {data.map((item) => (
          <ListItem key={item.objectID} sx={{ background: "#ffffff", borderRadius: "4px", mb: 1 }}>
            <ListItemText
              primary={
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#333333", textDecoration: "underLine" }}
                >
                  {item.title}
                </a>
              }
              secondary={`by ${item.author}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default HomePage;
