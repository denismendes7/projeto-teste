import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DoorDashFavorite from "../components/DoorDashFavorite";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadCountries = useCallback(() => {
    setLoading(true);
    api
      .get("/all/")
      .then((response) => {
        console.log(response);
        setCountries(
          response.data.map((item) => {
            return {
              ...item,
              id: item.cioc,
            };
          })
        );
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const goToDetail = (id) => () => {
    navigate(`/countries/${id}`);
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <main>
        <Grid
          container
          // spacing={{ xs: 3, md: 1 }}
          // columns={{ xs: 1, sm: 2, md: 8 }}
        >
          <div>
            <h1>
              <Typography style={{ margin: 20 }}>
                <h1>List of Countries</h1>
              </Typography>
            </h1>

            {loading ? (
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 16 }}
              >
                {items.map(() => (
                  <Grid item xs={1} sm={4} md={4}>
                    <DoorDashFavorite />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 4, md: 8 }}
                  columns={{ xs: 6, sm: 12, md: 16 }}
                >
                  {countries.map((country) => (
                    <Grid item xs={3} sm={4} md={4}>
                      <Card
                        sx={{
                          maxWidth: 300,
                          height: 320,
                          textAlign: "center",
                          borderRadius: 2,
                          boxShadow: 5,
                        }}
                        key={country.id}
                        onClick={goToDetail(country.id)}
                      >
                        <CardMedia sx={{ height: 200, borderRadius: 10 }}>
                          <img
                            src={country.flag}
                            width={"100%"}
                            height={200}
                            alt={country.name}
                            loading="lazy"
                          />
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {country.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {country.capital}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </div>
        </Grid>
      </main>
    </>
  );
}

export default Home;
