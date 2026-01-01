// file: ReportsViewModel.swift

import Foundation

@MainActor
final class ReportsViewModel: ObservableObject {
    @Published var reports: [AutomationReport] = []
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?

    func loadReports(token: String) async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            let result = try await APIClient.shared.fetchReports(token: token)
            reports = result.sorted(by: { $0.timestampUTC > $1.timestampUTC })
        } catch let error as APIError {
            errorMessage = error.localizedDescription
        } catch {
            errorMessage = "Unexpected error: \(error.localizedDescription)"
        }
    }
}
