package com.accounting.pension.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class UserInformationDto {

    private Long id;

    @Size(min = 3, max = 100)
    private Short age;

    private byte[] accountImage;

    @NotBlank(message = "Genre can not be empty.")
    private String genre;

    @NotBlank(message = "Phone number can not be empty.")
    private String phoneNumber;

    public UserInformationDto(short age, String genre, String phoneNumber) {
        this.age = age;
        this.genre = genre;
        this.phoneNumber = phoneNumber;
    }

    public UserInformationDto(Long id, short age, String genre, String phoneNumber) {
        this.id = id;
        this.age = age;
        this.genre = genre;
        this.phoneNumber = phoneNumber;
    }
}
