package com.userservice.service.Impl;

import com.userservice.modal.User;
import com.userservice.payload.dto.SignDTO;
import com.userservice.payload.response.AuthResponse;
import com.userservice.payload.response.TokenResponse;
import com.userservice.repository.UserRepository;
import com.userservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final KeycloakService keycloakService;

    @Override
    public AuthResponse login(String username, String password) throws Exception {
        TokenResponse tokenResponse = keycloakService.getAdminAccessToken(username, password, "password", null);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setRefresh_token(tokenResponse.getRefreshToken());
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setMessage("Login Successful");
        return authResponse;
    }

    @Override
    public AuthResponse signup(SignDTO signDTO) throws Exception {
        keycloakService.createUser(signDTO);
        User user = new User();
        user.setUsername(signDTO.getUsername());
        user.setPassword(signDTO.getPassword());
        user.setEmail(signDTO.getEmail());
        user.setFullName(signDTO.getFullName());
        user.setRole(signDTO.getRole());
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);

        TokenResponse tokenResponse = keycloakService.getAdminAccessToken(signDTO.getUsername(), signDTO.getPassword(), "password", null);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setRefresh_token(tokenResponse.getRefreshToken());
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setUserRole(user.getRole());
        authResponse.setMessage("Register Successful");
        return authResponse;
    }

    @Override
    public AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception {
        TokenResponse tokenResponse = keycloakService.getAdminAccessToken(null, null, "refresh_token", refreshToken);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setRefresh_token(tokenResponse.getRefreshToken());
        authResponse.setJwt(tokenResponse.getAccessToken());
        authResponse.setMessage("Access token received");
        return authResponse;
    }
}
