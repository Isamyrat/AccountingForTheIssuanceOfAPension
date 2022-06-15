package com.accounting.pension.service.iml;

import com.accounting.pension.model.UserEntity;
import com.accounting.pension.model.Utils.RoleUtils;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userService.findUserByUsername(username);
        return new org.springframework.security.core.userdetails.User
            (userEntity.getUsername(),
             userEntity.getPassword(),
             getGrantedAuthority());
    }
    private Collection<GrantedAuthority> getGrantedAuthority() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(RoleUtils.ROLE_USER.toString()));
        return authorities;
    }
}