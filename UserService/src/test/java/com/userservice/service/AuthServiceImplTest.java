package com.userservice.service;
import com.userservice.modal.User;
import com.userservice.payload.dto.SignDTO;
import com.userservice.payload.response.AuthResponse;
import com.userservice.payload.response.TokenResponse;
import com.userservice.repository.UserRepository;
import com.userservice.service.Impl.AuthServiceImpl;
import com.userservice.service.Impl.KeycloakService;
import com.userservice.utils.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import java.util.*;

import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private KeycloakService keycloakService;

    @InjectMocks
    private AuthServiceImpl authService;

    private TokenResponse tokenResponse;

    @BeforeEach
    void setUp(){
        tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken("access-token");
        tokenResponse.setRefreshToken("refresh-token");
    }

    // test - login
    @Test
    void testLogin() throws Exception {
        when(keycloakService.getAdminAccessToken(any(), any(), any(), any())).thenReturn(tokenResponse);

        AuthResponse authResponse = authService.login("user", "pass");
        assertEquals("access-token", authResponse.getJwt());
        assertEquals("refresh-token", authResponse.getRefresh_token());
        assertEquals("Login Successful", authResponse.getMessage());

        verify(keycloakService).getAdminAccessToken(any(), any(), any(), any());
    }

    // test - signup
    @Test
    void testSignUp() throws Exception{
        SignDTO signDTO = new SignDTO();
        signDTO.setUsername("ankit");
        signDTO.setPassword("123");
        signDTO.setEmail("test@gmail.com");
        signDTO.setFullName("Ankit Agarwal");
        signDTO.setRole(UserRole.ADMIN);

        when(keycloakService.getAdminAccessToken(any(), any(), any(), any())).thenReturn(tokenResponse);
        AuthResponse authResponse = authService.signup(signDTO);

        assertEquals("access-token", authResponse.getJwt());
        assertEquals("refresh-token", authResponse.getRefresh_token());
        assertEquals("Register Successful", authResponse.getMessage());

        verify(userRepository).save(any(User.class));
        verify(keycloakService).createUser(signDTO);
    }


    // test - refresh token
    @Test
    void testGetAccessTokenFromRefreshToken() throws Exception{
        when(keycloakService.getAdminAccessToken(any(), any(), any(), any())).thenReturn(tokenResponse);

        AuthResponse authResponse = authService.getAccessTokenFromRefreshToken("refresh");

        assertEquals("access-token", authResponse.getJwt());
        assertEquals("Access token received", authResponse.getMessage());
    }


}
