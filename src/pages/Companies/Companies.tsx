import DataTable from "../../components/dataTable/DataTable";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { useCallback, useMemo, useState } from "react";
import { EditIcon, TrashIcon } from "../../components/ui/Icons";
import { useAppDispatch } from "../../store";
import { Box } from "@mui/material";
import { CompanyModel } from "../../store/categoryManager/categoryManager-state";
import { categoryManagerActions } from "../../store/categoryManager/categoryManager.actions";
import { companiesColumns } from "../../columns/companies.column";
import { AddCompanyModal } from "../../components/modals/AddCompanyModal/AddCompanyModal";
import { AddCompanyFormType } from "../../form/schemas/addCompanySchema";
import { ApiResponse } from "../../models/base/api-base";
import { UpdateCompanyResponse } from "../../models/company/update/updateCompany.response";

const Companies = () => {
  const { companies } = useSelector(categoryManagerSelectors.categoryManager());
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel | null>(
    null
  );
  const dispatch = useAppDispatch();

  const handleRemoveCountry = useCallback(async (company: CompanyModel) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(categoryManagerActions.removeCompanyThunk(company._id));
  }, []);

  const handleEditCountry = useCallback(
    async (form: AddCompanyFormType) => {
      if (!selectedCompany) return;

      const company = {
        ...form,
        _id: selectedCompany._id,
        img: selectedCompany.img,
      };

      const response = (await (
        await dispatch(categoryManagerActions.updateCompanyThunk(company))
      ).payload) as ApiResponse<UpdateCompanyResponse>;

      if (!response.isSucceeded || !response.data?.content) return;
      handleClose();
    },
    [selectedCompany]
  );

  const handleClose = useCallback(() => {
    setSelectedCompany(null);
  }, []);

  const actionColumns = useMemo((): ActionColumn<CompanyModel>[] => {
    return [
      {
        actionFunction: handleRemoveCountry,
        icon: <TrashIcon />,
      },
      {
        actionFunction: (company) => setSelectedCompany(company),
        icon: <EditIcon />,
      },
    ];
  }, [handleRemoveCountry]);

  return (
    <Box>
      <AddCompanyModal
        handleSubmit={handleEditCountry}
        handleClose={handleClose}
        open={!!selectedCompany}
        selectedCompany={selectedCompany}
      />
      <DataTable
        slug="companies"
        columns={companiesColumns}
        rows={companies}
        pageSize={50}
        actions={actionColumns}
      />
    </Box>
  );
};

export default Companies;
