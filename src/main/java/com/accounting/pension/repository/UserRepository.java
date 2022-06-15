package com.accounting.pension.repository;

import com.accounting.pension.model.RoleEntity;
import com.accounting.pension.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByRoleEntity(RoleEntity roleEntity);

    Optional<UserEntity> findByUsername(String username);

    Page<UserEntity> findUserByRoleEntityId(Long id, Pageable pageable);

    @Query("FROM UserEntity u WHERE u.name LIKE %:searchText% OR u.surname LIKE %:searchText%  AND u.roleEntity.name=:roleName")
    Page<UserEntity> findUserEntityByRoleEntityName(Pageable pageable, @Param("searchText") String searchText, @Param("roleName")String roleName);

}
