package com.userservice.service.Impl;

import com.userservice.exception.ResourceNotFoundException;
import com.userservice.mapper.UserMapper;
import com.userservice.modal.User;
import com.userservice.payload.dto.KeycloakUserDTO;
import com.userservice.payload.dto.UserDto;
import com.userservice.repository.UserRepository;
import com.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final KeycloakService keycloakService;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDto getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserMapper.toDto(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));
        userRepository.delete(user);
    }

    @Override
    public UserDto updateUser(Long id, User user){
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setRole(user.getRole());
        existingUser.setUsername(user.getUsername());
        return UserMapper.toDto(userRepository.save(existingUser));
    }

    @Override
    public UserDto getUserFromJwt(String jwt) throws Exception {
        KeycloakUserDTO keycloakUserDTO = keycloakService.getUserProfileByJwt(jwt);
        User user = userRepository.findByEmail(keycloakUserDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + keycloakUserDTO.getEmail()));
        return UserMapper.toDto(user);
    }
}
