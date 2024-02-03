import classes from "./ContactsFilter.module.scss";
import { Box } from "@mui/material";
import { ButtonPrimary } from "../../../components/ui/Button/ButtonPrimary";
import { useCallback, useState } from "react";
import { ContactModel } from "../../../types/contact.type";
import { contactTransactionApiService } from "../../../services/api/contactTransaction.api.service";
import BasicSelect from "../../../components/ui/BasicSelect/BasicSelect";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";
import {
  CategoryModel,
  CompanyModel,
} from "../../../store/categoryManager/categoryManager-state";
import { categoryManagerUtilService } from "../../../utils/category-manager.utils";

export enum ContactsFilterEnum {
  In_Stock = "inStock",
  Not_In_Stock = "notInStock",
  Purchased = "purchased",
  Purchased_Not_In_Stock = "purchasedNotInStock",
}

type ContactsFilterProps = {
  contacts: ContactModel[];
  handleSetContactList: (value: ContactModel[]) => void;
};

export const ContactsFilter = ({
  contacts,
  handleSetContactList,
}: ContactsFilterProps) => {
  const { categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const [filterBy, setFilterBy] = useState<ContactsFilterEnum | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();

  const handleFilter = useCallback(
    (value?: ContactsFilterEnum) => {
      setFilterBy(value);
      clearFilters();

      switch (value) {
        case ContactsFilterEnum.In_Stock:
          handleInStockFilter(ContactsFilterEnum.In_Stock);
          break;
        case ContactsFilterEnum.Not_In_Stock:
          handleInStockFilter(ContactsFilterEnum.Not_In_Stock);
          break;
        case ContactsFilterEnum.Purchased:
          handlePurchasedContactsFilter();
          break;
        case ContactsFilterEnum.Purchased_Not_In_Stock:
          handlePurchasedAndNotInStockContacts();
          break;

        default:
          handleSetContactList(contacts);
          break;
      }
    },
    [contacts]
  );

  const clearFilters = useCallback(() => {
    setSelectedCategory(undefined);
  }, []);

  const handleInStockFilter = useCallback(
    (value: ContactsFilterEnum.In_Stock | ContactsFilterEnum.Not_In_Stock) => {
      let newArrayContacts: ContactModel[] = [];
      if (value === ContactsFilterEnum.In_Stock) {
        newArrayContacts = contacts.filter((contact) => contact.inStock);
      } else {
        newArrayContacts = contacts.filter((contact) => !contact.inStock);
      }
      handleSetContactList(newArrayContacts);
    },
    [contacts]
  );

  const handlePurchasedContactsFilter = useCallback(() => {
    const filteredContacts = contacts.filter(
      (contact) => contact.transactionHistory.length
    );
    handleSetContactList(filteredContacts);
  }, [contacts]);

  const handlePurchasedAndNotInStockContacts = useCallback(async () => {
    const response = await contactTransactionApiService.get();

    if (!response.isSucceeded || !response.data?.content)
      return setFilterBy(undefined);

    const contacts = response.data.content.reduce(
      (acc: ContactModel[], transaction) => {
        if (!transaction.contact.inStock) {
          const isExists = acc.find(
            (contact) => contact._id === transaction.contact._id
          );
          if (!isExists) acc.push(transaction.contact);
        }
        return acc;
      },
      []
    );

    handleSetContactList(contacts);
  }, [contacts]);

  const onCategorySelect = useCallback(
    (value: CategoryModel) => {
      const filteredContacts = contacts.filter((contact) => {
        return contact.category === value.title;
      });

      handleSetContactList(filteredContacts);
      setSelectedCategory(value);
    },
    [contacts]
  );

  const onCompanySelect = useCallback(
    (value: CompanyModel) => {
      const filteredContacts = contacts.filter((contact) => {
        return (
          selectedCategory?.cat === value.category &&
          contact.company === value.company
        );
      });

      handleSetContactList(filteredContacts);
    },
    [contacts, selectedCategory]
  );

  if (!contacts) return <></>;
  return (
    <Box className={classes.container}>
      <Box className={classes.buttons_container}>
        <ButtonPrimary
          className={
            filterBy === ContactsFilterEnum.In_Stock
              ? classes.activated_btn
              : ""
          }
          onClickFunction={() => handleFilter(ContactsFilterEnum.In_Stock)}
        >
          Not in stock
        </ButtonPrimary>
        <ButtonPrimary
          className={
            filterBy === ContactsFilterEnum.Not_In_Stock
              ? classes.activated_btn
              : ""
          }
          onClickFunction={() => handleFilter(ContactsFilterEnum.Not_In_Stock)}
        >
          In stock
        </ButtonPrimary>
        <ButtonPrimary
          className={
            filterBy === ContactsFilterEnum.Purchased_Not_In_Stock
              ? classes.activated_btn
              : ""
          }
          onClickFunction={() =>
            handleFilter(ContactsFilterEnum.Purchased_Not_In_Stock)
          }
        >
          Ordered and not in stock
        </ButtonPrimary>
        <ButtonPrimary
          className={
            filterBy === ContactsFilterEnum.Purchased
              ? classes.activated_btn
              : ""
          }
          onClickFunction={() => handleFilter(ContactsFilterEnum.Purchased)}
        >
          Purchased Contacts
        </ButtonPrimary>
        <ButtonPrimary onClickFunction={() => handleFilter()}>
          Clear Filter
        </ButtonPrimary>
      </Box>

      <Box className={classes.select_container}>
        <BasicSelect
          label="Categories"
          name="categories"
          handleChange={onCategorySelect}
          list={categories}
          textAccessor="title"
          value={selectedCategory ? selectedCategory.title : ""}
        />
        <BasicSelect
          label="Companies"
          disabled={!selectedCategory}
          name="companies"
          handleChange={onCompanySelect}
          list={categoryManagerUtilService.getCompaniesByCategory(
            selectedCategory
          )}
          textAccessor="company"
          value={selectedCategory ? selectedCategory.title : ""}
        />
      </Box>
    </Box>
  );
};
