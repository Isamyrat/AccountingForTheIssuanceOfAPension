package com.accounting.pension.service;

import com.accounting.pension.model.AccountingForPaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface AccountingForPaymentsService {
    AccountingForPaymentEntity findById(Long id);

    void saveAccountingForPayment(AccountingForPaymentEntity accountingForPaymentEntity, Long id);

    ResponseEntity<Page<AccountingForPaymentEntity>> findAllAccountingForPaymentByUserId(Pageable pageable,
                                                                                         Long id);

    void updateAccountingForPayment(AccountingForPaymentEntity accountingForPaymentEntity);

    void deleteAccountingForPayment(Long id);
}
