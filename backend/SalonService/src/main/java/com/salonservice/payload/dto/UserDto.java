package com.salonservice.payload.dto;

import lombok.*;

@Data
@Getter
@Setter
public class UserDto {
    private Long id;
    private String fullName;
    private String email;


}
