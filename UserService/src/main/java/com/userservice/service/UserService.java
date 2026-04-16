package com.userservice.service;

import com.userservice.modal.User;
import com.userservice.payload.dto.UserDto;

import java.util.*;

public interface UserService {
    User createUser(User user);
    UserDto getUserById(Long id);
    List<User> getAllUser();
    void deleteUser(Long id);
    UserDto updateUser(Long id, User user);

    UserDto getUserFromJwt(String jwt) throws Exception;


}
