package com.accounting.pension.controller;

import com.accounting.pension.model.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static com.accounting.pension.controller.UserController.USER_URL;
import static org.hamcrest.Matchers.is;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserControllerTest extends AbstractWebTests {

    private static final String USER_NAME = "amina";
    private static final String USER_SURNAME = "amina";

    @Test
    void updateUser() throws Exception {
        String data = gson.toJson(new UserEntity(7L,USER_NAME,USER_SURNAME));

        this.mockMvc.perform(put(USER_URL)
                                 .contentType(MediaType.APPLICATION_JSON)
                                 .content(data)
                                 .header(AUTHORIZATION,   ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk());
    }


    @Test
    void getUserById() throws Exception {
        this.mockMvc.perform(get(USER_URL + "/8")
                                 .header(AUTHORIZATION,
                                         ADMIN_TOKEN))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name", is("Маша")));
    }
}