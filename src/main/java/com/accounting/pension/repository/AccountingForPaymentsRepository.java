package com.accounting.pension.repository;

import com.accounting.pension.model.AccountingForPaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountingForPaymentsRepository extends CrudRepository<AccountingForPaymentEntity, Long> {
    Page<AccountingForPaymentEntity> findByUserEntityId(Pageable pageable, Long id);
}
