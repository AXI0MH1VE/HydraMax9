// file: Models.swift

import Foundation

struct LoginRequest: Codable {
    let username: String
    let password: String
}

struct LoginResponse: Codable {
    let token: String
}

struct AutomationItem: Codable, Identifiable {
    let id: String
    let title: String
    let detail: String
    let severity: String
}

struct AutomationReport: Codable, Identifiable {
    let id: String
    let timestampUTC: String
    let summary: String
    let items: [AutomationItem]

    enum CodingKeys: String, CodingKey {
        case id
        case timestampUTC = "timestamp_utc"
        case summary
        case items
    }
}

struct ReportsListResponse: Codable {
    let reports: [AutomationReport]
}

struct TriggerRunResponse: Codable {
    let runId: String
    let status: String
}
