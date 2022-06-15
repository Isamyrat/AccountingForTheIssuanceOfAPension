package com.accounting.pension.repository;

import com.accounting.pension.model.AddressEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends CrudRepository<AddressEntity, Long> {
    Optional<AddressEntity> findByUserEntityId(Long id);
}