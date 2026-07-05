package com.userservice.service;

import com.userservice.payload.dto.SignDTO;
import com.userservice.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse login(String username, String password) throws Exception;
    AuthResponse signup(SignDTO signDTO) throws Exception;
    AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception;
    AuthResponse changePassword(String email, String oldPassword, String newPassword) throws Exception;
    AuthResponse forgotPassword(String email) throws Exception;

}
