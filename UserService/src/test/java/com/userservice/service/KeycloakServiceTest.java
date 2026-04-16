package com.userservice.service;

import com.userservice.payload.dto.KeycloakRole;
import com.userservice.payload.dto.KeycloakUserDTO;
import com.userservice.payload.response.TokenResponse;
import com.userservice.service.Impl.KeycloakService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import java.util.*;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class KeycloakServiceTest {
    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private KeycloakService keycloakService;

    // test token api
    @Test
    void testGetAdminAccessToken() throws Exception {
        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken("token");

        ResponseEntity<TokenResponse> responseEntity = new ResponseEntity<>(tokenResponse, HttpStatus.OK);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(TokenResponse.class))).thenReturn(responseEntity);

        TokenResponse res = keycloakService.getAdminAccessToken("user", "pass", "password", null);
        assertEquals("token", res.getAccessToken());
    }

    // test token failure
    @Test
    void testGetAdminAccessTokenFailure() throws Exception {
        ResponseEntity<TokenResponse> responseEntity = new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(TokenResponse.class))).thenReturn(responseEntity);

        assertThrows(Exception.class, ()-> keycloakService.getAdminAccessToken("u", "p", "password", null));
    }

    // test get user by username
    @Test
    void testGetFirstUserByUsername() throws Exception{
        KeycloakUserDTO keycloakUserDTO = new KeycloakUserDTO();
        keycloakUserDTO.setId("123");

        ResponseEntity<KeycloakUserDTO[]> responseEntity = new ResponseEntity<>(new KeycloakUserDTO[]{keycloakUserDTO}, HttpStatus.OK);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(KeycloakUserDTO[].class))).thenReturn(responseEntity);

        KeycloakUserDTO result = keycloakService.getFirstUserByUsername("ankit", "token");
        assertEquals("123", result.getId());
    }

    // test get user - not found
    @Test
    void testGetFirstUserByUsernameNotFound() throws Exception{
        ResponseEntity<KeycloakUserDTO[]> responseEntity = new ResponseEntity<>(new KeycloakUserDTO[]{}, HttpStatus.OK);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(KeycloakUserDTO[].class))).thenReturn(responseEntity);

        assertThrows(Exception.class, ()-> keycloakService.getFirstUserByUsername("ankit", "token"));
    }

    // test role fetch
    @Test
    void testGetRoleNyName(){
        KeycloakRole keycloakRole = new KeycloakRole();
        keycloakRole.setName("ADMIN");

        ResponseEntity<KeycloakRole> responseEntity = new ResponseEntity<>(keycloakRole, HttpStatus.OK);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(KeycloakRole.class))).thenReturn(responseEntity);

        KeycloakRole result = keycloakService.getRoleByName("client", "token", "ADMIN");
        assertEquals("ADMIN", result.getName());
    }

}
