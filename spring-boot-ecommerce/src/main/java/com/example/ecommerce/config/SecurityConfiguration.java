package com.example.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        //protect endpoint /api/orders
        http.authorizeHttpRequests(configurer -> configurer
                        .antMatchers("/api/orders/**") //Protect the endpoint. only accessible to authenticated users
                        .authenticated())
                .oauth2ResourceServer() //configures OAuth2 Resource server support
                .jwt(); //Enables JWT-encoded bearer token support

        //add CORS filters
        http.cors();

        return http.build(); //HttpSecurity supports the Builder design pattern hence, we can 'build it' to return the instance
    }
}
