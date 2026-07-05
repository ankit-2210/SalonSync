package com.userservice.controller;

import org.springframework.web.bind.annotation.*;


@RestController
public class HomeController {
    @GetMapping
    public String HomeControllerHandler(){
        return "User microservices for salon booking";
    }

}
