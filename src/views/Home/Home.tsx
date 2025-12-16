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
  Alert,
  AlertTitle,
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import variables from "../../scss/variables.module.scss";
import { useNavigate } from "react-router-dom";
import { chooseImage } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { PetOfTheDay } from "./PetOfTheDay";
import { endpoints } from "../../config/api";

const PAGINATION_MODEL_STORAGE = "paginationModel";
const SORT_MODEL_STORAGE = "sortModel";
const SEARCH_STORAGE = "searchQuery";
const FILTER_STORAGE = "petTypeFilter";

const Home = () => {
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [petTypeFilter, setPetTypeFilter] = useState<string[]>([]);
  const { data, loading, error } = useFetch(
    endpoints.getPets(),
    paginationModel,
    sortModel
  );

  useEffect(() => {
    const storedSortModel = sessionStorage.getItem(SORT_MODEL_STORAGE);
    const storedPaginationModel = sessionStorage.getItem(
      PAGINATION_MODEL_STORAGE
    );
    const storedSearch = sessionStorage.getItem(SEARCH_STORAGE);
    const storedFilter = sessionStorage.getItem(FILTER_STORAGE);
    
    if (storedSortModel) {
      setSortModel(JSON.parse(storedSortModel));
    }
    if (storedPaginationModel) {
      setPaginationModel(JSON.parse(storedPaginationModel));
    }
    if (storedSearch) {
      setSearchQuery(storedSearch);
    }
    if (storedFilter) {
      setPetTypeFilter(JSON.parse(storedFilter));
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    sessionStorage.setItem(SEARCH_STORAGE, query);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handleFilterToggle = (type: string) => {
    const newFilters = petTypeFilter.includes(type)
      ? petTypeFilter.filter((t) => t !== type)
      : [...petTypeFilter, type];
    
    setPetTypeFilter(newFilters);
    sessionStorage.setItem(FILTER_STORAGE, JSON.stringify(newFilters));
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  // Filter and search data
  const filteredData = data?.rows.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = petTypeFilter.length === 0 || petTypeFilter.includes(pet.kind);
    return matchesSearch && matchesFilter;
  }) || [];

  const filteredTotalCount = filteredData.length;

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">
        <AlertTitle>{t("home.error.title", "Error Loading Pets")}</AlertTitle>
        {t(
          "home.error.message",
          "Unable to load pets. Please check your connection and try again."
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
          >
            {t("home.error.retry", "Retry")}
          </Button>
        </Box>
      </Alert>
    </Box>
  ) : (
    <Stack pt={2} spacing={2}>
      <PetOfTheDay maxPets={data?.totalCount || 0} />
      
      {/* Search and Filter Section */}
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder={t("home.search.placeholder", "Search pets by name...")}
            value={searchQuery}
            onChange={handleSearchChange}
            inputProps={{
              'aria-label': t("home.search.ariaLabel", "Search pets by name"),
              'role': 'searchbox'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon aria-hidden="true" />
                </InputAdornment>
              ),
            }}
          />
          
          <Box 
            sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
            role="group"
            aria-label={t("home.filter.ariaLabel", "Filter pets by type")}
          >
            <FilterListIcon sx={{ color: "text.secondary" }} aria-hidden="true" />
            <Chip
              label={t("home.filter.dog", "Dogs")}
              onClick={() => handleFilterToggle("dog")}
              color={petTypeFilter.includes("dog") ? "primary" : "default"}
              variant={petTypeFilter.includes("dog") ? "filled" : "outlined"}
              aria-pressed={petTypeFilter.includes("dog")}
              aria-label={t("home.filter.dogAria", "Filter by dogs")}
            />
            <Chip
              label={t("home.filter.cat", "Cats")}
              onClick={() => handleFilterToggle("cat")}
              color={petTypeFilter.includes("cat") ? "primary" : "default"}
              variant={petTypeFilter.includes("cat") ? "filled" : "outlined"}
              aria-pressed={petTypeFilter.includes("cat")}
              aria-label={t("home.filter.catAria", "Filter by cats")}
            />
            <Chip
              label={t("home.filter.bird", "Birds")}
              onClick={() => handleFilterToggle("bird")}
              color={petTypeFilter.includes("bird") ? "primary" : "default"}
              variant={petTypeFilter.includes("bird") ? "filled" : "outlined"}
              aria-pressed={petTypeFilter.includes("bird")}
              aria-label={t("home.filter.birdAria", "Filter by birds")}
            />
            {(searchQuery || petTypeFilter.length > 0) && (
              <Chip
                label={t("home.filter.clear", "Clear All")}
                onClick={() => {
                  setSearchQuery("");
                  setPetTypeFilter([]);
                  sessionStorage.removeItem(SEARCH_STORAGE);
                  sessionStorage.removeItem(FILTER_STORAGE);
                }}
                variant="outlined"
                onDelete={() => {
                  setSearchQuery("");
                  setPetTypeFilter([]);
                  sessionStorage.removeItem(SEARCH_STORAGE);
                  sessionStorage.removeItem(FILTER_STORAGE);
                }}
                aria-label={t("home.filter.clearAria", "Clear all filters and search")}
              />
            )}
          </Box>
        </Stack>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={t("home.table.ariaLabel", "Pet list table")}>
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
              filteredData.map((row) => (
                <TableRow
                  onClick={() => handleClickRow(row.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleClickRow(row.id)}
                  key={row.name}
                  tabIndex={0}
                  role="button"
                  aria-label={t("home.table.rowAria", "View details for {{name}}", { name: row.name })}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: variables.hoverColor,
                    },
                    "&:focus": {
                      backgroundColor: variables.hoverColor,
                      outline: "2px solid",
                      outlineColor: "primary.main",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <img 
                      alt={t("home.table.kindIcon", "{{kind}} icon", { kind: row.kind })} 
                      height={30} 
                      src={chooseImage(row.kind)} 
                      aria-label={row.kind}
                    />
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
        count={filteredTotalCount}
        page={paginationModel.page}
        rowsPerPage={paginationModel.pageSize}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default Home;
