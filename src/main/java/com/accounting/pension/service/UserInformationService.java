package com.accounting.pension.service;

import com.accounting.pension.dto.UserInformationDto;
import com.accounting.pension.model.UserInformationEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserInformationService {
    void saveAccountImage(MultipartFile file, Long id) throws IOException;

    UserInformationDto saveUserInformation(UserInformationDto userInformationDto, Long id);

    UserInformationDto findById(Long id);

    UserInformationDto findByUserId(Long id);

    UserInformationDto updateUserInformation(UserInformationDto userInformationDto);
}
