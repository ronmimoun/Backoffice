import DataTable from "../../components/dataTable/DataTable";
import { useEffect, useState } from "react";
import { creditTransactionsColumns } from "../../columns/credit-transactions.column";
import { creditTransactionApiService } from "../../services/api/creditTransaction.api.service";
import { CreditTransactionModel } from "../../types/credit-transaction.type";
import { Breadcrumb } from "../../components/shared/Breadcrumb/Breadcrumb";

const CreditTransactions = () => {
  const [creditTrans, setCreditTrans] = useState<CreditTransactionModel[]>([]);

  useEffect(() => {
    const loadCreditTrans = async () => {
      const response = await creditTransactionApiService.get();
      if (!response.isSucceeded || !response.data?.content) return;

      setCreditTrans(response.data.content);
    };

    loadCreditTrans();
  }, []);

  return (
    <>
      <Breadcrumb text="Top-ups" />
      <DataTable
        slug="topups"
        columns={creditTransactionsColumns}
        rows={creditTrans}
      />
    </>
  );
};

export default CreditTransactions;
