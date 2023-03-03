import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DoorDashFavorite from "../components/DoorDashFavorite";
import Header from "../components/Header";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";

function Details() {
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

  const goToHome = () => () => {
    navigate(`/countries/`);
  };
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <Header />
      <main>
        <Grid
          container
          // spacing={{ xs: 3, md: 1 }}
          // columns={{ xs: 1, sm: 2, md: 8 }}
        >
          <Grid item xs={3} sm={4} md={4}>
            <Typography style={{ margin: 20 }}>
              {" "}
              <h1>Details of Countries</h1>
            </Typography>
          </Grid>

          <Grid
            item
            xs={2}
            sm={4}
            md={8}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              style={{
                display: "flex",
                width: 150,
                justifyItems: "flex-end",
                margin: 30,
                backgroundColor: "black",
                color: "white",
              }}
              onClick={goToHome()}
            >
              Back
            </Button>
          </Grid>

          {loading ? (
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 6, sm: 12, md: 16 }}
            >
              {items.map(() => (
                <Grid item xs={3} sm={4} md={4}>
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
                        maxWidth: 350,
                        height: 200,
                        textAlign: "center",
                        borderRadius: 50,
                        boxShadow: 5,
                      }}
                      key={country.id}
                      onClick={goToDetail(country.id)}
                    >
                      <CardMedia sx={{ height: 230, borderRadius: 10 }}>
                        <img
                          src={country.flag}
                          width={350}
                          height={230}
                          alt={country.name}
                          loading="lazy"
                        />
                      </CardMedia>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
      </main>
    </>
  );
}

export default Details;
