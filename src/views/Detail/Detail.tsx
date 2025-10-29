import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Avatar,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useFetchDetail } from "../../hooks/useFetchDetail";
import { notFound } from "../../icons/icons";
import { chooseImage } from "../../utils/utils";
import { NoMatch } from "../NoMatch";
import { Health } from "../../components/Health/Health";

export const Detail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetchDetail(
    `https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/${id}`
  );

  return !data && loading ? (
    <CircularProgress />
  ) : error || !data ? (
    <NoMatch />
  ) : (
    <>
      <Box onClick={() => navigate(`/`)} sx={{ cursor: "pointer" }} p={1}>
        <Avatar>
          <ArrowBack />
        </Avatar>
      </Box>
      <Grid container p={3} spacing={2}>
        <Grid item md={6} textAlign="center">
          <img
          role="bigImage"
            data-testid="bigImage"
            alt="Pet"
            height={200}
            src={data?.photo_url}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = notFound;
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4" component="div">
            {data?.name}
          </Typography>
          <List sx={{ flexFlow: "column wrap" }}>
            <ListItem>
              <ListItemText primary={t("detail.weight")} secondary={data?.weight} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("detail.height")}  secondary={data?.height} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("detail.length")} secondary={data?.length} />
            </ListItem>
            {data?.number_of_lives && (
              <ListItem>
                <ListItemText
                  primary={t("detail.numberOfLives")}
                  secondary={data?.number_of_lives}
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemText
                primary={t("detail.description")}
                secondary={data?.description}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("detail.kind")} secondary={<img data-testid="kindImage" alt="Pet" height={30} src={chooseImage(data?.kind)} />} />
            </ListItem>
            <ListItem>
              <ListItemText 
                role="health"
                primary={t("detail.health")}
                secondary={<Health pet={data}/>}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};
