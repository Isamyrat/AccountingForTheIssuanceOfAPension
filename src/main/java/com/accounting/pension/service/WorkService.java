package com.accounting.pension.service;

import com.accounting.pension.model.WorkEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface WorkService {
    WorkEntity findById(Long id);

    void saveWork(WorkEntity workEntity, Long id);

    ResponseEntity<Page<WorkEntity>> findAllWorksByUserId(Pageable pageable, Long id);

    void updateWork(WorkEntity workEntity);

    void deleteWork(Long id);
}
