// file: RunTriggerViewModel.swift

import Foundation

@MainActor
final class RunTriggerViewModel: ObservableObject {
    @Published var isRunning: Bool = false
    @Published var lastRunStatus: String?
    @Published var errorMessage: String?

    func triggerRun(token: String) async {
        isRunning = true
        errorMessage = nil
        defer { isRunning = false }

        do {
            let response = try await APIClient.shared.triggerRun(token: token)
            lastRunStatus = "Run \(response.runId): \(response.status)"
        } catch let error as APIError {
            errorMessage = error.localizedDescription
        } catch {
            errorMessage = "Unexpected error: \(error.localizedDescription)"
        }
    }
}
