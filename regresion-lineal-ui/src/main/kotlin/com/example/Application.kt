package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.jackson.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.content.*
import io.ktor.server.http.content.default
import io.ktor.server.http.content.staticResources

fun main() {
    embeddedServer(Netty, port = 8085) {
        install(ContentNegotiation) {
            jackson()
        }

        routing {
            staticResources("/", "static") {
                default("index.html")
            }

            post("/regression") {
                val req = call.receive<PointsRequest>()
                try {
                    val result = linearRegression(req.points)
                    call.respond(result)
                } catch (e: IllegalArgumentException) {
                    call.respond(mapOf("error" to (e.message ?: "error")))
                } catch (e: Exception) {
                    call.respond(mapOf("error" to "error interno: ${e.message}"))
                }
            }
        }
    }.start(wait = true)
}
