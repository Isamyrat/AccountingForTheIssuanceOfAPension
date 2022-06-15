package com.accounting.pension.service.iml;

import com.accounting.pension.exception.NotFoundException;
import com.accounting.pension.model.RoleEntity;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.model.Utils.RoleUtils;
import com.accounting.pension.repository.RoleRepository;
import com.accounting.pension.repository.UserRepository;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserEntity saveOrUpdate(UserEntity userEntity) {
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        RoleEntity roleEntity = roleRepository.findByName(RoleUtils.ROLE_USER.toString())
            .orElseThrow(() -> new NotFoundException("Role:" + RoleUtils.ROLE_USER + " not founded"));
        userEntity.setRoleEntity(roleEntity);
        return userRepository.saveAndFlush(userEntity);
    }

    @Override
    public void updateUser(UserEntity userEntitySecond) {
        UserEntity userEntity = findUserById(userEntitySecond.getId());
        userEntitySecond.setUsername(userEntity.getUsername());
        userEntitySecond.setPassword(userEntity.getPassword());
        userEntitySecond.setRoleEntity(userEntity.getRoleEntity());
        userRepository.save(userEntitySecond);
    }

    @Override
    public Page<UserEntity> findAllUsers(Pageable pageable) {
        return userRepository.findUserByRoleEntityId(2L, pageable);
    }

    @Override
    public UserEntity findUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("User: " + id + " not founded"));
    }

    @Override
    public UserEntity findUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException("User: " + username + " not founded"));
    }

    @Override
    public Page<UserEntity> findAllUserSearch(Pageable pageable, String searchText) {
        return userRepository.findUserEntityByRoleEntityName(pageable, searchText, RoleUtils.ROLE_USER.toString());
    }
}
