package com.accounting.pension.repository;

import com.accounting.pension.model.RetirementEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RetirementRepository extends CrudRepository<RetirementEntity, Long> {
    Optional<RetirementEntity> findByUserEntityId(Long id);
}