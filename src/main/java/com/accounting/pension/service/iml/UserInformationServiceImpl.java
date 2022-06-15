package com.accounting.pension.service.iml;

import com.accounting.pension.dto.UserInformationDto;
import com.accounting.pension.exception.NotFoundException;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.model.UserInformationEntity;
import com.accounting.pension.repository.UserInformationRepository;
import com.accounting.pension.service.UserInformationService;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserInformationServiceImpl implements UserInformationService {
    private final UserInformationRepository userInformationRepository;
    private final UserService userService;

    @Override
    public void saveAccountImage(MultipartFile file, Long id) throws IOException {
        UserInformationEntity userInformationEntity = findUserInformationById(id);
        userInformationEntity.setAccountImage(file.getBytes());
        userInformationRepository.save(userInformationEntity);
    }

    @Override
    public UserInformationDto saveUserInformation(UserInformationDto userInformationDto, Long id) {
        UserEntity userEntity = userService.findUserById(id);
        final UserInformationEntity userInformationEntity = fillingUserInformation(userInformationDto);
        userInformationEntity.setUserEntity(userEntity);
        userInformationRepository.save(userInformationEntity);
        return userInformationDto;
    }

    @Override
    public UserInformationDto findById(Long id) {
        final UserInformationEntity userInformationEntity = findUserInformationById(id);
        return mapUserInformationToDto(userInformationEntity);
    }

    @Override
    public UserInformationDto findByUserId(final Long id) {
        final UserInformationEntity userInformationEntity = findUserInformationByUserId(id);
        return mapUserInformationToDto(userInformationEntity);
    }

    @Override
    public UserInformationDto updateUserInformation(UserInformationDto userInformationDto) {
        final UserInformationEntity userInformationEntitySecond = findUserInformationById(userInformationDto.getId());

        final UserInformationEntity userInformationEntity = fillingUserInformation(userInformationDto);

        userInformationEntity.setId(userInformationEntitySecond.getId());
        userInformationEntity.setAccountImage(userInformationEntitySecond.getAccountImage());
        userInformationEntity.setUserEntity(userInformationEntitySecond.getUserEntity());

        userInformationRepository.save(userInformationEntity);
        return userInformationDto;
    }

    private UserInformationDto mapUserInformationToDto(final UserInformationEntity userInformationEntity) {
        final UserInformationDto userInformationDto = new UserInformationDto();
        userInformationDto.setId(userInformationEntity.getId());
        userInformationDto.setAge(userInformationEntity.getAge());
        userInformationDto.setGenre(userInformationEntity.getGenre());
        userInformationDto.setPhoneNumber(userInformationEntity.getPhoneNumber());
        userInformationDto.setAccountImage(userInformationEntity.getAccountImage());
        return userInformationDto;
    }

    private UserInformationEntity findUserInformationByUserId(final Long id) {
        return userInformationRepository.findByUserEntity(userService.findUserById(id))
            .orElseThrow(() -> new NotFoundException("User information with this user id:" + id + " not founded"));
    }
    private UserInformationEntity findUserInformationById(final Long id) {
        return userInformationRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("User information not exist with id:" + id));
    }

    private UserInformationEntity fillingUserInformation(UserInformationDto userInformationDto) {
        UserInformationEntity userInformationEntity = new UserInformationEntity();
        userInformationEntity.setAge(userInformationDto.getAge());
        userInformationEntity.setGenre(userInformationDto.getGenre());
        userInformationEntity.setPhoneNumber(userInformationDto.getPhoneNumber());
        return userInformationEntity;
    }
}

