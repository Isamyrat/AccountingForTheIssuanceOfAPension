package com.accounting.pension.controller;

import com.accounting.pension.model.AccountingForPaymentEntity;
import com.accounting.pension.service.AccountingForPaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping(AccountingForPaymentController.ACCOUNTING_FOR_PAYMENTS_URL)
public class AccountingForPaymentController {

    public static final String ACCOUNTING_FOR_PAYMENTS_URL = "/accountingForPayments";
    private final AccountingForPaymentsService accountingForPaymentsService;

    @GetMapping("/")
    public ResponseEntity<Page<AccountingForPaymentEntity>> getAccountingForPaymentsByUserId(Pageable pageable, Long id) {
        return accountingForPaymentsService.findAllAccountingForPaymentByUserId(pageable, id);
    }

    @PostMapping("/{id}")
    public void createAccountingForPayments(@RequestBody AccountingForPaymentEntity accountingForPaymentEntity,
                                            @PathVariable Long id) {
        accountingForPaymentsService.saveAccountingForPayment(accountingForPaymentEntity, id);
    }

    @DeleteMapping("/{id}")
    public void deleteAccountingForPayments(@PathVariable Long id) {
        accountingForPaymentsService.deleteAccountingForPayment(id);
    }

    @PutMapping
    public void updateAccountingForPayments(@RequestBody AccountingForPaymentEntity accountingForPaymentEntity) {
        accountingForPaymentsService.updateAccountingForPayment(accountingForPaymentEntity);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<AccountingForPaymentEntity> getAccountingForPaymentsById(@PathVariable Long id) {
        return ResponseEntity.ok(accountingForPaymentsService.findById(id));
    }
}
