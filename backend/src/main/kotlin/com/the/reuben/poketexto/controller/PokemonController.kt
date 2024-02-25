// Kotlin
package com.the.reuben.poketexto.controller

import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import kotlin.random.Random


@RestController
class PokemonController {

    private val log = LoggerFactory.getLogger(PokemonController::class.java)

    @GetMapping("/guess/{pokemon}")
    fun guessPokemon(@PathVariable pokemon: String): ResponseEntity<Map<String, Any>> {
        if(pokemon.equals("win")) {
            return ResponseEntity.ok(mapOf("name" to "win", "integer" to 1))
        }
        // Logic to generate the integer goes here
        val integer = Random.nextInt(1, 100)
        log.info("Generated integer: $integer")
        return ResponseEntity.ok(mapOf("name" to pokemon, "integer" to integer))
    }
}