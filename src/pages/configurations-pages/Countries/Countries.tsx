import TableBase from "../../../components/ui/table/TableBase/TableBase";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";
import { countriesColumn } from "../../../columns/countries.column";
import { ActionColumn } from "../../../components/ui/table/ActionColumnBase/ActionColumnBase";
import { CountryModel } from "../../../types/country.type";
import { useCallback, useMemo, useState } from "react";
import { EditIcon, TrashIcon } from "../../../components/ui/Icons";
import { useAppDispatch } from "../../../store";
import { categoryManagerActions } from "../../../store/categoryManager/categoryManager.actions";
import { Box } from "@mui/material";
import { AddCountryModal } from "../../../components/feature/modals/AddCountryModal/AddCountryModal";
import { AddCountryFormType } from "../../../form/schemas/addCountrySchema";
import { UpdateCountryRequest } from "../../../models/country/update/updateCountry.request";
import { UpdateCountryResponse } from "../../../models/country/update/updateCountry.response";
import { ApiResponse } from "../../../models/base/api-base";

export const Countries = () => {
  const { countries } = useSelector(categoryManagerSelectors.categoryManager());
  const [selectedCountry, setSelectedCountry] = useState<CountryModel | null>(
    null
  );
  const dispatch = useAppDispatch();

  const handleRemoveCountry = useCallback(async (country: CountryModel) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(categoryManagerActions.removeCountryThunk(country._id));
  }, []);

  const handleEditCountry = useCallback(
    async (form: AddCountryFormType) => {
      if (!selectedCountry) return;

      const request: UpdateCountryRequest = {
        ...form,
        _id: selectedCountry._id,
      };

      const response = (
        await dispatch(categoryManagerActions.updateCountryThunk(request))
      ).payload as ApiResponse<UpdateCountryResponse>;

      if (!response.isSucceeded || !response.data?.content) return;
      setSelectedCountry(null);
    },
    [selectedCountry]
  );

  const handleClose = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  const actionColumns = useMemo((): ActionColumn<CountryModel>[] => {
    return [
      {
        actionFunction: handleRemoveCountry,
        icon: <TrashIcon />,
      },
      {
        actionFunction: (country) => setSelectedCountry(country),
        icon: <EditIcon />,
      },
    ];
  }, [handleRemoveCountry]);

  return (
    <Box>
      <AddCountryModal
        open={!!selectedCountry}
        handleClose={handleClose}
        selectedCountry={selectedCountry}
        handleSubmit={handleEditCountry}
      />
      <TableBase
        slug="countries"
        columns={countriesColumn}
        rows={countries}
        pageSize={50}
        actions={actionColumns}
      />
    </Box>
  );
};
