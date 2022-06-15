package com.accounting.pension.controller;

import com.accounting.pension.dto.UserInformationDto;
import com.accounting.pension.model.Utils.Genre;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.FileInputStream;
import java.util.HashMap;

import static com.accounting.pension.controller.UserInformationController.USER_INFORMATION_URL;
import static org.hamcrest.Matchers.is;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserInformationControllerTest extends AbstractWebTests {

    @Test
    void getUserInformationByUserId() throws Exception {
        this.mockMvc.perform(get(USER_INFORMATION_URL + "/8")
                                 .header(AUTHORIZATION,
                                         ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.age", is(45)))
            .andExpect(jsonPath("$.genre", is(Genre.FEMALE.getStr())));
    }

    @Test
    void getUserInformationByNonFoundUserId() throws Exception {
        this.mockMvc.perform(get(USER_INFORMATION_URL + "/9")
                                 .header(AUTHORIZATION,
                                         ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isNotFound());
    }

    @Test
    void createUserInformation() throws Exception {
        String data = gson.toJson(new UserInformationDto((short) 25, Genre.MALE.getStr(), "-"));

        this.mockMvc.perform(post(USER_INFORMATION_URL + "/9")
                                 .contentType(MediaType.APPLICATION_JSON)
                                 .content(data)
                                 .header(AUTHORIZATION, ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.age", is(25)))
            .andExpect(jsonPath("$.genre", is(Genre.MALE.getStr())));
    }

    @Test
    void findAllGenders() throws Exception {
        this.mockMvc.perform(get(USER_INFORMATION_URL + "/genders")
                                 .header(AUTHORIZATION,
                                         ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk());
    }

    @Test
    void uploadAccountImage() throws Exception {
        //TODO find example and did  upload image throw exception

      /*  FileInputStream fileInputStream =
            new FileInputStream("/Users/isa/MyPortfolio/DiplomProject/4/pension/src/main/resources/images/даша.jpeg");
        MockMultipartFile multipartFile = new MockMultipartFile("file", fileInputStream);

        HashMap<String, String> contentTypeParams = new HashMap<>();
        contentTypeParams.put("boundary", "265001916915724");
        MediaType mediaType = new MediaType("multipart", "form-data", contentTypeParams);

        mockMvc.perform(post(USER_INFORMATION_URL + "/8/files/account/image")
                            .content(multipartFile.getBytes())
                            .contentType(mediaType)
                            .header(AUTHORIZATION, ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk());*/

    }

    @Test
    void updateUserInformation() throws Exception {
        String data = gson.toJson(new UserInformationDto(15L, (short) 26, Genre.MALE.getStr(), "-"));

        this.mockMvc.perform(put(USER_INFORMATION_URL)
                                 .contentType(MediaType.APPLICATION_JSON)
                                 .content(data)
                                 .header(AUTHORIZATION, ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.age", is(26)))
            .andExpect(jsonPath("$.genre", is(Genre.MALE.getStr())));
    }

    @Test
    void getUserInformationById() throws Exception {
        this.mockMvc.perform(get(USER_INFORMATION_URL + "/findById/7")
                                 .header(AUTHORIZATION,
                                         ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.age", is(65)))
            .andExpect(jsonPath("$.genre", is(Genre.FEMALE.getStr())));
    }

    @Test
    void getUserInformationByNonFoundId() throws Exception {
        this.mockMvc.perform(get(USER_INFORMATION_URL + "/findById/10")
                                 .header(AUTHORIZATION,
                                         ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isNotFound());
    }
}