import classes from "./ConfigurationManager.module.scss";
import { Box } from "@mui/material";
import { AddCompanyForm } from "../../components/form/ConfigurationManagerForm/AddCompanyForm/AddCompanyForm";
import { AddCategoryForm } from "../../components/form/ConfigurationManagerForm/AddCategoryForm/AddCategoryForm";
import { AddJobTitleForm } from "../../components/form/ConfigurationManagerForm/AddJobTitleForm/AddJobTitleForm";
import { AddCountryForm } from "../../components/form/ConfigurationManagerForm/AddCountryForm/AddCountryForm";
import { Outlet } from "react-router-dom";

const ConfigurationManager = () => {
  return (
    <Box className={classes.container}>
      <Outlet />
      {/* <AddCompanyForm />
      <AddCategoryForm />
      <AddJobTitleForm />
      <AddCountryForm /> */}
    </Box>
  );
};

export default ConfigurationManager;
