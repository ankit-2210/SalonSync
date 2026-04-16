package com.userservice.service.Impl;

import com.userservice.payload.dto.Credential;
import com.userservice.payload.dto.KeycloakRole;
import com.userservice.payload.dto.KeycloakUserDTO;
import com.userservice.payload.dto.SignDTO;
import com.userservice.payload.request.UserRequest;
import com.userservice.payload.response.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class KeycloakService {
    private static final String KEYCLOAK_BASE_URL="http://localhost:8080";

    private static final String TOKEN_URL=KEYCLOAK_BASE_URL+"/realms/master/protocol/openid-connect/token";
    private static final String KEYCLOAK_ADMIN_API=KEYCLOAK_BASE_URL+"/admin/realms/master/users";

    private static final String CLIENT_ID="salon-booking-client";
    private static final String CLIENT_SECRET="aDrAWfp3MNn4jjCg4yhEssyeQjvGQK6u";
    private static final String GRANT_TYPE="password";
    private static final String scope="openid";
    private static final String username="ankit";
    private static final String password="ankit";
    private static final String clientId="27cd4e64-72fc-4e6f-8ddf-12a1cc110a85";

    private final RestTemplate restTemplate;

    public void createUser(SignDTO signDTO) throws Exception{
        // Get admin access token
        String ACCESS_TOKEN = getAdminAccessToken(username, password, GRANT_TYPE, null).getAccessToken();

        // Prepare user credentials
        Credential credential = new Credential();
        credential.setType("password");
        credential.setValue(signDTO.getPassword());
        credential.setTemporary(false);

        // Prepare user request
        UserRequest userRequest=new UserRequest();
        userRequest.setUsername(signDTO.getUsername());
        userRequest.setEmail(signDTO.getEmail());
        userRequest.setEnabled(true);
        userRequest.setEmailVerified(true);

        String[] name = signDTO.getFullName().split(" ", 2);
        userRequest.setFirstName(name[0]);
        userRequest.setLastName(name.length > 1 ? name[1] : "");
        userRequest.getCredentials().add(credential);

        // Set headers
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setBearerAuth(ACCESS_TOKEN);

        HttpEntity<UserRequest> httpEntity = new HttpEntity<>(userRequest, httpHeaders);
        ResponseEntity<String> responseEntity = restTemplate.exchange(KEYCLOAK_ADMIN_API, HttpMethod.POST, httpEntity, String.class);
        if(responseEntity.getStatusCode() != HttpStatus.CREATED) {
            throw new Exception("User creation failed: " + responseEntity.getBody());
        }
        System.out.println("User Created Successfully!!");

        // Fetch the newly created user's ID
        KeycloakUserDTO keycloakUserDTO = getFirstUserByUsername(signDTO.getUsername(), ACCESS_TOKEN);

        // Fetch role object by name
        KeycloakRole keycloakRole = getRoleByName(clientId, ACCESS_TOKEN, signDTO.getRole().toString());
        if (keycloakRole == null) {
            throw new Exception("Role not found: " + signDTO.getRole());
        }

        // Assign role to user
        assignRoleToUser(keycloakUserDTO.getId(), clientId, Collections.singletonList(keycloakRole), ACCESS_TOKEN);
        System.out.println("Role assigned successfully!");

    }

    public TokenResponse getAdminAccessToken(String username, String password, String grandType, String refreshToken) throws Exception {
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", grandType);
        requestBody.add("username", username);
        requestBody.add("password", password);
        requestBody.add("refresh_token", refreshToken);
        requestBody.add("client_id", CLIENT_ID);
        requestBody.add("client_secret", CLIENT_SECRET);
        requestBody.add("scope", scope);

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(requestBody, httpHeaders);
        ResponseEntity<TokenResponse> responseEntity = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, httpEntity, TokenResponse.class);
        if(responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null){
            return responseEntity.getBody();
        }
        throw new Exception("Failed to obtain access token");
    }

    public KeycloakRole getRoleByName(String clientId, String token, String role){
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/clients/" + clientId + "/roles/" + role;

        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer " + token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> httpEntity = new HttpEntity<>(httpHeaders);
        ResponseEntity<KeycloakRole> responseEntity = restTemplate.exchange(url, HttpMethod.GET, httpEntity, KeycloakRole.class);
        return responseEntity.getBody();
    }

    public KeycloakUserDTO getFirstUserByUsername(String username, String token) throws Exception {
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/users?username=" + username;

        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setBearerAuth(token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);
        ResponseEntity<KeycloakUserDTO[]> responseEntity = restTemplate.exchange(url, HttpMethod.GET, httpEntity, KeycloakUserDTO[].class);
        KeycloakUserDTO[] keycloakUserDTOS = responseEntity.getBody();
        if(keycloakUserDTOS != null && keycloakUserDTOS.length>0){
            return keycloakUserDTOS[0];
        }

        throw new Exception("User not found with username: " + username);
    }

    public void assignRoleToUser(String userId, String clientId, List<KeycloakRole> keycloakRoleList, String token) throws Exception {
        String url = KEYCLOAK_BASE_URL+"/admin/realms/master/users/" + userId + "/role-mappings/clients/" + clientId;

        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setBearerAuth(token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<KeycloakRole>> httpEntity = new HttpEntity<>(keycloakRoleList, httpHeaders);
        try{
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
        }
        catch (Exception e){
            throw new Exception ("Failed to assign new role " + e.getMessage());
        }
    }

    public KeycloakUserDTO getUserProfileByJwt(String token) throws Exception {
        String url = KEYCLOAK_BASE_URL + "/realms/master/protocol/openid-connect/userinfo";

        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.set("Authorization", token);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);
        try{
            ResponseEntity<KeycloakUserDTO> responseEntity = restTemplate.exchange(url, HttpMethod.GET, httpEntity, KeycloakUserDTO.class);
            return responseEntity.getBody();
        }
        catch (Exception e){
            throw new Exception("Failed to get user info: " + e.getMessage());
        }
    }

}




