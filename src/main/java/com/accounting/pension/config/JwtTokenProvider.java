package com.accounting.pension.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;

import static com.accounting.pension.util.ConstantsHolder.SECRET;

@Slf4j
@Component
public class JwtTokenProvider implements Serializable {

    private static final long serialVersionUID = 2569800841756370596L;

    @Value("${jwt.expiration-time}")
    private int expirationTime;

    public String getJwtToken(final String username) {
        log.info(SECRET);
        return generateToken(username,
                             SECRET,
                             expirationTime);

    }

    public static String generateToken(final String username, final String secret, final int expirationTime) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + expirationTime))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }


    @Autowired
    private UserDetailsService userDetailsService;

    public Authentication getAuthentication(String username) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(),
                                                       userDetails.getAuthorities());
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

}
