package com.ssljjong.ssachedule.dto;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssljjong.ssachedule.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    @NotNull
    private String username;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String eduPw;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String trackName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer gi;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String fcmToken;

    private Set<AuthorityDto> authorityDtoSet;

    public static UserDto from(User user) {
        if (user == null)
            return null;

        return UserDto.builder()
                .username(user.getUsername())
                .eduPw(user.getEduPw())
                .authorityDtoSet(user.getAuthorities().stream()
                        .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }

}
