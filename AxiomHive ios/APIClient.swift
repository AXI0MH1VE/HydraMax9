// file: APIClient.swift

import Foundation

final class APIClient {
    static let shared = APIClient()

    private let baseURL = URL(string: "https://your-backend.example.com")! // Set to your backend
    private let session: URLSession

    private init() {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 15
        configuration.timeoutIntervalForResource = 30
        configuration.waitsForConnectivity = true
        self.session = URLSession(configuration: configuration)
    }

    // MARK: - Public methods

    func login(username: String, password: String) async throws -> String {
        let requestBody = LoginRequest(username: username, password: password)
        let url = baseURL.appendingPathComponent("/auth/login")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONEncoder().encode(requestBody)

        let (data, response) = try await session.data(for: request)
        try validateStatus(response: response)

        do {
            let decoded = try JSONDecoder().decode(LoginResponse.self, from: data)
            return decoded.token
        } catch {
            throw APIError.decodingFailed
        }
    }

    func fetchReports(token: String) async throws -> [AutomationReport] {
        let url = baseURL.appendingPathComponent("/reports")
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

        let (data, response) = try await session.data(for: request)
        try validateStatus(response: response)

        do {
            let decoded = try JSONDecoder().decode(ReportsListResponse.self, from: data)
            return decoded.reports
        } catch {
            throw APIError.decodingFailed
        }
    }

    func fetchReportDetail(id: String, token: String) async throws -> AutomationReport {
        let url = baseURL.appendingPathComponent("/reports/\(id)")
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

        let (data, response) = try await session.data(for: request)
        try validateStatus(response: response)

        do {
            return try JSONDecoder().decode(AutomationReport.self, from: data)
        } catch {
            throw APIError.decodingFailed
        }
    }

    func triggerRun(token: String) async throws -> TriggerRunResponse {
        let url = baseURL.appendingPathComponent("/runs")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

        let (data, response) = try await session.data(for: request)
        try validateStatus(response: response)

        do {
            return try JSONDecoder().decode(TriggerRunResponse.self, from: data)
        } catch {
            throw APIError.decodingFailed
        }
    }

    // MARK: - Helpers

    private func validateStatus(response: URLResponse?) throws {
        guard let http = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }
        switch http.statusCode {
        case 200..<300:
            return
        case 401:
            throw APIError.unauthorized
        default:
            throw APIError.serverError(statusCode: http.statusCode)
        }
    }
}
