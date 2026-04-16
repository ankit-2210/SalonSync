package com.salonservice.service;

import com.salonservice.modal.Salon;
import com.salonservice.payload.dto.SalonDto;
import com.salonservice.payload.dto.UserDto;
import com.salonservice.repository.SalonRepository;
import com.salonservice.service.Impl.SalonServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import java.util.*;

import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SalonServiceImplTest {

    @Mock
    private SalonRepository salonRepository;

    @InjectMocks
    private SalonServiceImpl salonService;

    // test - create new salon
    @Test
    void testCreateSalon(){
        SalonDto salonDto = new SalonDto();
        salonDto.setName("Test Salon");
        salonDto.setCity("Kolkata");

        UserDto userDto = new UserDto();
        userDto.setId(1L);

        Salon salon = new Salon();
        salon.setName("Test Salon");

        when(salonRepository.save(any(Salon.class))).thenReturn(salon);
        // when
        Salon res = salonService.createSalon(salonDto, userDto);
        // then
        assertNotNull(res);
        assertEquals("Test Salon", res.getName());
        verify(salonRepository, times(1)).save(any(Salon.class));
    }

    // test - update salon
    @Test
    void testUpdateSalon() throws Exception {
        Salon salon = new Salon();
        salon.setId(1L);
        salon.setOwnerId(1L);

        SalonDto salonDto = new SalonDto();
        salonDto.setName("Updated Salon");
        UserDto userDto = new UserDto();
        userDto.setId(1L);

        when(salonRepository.findById(1L)).thenReturn(Optional.of(salon));
        when(salonRepository.save(any(Salon.class))).thenReturn(salon);
        // when
        Salon res = salonService.updateSalon(salonDto, userDto, 1L);
        // then
        assertEquals("Updated Salon", res.getName());
        verify(salonRepository).save(salon);
    }

    // test - update salon UNAUTHORIZED
    @Test
    void testUpdateSalonUnauthorized() throws Exception {
        Salon salon = new Salon();
        salon.setId(1L);
        salon.setOwnerId(2L);

        UserDto userDto = new UserDto();
        userDto.setId(1L);

        when(salonRepository.findById(1L)).thenReturn(Optional.of(salon));

        Exception exception = assertThrows(Exception.class, ()->
                salonService.updateSalon(new SalonDto(), userDto, 1L));
        assertEquals("You are not authorized to update this salon", exception.getMessage());
    }

    // test - update salon (Not Found)
    @Test
    void testUpdateSalonNotFound(){
        when(salonRepository.findById(1L)).thenReturn(Optional.empty());
        Exception exception = assertThrows(Exception.class, ()-> salonService.updateSalon(new SalonDto(), new UserDto(), 1L));
        assertTrue(exception.getMessage().contains("Salon not found"));
    }

    // test - get all salons
    @Test
    void testGetAllSalons(){
        when(salonRepository.findAll()).thenReturn(List.of(new Salon(), new Salon()));
        // when
        List<Salon> salons = salonService.getAllSalons();
        // then
        assertEquals(2, salons.size());
        verify(salonRepository).findAll();
    }

    // test - get salon by id
    @Test
    void testGetSalonById() throws Exception{
        Salon salon = new Salon();
        salon.setId(1L);

        when(salonRepository.findById(1L)).thenReturn(Optional.of(salon));
        // when
        Salon res = salonService.getSalonById(1L);
        // then
        assertNotNull(res);
        assertEquals(1L, res.getId());
    }

    // test = get salon by not found
    @Test
    void testGetSalonByIdNotFound(){
        when(salonRepository.findById(1L)).thenReturn(Optional.empty());
        // when + test
        Exception exception = assertThrows(Exception.class, ()-> salonService.getSalonById(1L));
        assertEquals("Salon not exist!", exception.getMessage());
    }

    // test - get salon by ownerId
    @Test
    void testGetSalonByOwnerId() throws Exception{
        when(salonRepository.findByOwnerId(1L)).thenReturn(List.of(new Salon(), new Salon()));
        // when
        List<Salon> salons = salonService.getSalonByOwnerId(1L);
        // then
        assertEquals(2, salons.size());
        verify(salonRepository).findByOwnerId(1L);
    }

    // search salon by city
    @Test
    void testSearchSalonByCity(){
        when(salonRepository.searchSalons("Kolkata")).thenReturn(List.of(new Salon()));
        List<Salon> salons = salonService.searchSalonByCity("Kolkata");
        assertEquals(1, salons.size());
        verify(salonRepository).searchSalons("Kolkata");
    }

}
