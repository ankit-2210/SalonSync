package com.userservice.payload.request;

import com.userservice.payload.dto.Credential;
import lombok.Data;

import java.util.*;

@Data
public class UserRequest {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean enabled;
    private boolean emailVerified;

    private List<Credential> credentials = new ArrayList<>();

}
