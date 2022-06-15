package com.accounting.pension.controller;

import com.accounting.pension.dto.UserInformationDto;
import com.accounting.pension.model.Utils.Genre;
import com.accounting.pension.service.UserInformationService;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(UserInformationController.USER_INFORMATION_URL)
public class UserInformationController {

    public static final String USER_INFORMATION_URL = "/user/information";
    private final UserInformationService userInformationService;

    @GetMapping("/{id}")
    public ResponseEntity<UserInformationDto> getUserInformationByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(userInformationService.findByUserId(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<UserInformationDto> createUserInformation(@RequestBody UserInformationDto userInformationDto,
                                                                    @PathVariable Long id) {
        return ResponseEntity.ok(userInformationService.saveUserInformation(userInformationDto, id));
    }

    @GetMapping("/genders")
    public ResponseEntity<Set<String>> findAllGenders() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(Genre.FEMALE.getStr(), Genre.MALE.getStr())),
                                    HttpStatus.OK);
    }

    @PostMapping("/{idUserInformation}/files/account/image")
    public void uploadAccountImage(@NotNull @RequestParam("file") MultipartFile multipartFile,
                                   @PathVariable Long idUserInformation) throws IOException {
        userInformationService.saveAccountImage(multipartFile, idUserInformation);
    }

    @PutMapping
    public ResponseEntity<UserInformationDto> updateUserInformation(@RequestBody UserInformationDto userInformationDto) {
        return ResponseEntity.ok(userInformationService.updateUserInformation(userInformationDto));
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<UserInformationDto> getUserInformationById(@PathVariable Long id) {
        return ResponseEntity.ok(userInformationService.findById(id));
    }
}
