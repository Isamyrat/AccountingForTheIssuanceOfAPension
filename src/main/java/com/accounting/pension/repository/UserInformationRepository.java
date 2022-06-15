package com.accounting.pension.repository;

import com.accounting.pension.model.UserEntity;
import com.accounting.pension.model.UserInformationEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInformationRepository extends CrudRepository<UserInformationEntity, Long> {
    Optional<UserInformationEntity> findByUserEntity(UserEntity userEntity);
}
