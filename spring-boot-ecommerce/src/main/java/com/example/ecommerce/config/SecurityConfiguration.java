package com.example.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

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

        //add content negotiation strategy, Set up content negotiation strategy to support Okta sending back friendly response
        http.setSharedObject(ContentNegotiationStrategy.class,
                             new HeaderContentNegotiationStrategy());

        //force a non-empty response body for 401's to make the response more friendly
        Okta.configureResourceServer401ResponseBody(http);

        //disable CSRF since we are not using Cookies for session tracking
        http.csrf().disable(); 

        return http.build(); //HttpSecurity supports the Builder design pattern hence, we can 'build it' to return the instance
    }
}
