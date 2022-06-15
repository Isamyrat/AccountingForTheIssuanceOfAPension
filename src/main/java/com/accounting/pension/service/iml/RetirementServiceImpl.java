package com.accounting.pension.service.iml;

import com.accounting.pension.exception.NotFoundException;
import com.accounting.pension.model.RetirementEntity;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.repository.RetirementRepository;
import com.accounting.pension.service.RetirementService;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RetirementServiceImpl implements RetirementService {
    private final RetirementRepository retirementRepository;
    private final UserService userService;

    @Override
    public void saveRetirement(RetirementEntity retirementEntity, Long id) {
        UserEntity userEntity = userService.findUserById(id);
        retirementEntity.setUserEntity(userEntity);
        retirementRepository.save(retirementEntity);
    }

    @Override
    public RetirementEntity findById(Long id) {
        return retirementRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Retirement not exist with id:" + id));
    }

    @Override
    public RetirementEntity findByUserId(Long id) {
        return retirementRepository.findByUserEntityId(id)
            .orElseThrow(() -> new NotFoundException("Retirement with this user id:" + id + " not founded"));
    }

    @Override
    public void updateRetirement(RetirementEntity retirementEntity) {
        RetirementEntity retirementEntitySecond = findById(retirementEntity.getId());

        retirementEntity.setId(retirementEntitySecond.getId());
        retirementEntity.setUserEntity(retirementEntitySecond.getUserEntity());

        retirementRepository.save(retirementEntity);
    }
}
