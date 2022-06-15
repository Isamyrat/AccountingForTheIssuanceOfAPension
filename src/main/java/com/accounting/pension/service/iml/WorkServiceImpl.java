package com.accounting.pension.service.iml;

import com.accounting.pension.exception.NotFoundException;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.model.WorkEntity;
import com.accounting.pension.repository.WorkRepository;
import com.accounting.pension.service.UserService;
import com.accounting.pension.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkServiceImpl implements WorkService {
    private final WorkRepository workRepository;
    private final UserService userService;

    @Override
    public WorkEntity findById(Long id) {
        return workRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Work: " + id + " not founded"));
    }

    @Override
    public void saveWork(WorkEntity workEntity, Long id) {
        UserEntity userEntity = userService.findUserById(id);

        workEntity.setUserEntity(userEntity);

        workRepository.save(workEntity);
    }

    @Override
    public ResponseEntity<Page<WorkEntity>> findAllWorksByUserId(Pageable pageable, Long id) {
        return ResponseEntity.ok(workRepository.findByUserEntityId(pageable, id));
    }

    @Override
    public void updateWork(WorkEntity workEntity) {
        WorkEntity workEntitySecond = findById(workEntity.getId());

        workEntity.setUserEntity(workEntitySecond.getUserEntity());

        workRepository.save(workEntity);
    }

    @Override
    public void deleteWork(Long id) {
        WorkEntity workEntity = findById(id);

        if (workEntity == null) {
            return ;
        }

        workRepository.delete(workEntity);
    }
}
