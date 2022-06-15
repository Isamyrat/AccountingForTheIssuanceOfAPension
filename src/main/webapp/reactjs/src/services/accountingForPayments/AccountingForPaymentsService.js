import axios from "axios";

const AccountingForPayments_API_BASE_URL = "http://localhost:8081/rest/accountingForPayments";

class AccountingForPaymentsService{
    createAccountingForPayments(userId,accountingForPayments){
        return axios.post(AccountingForPayments_API_BASE_URL + '/' + userId, accountingForPayments);
    }
    getById(id){
        return axios.get(AccountingForPayments_API_BASE_URL + '/findById/' + id)
    }
    updateAccountingForPayments(accountingForPayments){
        return axios.put(AccountingForPayments_API_BASE_URL, accountingForPayments);
    }
    deleteAccountingForPayments(id){
        return axios.delete(AccountingForPayments_API_BASE_URL + '/' + id);
    }
}

export default new AccountingForPaymentsService()