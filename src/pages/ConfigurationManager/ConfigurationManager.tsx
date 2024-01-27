import classes from "./ConfigurationManager.module.scss";
import { Box } from "@mui/material";
import { AddCompanyForm } from "../../components/form/AddCompanyForm/AddCompanyForm";
import { AddCategoryForm } from "../../components/form/AddCategoryForm/AddCategoryForm";
import { AddJobTitleForm } from "../../components/form/AddJobTitleForm/AddJobTitleForm";

const ConfigurationManager = () => {
  return (
    <Box className={classes.container}>
      <AddCompanyForm />
      <AddCategoryForm />
      <AddJobTitleForm />
    </Box>
  );
};

export default ConfigurationManager;
