package com.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.userservice.payload.dto.LoginDTO;
import com.userservice.payload.dto.SignDTO;
import com.userservice.payload.response.AuthResponse;
import com.userservice.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    // test - signup
    @Test
    void testSignUp() throws Exception{
        SignDTO signDTO = new SignDTO();
        signDTO.setUsername("ankit");
        signDTO.setEmail("test@gmail.com");
        signDTO.setPassword("123");
        signDTO.setFullName("Ankit Agarwal");

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt("jwt-token");
        authResponse.setRefresh_token("refresh-token");
        authResponse.setMessage("Register Successful");

        when(authService.signup(any(SignDTO.class))).thenReturn(authResponse);

        mockMvc.perform(post("/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value("jwt-token"))
                .andExpect(jsonPath("$.refresh_token").value("refresh-token"))
                .andExpect(jsonPath("$.message").value("Register Successful"));

        verify(authService, times(1)).signup(any(SignDTO.class));
    }

    // test - login
    @Test
    void testLogin() throws Exception{
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@gmail.com");
        loginDTO.setPassword("123");

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt("jwt-token");
        authResponse.setRefresh_token("refresh-token");
        authResponse.setMessage("Login Successful");

        when(authService.login(anyString(), anyString())).thenReturn(authResponse);
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value("jwt-token"))
                .andExpect(jsonPath("$.message").value("Login Successful"));

        verify(authService, times(1)).login(loginDTO.getEmail(), loginDTO.getPassword());
    }





}
