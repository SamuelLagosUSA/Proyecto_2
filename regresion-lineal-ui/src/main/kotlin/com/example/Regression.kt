package com.example

data class Point(val x: Double, val y: Double)
data class PointsRequest(val points: List<Point>)
data class RegressionResponse(val m: Double, val b: Double, val equation: String)

fun linearRegression(points: List<Point>): RegressionResponse {
    if (points.size < 2) throw IllegalArgumentException("Se requieren al menos dos puntos")

    val n = points.size
    val sumX = points.sumOf { it.x }
    val sumY = points.sumOf { it.y }
    val sumXY = points.sumOf { it.x * it.y }
    val sumX2 = points.sumOf { it.x * it.x }

    val denominator = (n * sumX2 - sumX * sumX)
    if (denominator == 0.0) throw IllegalArgumentException("No se puede calcular la pendiente: todas las x son iguales")

    val m = (n * sumXY - sumX * sumY) / denominator
    val b = (sumY - m * sumX) / n
    val equation = "y = %.6fx + %.6f".format(m, b)

    return RegressionResponse(m, b, equation)
}
