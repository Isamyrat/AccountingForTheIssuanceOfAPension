package com.accounting.pension.controller;

import com.accounting.pension.config.JwtTokenProvider;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static com.accounting.pension.util.ConstantsHolder.SECRET;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public abstract class AbstractWebTests {
    @Autowired
    protected Gson gson;

    @Autowired
    protected MockMvc mockMvc;

    protected final String USER_TOKEN = JwtTokenProvider.generateToken("user_test", SECRET, Integer.MAX_VALUE);
    protected final String ADMIN_TOKEN = JwtTokenProvider.generateToken("admin_test", SECRET, Integer.MAX_VALUE);

}
