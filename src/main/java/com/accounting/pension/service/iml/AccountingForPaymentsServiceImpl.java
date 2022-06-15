package com.accounting.pension.service.iml;

import com.accounting.pension.exception.NotFoundException;
import com.accounting.pension.model.AccountingForPaymentEntity;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.repository.AccountingForPaymentsRepository;
import com.accounting.pension.service.AccountingForPaymentsService;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountingForPaymentsServiceImpl implements AccountingForPaymentsService {
    private final AccountingForPaymentsRepository accountingForPaymentsRepository;
    private final UserService userService;

    @Override
    public AccountingForPaymentEntity findById(Long id) {
        return accountingForPaymentsRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Accounting for payments : " + id + " not founded"));
    }


    @Override
    public void saveAccountingForPayment(AccountingForPaymentEntity accountingForPaymentEntity, Long id) {
        UserEntity userEntity = userService.findUserById(id);

        accountingForPaymentEntity.setUserEntity(userEntity);

        accountingForPaymentsRepository.save(accountingForPaymentEntity);
    }

    @Override
    public ResponseEntity<Page<AccountingForPaymentEntity>> findAllAccountingForPaymentByUserId(Pageable pageable,
                                                                                                Long id) {
        return ResponseEntity.ok(accountingForPaymentsRepository.findByUserEntityId(pageable, id));
    }

    @Override
    public void updateAccountingForPayment(AccountingForPaymentEntity accountingForPaymentEntity) {
        AccountingForPaymentEntity accounting = findById(accountingForPaymentEntity.getId());

        accountingForPaymentEntity.setUserEntity(accounting.getUserEntity());

        accountingForPaymentsRepository.save(accountingForPaymentEntity);
    }

    @Override
    public void deleteAccountingForPayment(Long id) {
        AccountingForPaymentEntity accountingForPaymentEntity = findById(id);

        if (accountingForPaymentEntity == null) {
            return;
        }
        accountingForPaymentsRepository.delete(accountingForPaymentEntity);
    }
}
