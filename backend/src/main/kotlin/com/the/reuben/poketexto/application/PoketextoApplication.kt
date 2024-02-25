package com.the.reuben.poketexto

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.CrossOrigin
import org.slf4j.LoggerFactory

@SpringBootApplication
class PoketextoApplication

private val log = LoggerFactory.getLogger(PoketextoApplication::class.java)

fun main(args: Array<String>) {
	log.info("Starting PoketextoApplication")
	runApplication<PoketextoApplication>(*args)
}
