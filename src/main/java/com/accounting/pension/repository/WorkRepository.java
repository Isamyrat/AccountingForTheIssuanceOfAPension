package com.accounting.pension.repository;

import com.accounting.pension.model.WorkEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends CrudRepository<WorkEntity, Long> {
    Page<WorkEntity> findByUserEntityId(Pageable pageable, Long id);
}
