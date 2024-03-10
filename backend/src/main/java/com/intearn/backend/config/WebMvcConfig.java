package com.intearn.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://api.int-earn.com", "https://www.int-earn.com", "https://di6zjdsshcj6g.cloudfront.net")
                //.allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}