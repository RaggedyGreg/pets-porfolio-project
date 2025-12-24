import { Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

export const NoMatch = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>{t("noMatch.text")}</h2>
      <Link href="/">{t("noMatch.link")}</Link>
    </Box>
  );
};
