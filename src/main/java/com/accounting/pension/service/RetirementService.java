package com.accounting.pension.service;

import com.accounting.pension.model.RetirementEntity;

public interface RetirementService {
    void saveRetirement(RetirementEntity retirementEntity, Long id);

    RetirementEntity findById(Long id);

    RetirementEntity findByUserId(Long id);

    void updateRetirement(RetirementEntity retirementEntity);
}
