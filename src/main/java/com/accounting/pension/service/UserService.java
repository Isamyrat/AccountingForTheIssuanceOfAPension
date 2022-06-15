package com.accounting.pension.service;

import com.accounting.pension.model.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserEntity saveOrUpdate(UserEntity userEntity);

    void updateUser(UserEntity userEntity);

    Page<UserEntity> findAllUsers(Pageable pageable);

    UserEntity findUserById(Long id);

    UserEntity findUserByUsername(String email);

    Page<UserEntity> findAllUserSearch(Pageable pageable, String searchText);
}
