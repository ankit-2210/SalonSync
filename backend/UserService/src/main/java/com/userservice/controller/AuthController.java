package com.userservice.controller;

import com.userservice.payload.dto.ChangePasswordDTO;
import com.userservice.payload.dto.LoginDTO;
import com.userservice.payload.dto.SignDTO;
import com.userservice.payload.response.ApiResponse;
import com.userservice.payload.response.AuthResponse;
import com.userservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> signUp(@RequestBody SignDTO signDTO) throws Exception {
        AuthResponse authResponse = authService.signup(signDTO);
        return ResponseEntity.ok(new ApiResponse<>(true, "SignUp Successfully", authResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginDTO loginDTO) throws Exception {
        AuthResponse authResponse = authService.login(loginDTO.getEmail(), loginDTO.getPassword());
        return ResponseEntity.ok(new ApiResponse<>(true, "Login Successfully", authResponse));
    }

    @GetMapping("/access-token/refresh-token/{refreshToken}")
    public ResponseEntity<AuthResponse> getAccessToken(@PathVariable String refreshToken) throws Exception {
        AuthResponse authResponse = authService.getAccessTokenFromRefreshToken(refreshToken);
        return ResponseEntity.ok(authResponse);
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<AuthResponse>> changePassword(@RequestBody ChangePasswordDTO request) throws Exception{
        AuthResponse authResponse = authService.changePassword(request.getEmail(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(new ApiResponse<>(true, "Password changed", authResponse));
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<ApiResponse<AuthResponse>> forgotPassword(@RequestParam String email) throws Exception{
        AuthResponse authResponse = authService.forgotPassword(email);
        return ResponseEntity.ok(new ApiResponse<>(true, authResponse.getMessage(), authResponse));
    }

}
