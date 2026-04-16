package com.salonservice.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.salonservice.modal.Salon;
import com.salonservice.payload.dto.SalonDto;
import com.salonservice.payload.dto.UserDto;
import com.salonservice.payload.response.ApiResponse;
import com.salonservice.repository.SalonRepository;
import com.salonservice.service.Impl.SalonServiceCB;
import com.salonservice.service.SalonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(SalonController.class)
public class SalonControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SalonService salonService;

    @MockitoBean
    private SalonServiceCB salonServiceCB;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreateSalon() throws Exception{
        SalonDto salonDto = new SalonDto();
        salonDto.setName("Test Salon");

        UserDto userDto = new UserDto();
        userDto.setId(1L);

        ApiResponse<UserDto> userResponse = new ApiResponse<>(true, "success", userDto);
        Salon salon = new Salon();
        salon.setName("Test Salon");

        when(salonServiceCB.getUserProfile(anyString())).thenReturn(userResponse);
        when(salonService.createSalon(any(SalonDto.class), any(UserDto.class))).thenReturn(salon);

        mockMvc.perform(post("/api/salons")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(salonDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Salon Created Successfully"));
    }

    @Test
    void testCreateSalonUserFailed() throws Exception {
        ApiResponse<UserDto> userResponse = new ApiResponse<>(true, "User fetch failed", null);

        when(salonServiceCB.getUserProfile(anyString())).thenReturn(userResponse);
        mockMvc.perform(post("/api/salons")
                        .header("Authorization", "token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false));
    }

}
