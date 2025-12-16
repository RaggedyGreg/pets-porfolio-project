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
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import { isCat, isBird } from "../../interfaces/interfaces";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useFetchDetail } from "../../hooks/useFetchDetail";
import { notFound } from "../../icons/icons";
import { chooseImage } from "../../utils/utils";
import { Health } from "../../components/Health/Health";
import { endpoints } from "../../config/api";

const Detail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetchDetail(
    endpoints.getPetDetail(id || '')
  );

  return !data && loading ? (
    <CircularProgress />
  ) : error || !data ? (
    <Box p={3}>
      <Alert severity="error">
        <AlertTitle>{t("detail.error.title", "Pet Not Found")}</AlertTitle>
        {t(
          "detail.error.message",
          "We couldn't find the pet you're looking for. It may have been removed or the ID is incorrect."
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/")}>
            {t("detail.error.backHome", "Back to Home")}
          </Button>
        </Box>
      </Alert>
    </Box>
  ) : (
    <>
      <Box 
        onClick={() => navigate(`/`)} 
        sx={{ cursor: "pointer" }} 
        p={1}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && navigate('/')}
        aria-label={t("detail.backToHome", "Go back to home page")}
      >
        <Avatar>
          <ArrowBack />
        </Avatar>
      </Box>
      <Grid container p={3} spacing={2} component="main" aria-label={t("detail.mainContent", "Pet details")}>
        <Grid item md={6} textAlign="center">
          <img
            data-testid="bigImage"
            alt={t("detail.imageAlt", "Photo of {{name}}", { name: data?.name })}
            height={200}
            src={data?.photo_url}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = notFound;
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4" component="h1" id="pet-name">
            {data?.name}
          </Typography>
          <List sx={{ flexFlow: "column wrap" }} aria-labelledby="pet-name">
            <ListItem>
              <ListItemText primary={t("detail.weight")} secondary={data?.weight} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("detail.height")}  secondary={data?.height} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("detail.length")} secondary={data?.length} />
            </ListItem>
            {isCat(data) && (
              <ListItem>
                <ListItemText
                  primary={t("detail.numberOfLives")}
                  secondary={data.number_of_lives}
                />
              </ListItem>
            )}
            {isBird(data) && (
              <>
                <ListItem>
                  <ListItemText
                    primary={t("detail.wingspan")}
                    secondary={`${data.wingspan} cm`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={t("detail.numOfFeathers")}
                    secondary={data.num_of_feathers}
                  />
                </ListItem>
              </>
            )}
            <ListItem>
              <ListItemText
                primary={t("detail.description")}
                secondary={data?.description}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={t("detail.kind")}
                secondary={<img data-testid="kindImage"
                alt="Pet" height={30}
                src={chooseImage(data?.kind)}
              />} />
            </ListItem>
            <ListItem>
              <ListItemText 
                data-testid="health"
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

export default Detail;
