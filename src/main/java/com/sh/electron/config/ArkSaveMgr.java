package com.sh.electron.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class ArkSaveMgr {

	public static void main(String[] args) {
		
		SpringApplication.run(ArkSaveMgr.class, args);
	}
	
	@GetMapping("/hi/{name}")
	public String hi(@PathVariable String name)
	{
		return "Hi ".concat(name);
	}
	
}
