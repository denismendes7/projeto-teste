import { useContext } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import { CountryContext } from "../Contexts/Context";
import { useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

function Details() {
  const navigate = useNavigate();

  const { countriesToShow: countries } = useContext(CountryContext);
  const { id } = useParams();

  const goToHome = () => {
    navigate(`/countries/`);
  };

  const country = countries.find((country) => country.id === id) || {};

  return (
    <>
      <Header />
      <main>
        <Grid
          container
          justifyContent={"space-between"}
          style={{
            marginTop: 20,
          }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h4">
              <Button onClick={goToHome}>
                <ArrowBack color="black" />
              </Button>
              <strong>Details of Countries</strong>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          xs={6}
          sm={6}
          md={6}
          style={{
            marginTop: 20,
          }}
        >
          <Grid item>
            <CardMedia
              sx={{
                height: 270,
                marginLeft: 5,
                marginTop: 3,
              }}
            >
              <img
                src={country.flag}
                width={"100%"}
                height={200}
                alt={country.name}
                loading="lazy"
              />
            </CardMedia>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div" padding={3}>
              <strong>{country.name}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" padding={2}>
              <strong>Capital: </strong> {country.capital}
            </Typography>
            <Typography variant="body2" color="text.secondary" padding={2}>
              <strong>População: </strong>
              {country.population}
            </Typography>
            <Typography variant="body2" color="text.secondary" padding={2}>
              <strong>Região: </strong>
              {country.region}
            </Typography>
            <Typography variant="body2" color="text.secondary" padding={2}>
              <strong>Liguagem: </strong>
              {country.languages}
            </Typography>
            <Typography variant="body2" color="text.secondary" padding={2}>
              <strong>Moeda: </strong>
              {country.currencies}
            </Typography>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Details;
