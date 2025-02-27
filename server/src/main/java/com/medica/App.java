package com.medica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // Această adnotare indică Spring Boot că această clasă este punctul de intrare
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);  // Pornește aplicația Spring Boot
    }
}
