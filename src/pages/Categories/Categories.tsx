import DataTable from "../../components/dataTable/DataTable";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { useCallback, useMemo, useState } from "react";
import { EditIcon, TrashIcon } from "../../components/ui/Icons";
import { useAppDispatch } from "../../store";
import { Box } from "@mui/material";
import { categoriesColumn } from "../../columns/categories.column";
import { CategoryModel } from "../../store/categoryManager/categoryManager-state";
import { AddCategoryModal } from "../../components/modals/AddCategoryModal/AddCategoryModal";
import { AddCategoryFormType } from "../../form/schemas/addCategorySchema";
import { categoryManagerActions } from "../../store/categoryManager/categoryManager.actions";
import { categoryManagerThunkActions } from "../../store/categoryManager/categoryManager.thunk-builder";
import { ApiResponse } from "../../models/base/api-base";
import { UpdateCategoryResponse } from "../../models/category/update/updateCategory.response";

const Categories = () => {
  const { categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const [selectedCategory, setCategoryCountry] = useState<CategoryModel | null>(
    null
  );
  const dispatch = useAppDispatch();

  const handleRemoveCountry = useCallback(async (category: CategoryModel) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(categoryManagerActions.removeCategoryThunk(category._id));
  }, []);

  const handleEditCountry = useCallback(
    async (form: AddCategoryFormType) => {
      if (!selectedCategory) return;

      const request: CategoryModel = {
        ...selectedCategory,
        title: form.category,
      };

      const response = (
        await dispatch(categoryManagerThunkActions.updateCategoryThunk(request))
      ).payload as ApiResponse<UpdateCategoryResponse>;

      if (!response.isSucceeded || !response.data?.content) return;
      handleClose();
    },
    [selectedCategory]
  );

  const handleClose = useCallback(() => {
    setCategoryCountry(null);
  }, []);

  const actionColumns = useMemo((): ActionColumn<CategoryModel>[] => {
    return [
      {
        actionFunction: handleRemoveCountry,
        icon: <TrashIcon />,
      },
      {
        actionFunction: (category) => setCategoryCountry(category),
        icon: <EditIcon />,
      },
    ];
  }, [handleRemoveCountry]);

  return (
    <Box>
      <AddCategoryModal
        handleSubmit={handleEditCountry}
        handleClose={handleClose}
        open={!!selectedCategory}
        selectedCategory={selectedCategory}
      />

      <DataTable
        slug="categories"
        columns={categoriesColumn}
        rows={categories}
        pageSize={50}
        actions={actionColumns}
      />
    </Box>
  );
};

export default Categories;
