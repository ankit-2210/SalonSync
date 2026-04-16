package com.userservice.controller;

import com.userservice.payload.dto.LoginDTO;
import com.userservice.payload.dto.SignDTO;
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
    public ResponseEntity<AuthResponse> signUp(@RequestBody SignDTO signDTO) throws Exception {
        AuthResponse authResponse = authService.signup(signDTO);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO loginDTO) throws Exception {
        AuthResponse authResponse = authService.login(loginDTO.getEmail(), loginDTO.getPassword());
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("/access-token/refresh-token/{refreshToken}")
    public ResponseEntity<AuthResponse> getAccessToken(@PathVariable String refreshToken) throws Exception {
        AuthResponse authResponse = authService.getAccessTokenFromRefreshToken(refreshToken);
        return ResponseEntity.ok(authResponse);
    }

}
