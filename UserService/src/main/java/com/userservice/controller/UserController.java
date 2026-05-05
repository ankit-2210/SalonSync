package com.userservice.controller;

import com.userservice.modal.User;
import com.userservice.payload.dto.UserDto;
import com.userservice.payload.response.ApiResponse;
import com.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody @Valid User user){
        User newUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "User created successfully", newUser));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto user = userService.getUserFromJwt(jwt);
        return ResponseEntity.ok(new ApiResponse<>(true, "User profile fetched", user));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getUsers(){
        List<User> users = userService.getAllUser();
        return ResponseEntity.ok(new ApiResponse<>(true, "Users fetched successfully", users));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable("userId") Long id) throws Exception{
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User by id fetched successfully", user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(@RequestBody User user, @PathVariable Long id) throws Exception{
        UserDto updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(new ApiResponse<>(true, "User updated successfully", updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUserById(@PathVariable Long id) throws Exception{
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully", null));
    }

}
