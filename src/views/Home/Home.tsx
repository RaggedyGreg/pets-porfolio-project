import { notFound } from "../../icons/icons";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import {
  PetPaginationModel,
  PetSortModel,
  SortOptions,
} from "../../interfaces/interfaces";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  TableSortLabel,
  Stack,
} from "@mui/material";

import variables from "../../scss/variables.module.scss";
import { useNavigate } from "react-router-dom";
import { chooseImage } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { PetOfTheDay } from "./PetOfTheDay";

const PAGINATION_MODEL_STORAGE = "paginationModel";
const SORT_MODEL_STORAGE = "sortModel";

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [paginationModel, setPaginationModel] = useState<PetPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [sortModel, setSortModel] = useState<PetSortModel>({
    sortField: "",
    sortOrder: "desc",
  });
  const { data, loading, error } = useFetch(
    "https://my-json-server.typicode.com/Feverup/fever_pets_data/pets",
    paginationModel,
    sortModel
  );

  useEffect(() => {
    const storedSortModel = sessionStorage.getItem(SORT_MODEL_STORAGE);
    const storedPaginationModel = sessionStorage.getItem(
      PAGINATION_MODEL_STORAGE
    );
    if (storedSortModel) {
      setSortModel(JSON.parse(storedSortModel));
    }
    if (storedPaginationModel) {
      setPaginationModel(JSON.parse(storedPaginationModel));
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newpage: number
  ) => {
    const newPaginationModel = { ...paginationModel, page: newpage };
    setPaginationModel(newPaginationModel);
    sessionStorage.setItem(
      PAGINATION_MODEL_STORAGE,
      JSON.stringify(newPaginationModel)
    );
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newPaginationModel = { page: 0, pageSize: event.target.value };
    setPaginationModel(newPaginationModel);
    sessionStorage.setItem(
      PAGINATION_MODEL_STORAGE,
      JSON.stringify(newPaginationModel)
    );
  };

  const handleClickRow = (id: number) => {
    navigate(`detail/${id}`);
  };

  const handleSort = (field: string) => {
    if (sortModel.sortField !== field) {
      sortModel.sortOrder = "desc";
    }
    const order: SortOptions = sortModel.sortOrder === "asc" ? "desc" : "asc";

    const newSortOrder = {
      sortField: field,
      sortOrder: order,
    };

    setSortModel(newSortOrder);
    sessionStorage.setItem(SORT_MODEL_STORAGE, JSON.stringify(newSortOrder));
  };

  const createSortLabel = (field: string, label: string) => (
    // const direction = sortModel.sortField === field ? sortModel.sortOrder : "asc";
    <TableSortLabel
      active={sortModel.sortField === field}
      direction={sortModel.sortField === field ? sortModel.sortOrder : "asc"}
      onClick={() => handleSort(field)}
    >
      {label}
    </TableSortLabel>
  );

  return loading ? (
    <CircularProgress />
  ) : (
    <Stack pt={2} spacing={2}>
      <PetOfTheDay maxPets={data?.totalCount || 0} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {createSortLabel("name", t("home.table.header.name"))}
              </TableCell>
              <TableCell>
                {createSortLabel("kind", t("home.table.header.kind"))}
              </TableCell>
              <TableCell>
                {createSortLabel("weight", t("home.table.header.weight"))}
              </TableCell>
              <TableCell>
                {createSortLabel("height", t("home.table.header.height"))}
              </TableCell>
              <TableCell>
                {createSortLabel("length", t("home.table.header.length"))}
              </TableCell>
              <TableCell>
                {createSortLabel("photo", t("home.table.header.photo"))}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data?.rows.map((row) => (
                <TableRow
                  onClick={() => handleClickRow(row.id)}
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: variables.hoverColor,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <img alt="Pet" height={30} src={chooseImage(row.kind)} />
                  </TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.height}</TableCell>
                  <TableCell>{row.length}</TableCell>
                  <TableCell>
                    <img
                      alt="Pet"
                      height={60}
                      src={row.photo_url}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = notFound;
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 15, 25]}
        count={data?.totalCount || 0}
        page={paginationModel.page}
        rowsPerPage={paginationModel.pageSize}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};
