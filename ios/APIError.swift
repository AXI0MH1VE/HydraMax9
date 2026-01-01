// file: APIError.swift

import Foundation

enum APIError: Error, LocalizedError {
    case invalidURL
    case invalidResponse
    case unauthorized
    case decodingFailed
    case serverError(statusCode: Int)
    case unknown(Error)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "The server URL is invalid."
        case .invalidResponse:
            return "Received an invalid response from the server."
        case .unauthorized:
            return "Authentication failed. Please log in again."
        case .decodingFailed:
            return "Could not decode data from the server."
        case .serverError(let code):
            return "Server returned error with status code \(code)."
        case .unknown(let error):
            return "Unknown error: \(error.localizedDescription)"
        }
    }
}
