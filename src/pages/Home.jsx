import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DoorDashFavorite from "../components/DoorDashFavorite";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CountryContext } from "../Contexts/Context";
import Header from "../components/Header";

function Home({ props }) {
  const navigate = useNavigate();

  const { countriesToShow: countries, loading } = useContext(CountryContext);

  console.log("countries", countries);

  const goToDetail = (id) => () => {
    navigate(`/countries/${id}`);
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <Header showSearch={true} />
      <main
        style={{
          padding: 10,
        }}
      >
        <Grid container>
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
                {items.map((id) => (
                  <Grid item xs={1} sm={4} md={4} key={id}>
                    <DoorDashFavorite />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={{ xs: 6, sm: 12, md: 16 }}>
                  {countries.map((country) => (
                    <Grid item key={country.id}>
                      <Card
                        sx={{
                          maxWidth: 300,
                          height: 320,
                          textAlign: "center",
                          borderRadius: 2,
                          boxShadow: 5,
                          cursor: "pointer",
                        }}
                        key={country.id}
                        onClick={goToDetail(country.id)}
                      >
                        <CardMedia sx={{ height: 200 }}>
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
