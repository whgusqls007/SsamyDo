package com.ssljjong.ssachedule.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssljjong.ssachedule.entity.Track;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

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

}
