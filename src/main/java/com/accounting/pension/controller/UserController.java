package com.accounting.pension.controller;

import com.accounting.pension.config.JwtTokenProvider;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(UserController.USER_URL)
@RequiredArgsConstructor
public class UserController {

    public static final String USER_URL = "/user";
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;


    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody UserEntity userEntity) {
        JSONObject jsonObject = new JSONObject();
        try {
            UserEntity savedUserEntity = userService.saveOrUpdate(userEntity);
            jsonObject.put("message", savedUserEntity.getName() + " saved successfully");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody UserEntity userEntity) {
        log.info("UserResourceImpl : authenticate");

        JSONObject jsonObject = new JSONObject();
        UserEntity userEntitySecond = userService.findUserByUsername(userEntity.getUsername());
        try {
            Authentication authentication = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(userEntity.getUsername(), userEntity.getPassword()));
            if (authentication.isAuthenticated()) {
                jsonObject.put("name", authentication.getName());
                jsonObject.put("id", userEntitySecond.getId());
                jsonObject.put("authorities", authentication.getAuthorities());
                jsonObject.put("role", userEntitySecond.getRoleEntity().getName());
                jsonObject.put("token", tokenProvider.getJwtToken(userEntitySecond.getUsername()));
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PutMapping
    public void updateUser(@RequestBody UserEntity userEntity) {
        userService.updateUser(userEntity);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Page<UserEntity>> getAllUsers(int pageNumber, int pageSize) {
        return new ResponseEntity<>(userService.findAllUsers(
            PageRequest.of(
                pageNumber, pageSize)
                                                            ), HttpStatus.OK);
    }

    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<UserEntity>> findAllUserWithSearch(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(userService.findAllUserSearch(pageable, searchText), HttpStatus.OK);
    }
}
