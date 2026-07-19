package com.keystone;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

        String hash = encoder.encode("Admin@123");

        System.out.println("Generated Hash:");
        System.out.println(hash);
    }
}