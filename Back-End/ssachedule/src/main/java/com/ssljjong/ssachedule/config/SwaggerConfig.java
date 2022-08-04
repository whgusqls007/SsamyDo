package com.ssljjong.ssachedule.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  @Bean
  public Docket apiV1() {
    return new Docket(DocumentationType.SWAGGER_2)
        .groupName("groupName1")
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.ssljjong.ssachedule.controller"))
        .paths(PathSelectors.ant("/**")).build();
  }

  @Bean
  public Docket apiV2() {
    return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .groupName("groupName2")
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.ssljjong.ssachedule.controller"))
        .paths(PathSelectors.ant("/api/v1")).build();
  }
}