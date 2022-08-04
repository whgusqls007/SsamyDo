package com.ssljjong.ssachedule.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssljjong.ssachedule.entity.Track;
import com.ssljjong.ssachedule.entity.User;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
public class UserDto {

    @NotNull
    private String username;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String eduPw;

    private Track track;

    private Set<AuthorityDto> authorityDtoSet;

    public static UserDto from(User user) {
        if(user == null) return null;

        return UserDto.builder()
                .username(user.getUsername())
                .eduPw(user.getEduPw())
                .authorityDtoSet(user.getAuthorities().stream()
                        .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }

}