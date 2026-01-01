// file: ReportDetailViewModel.swift

import Foundation

@MainActor
final class ReportDetailViewModel: ObservableObject {
    @Published var report: AutomationReport?
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?

    func loadReport(id: String, token: String) async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            let result = try await APIClient.shared.fetchReportDetail(id: id, token: token)
            report = result
        } catch let error as APIError {
            errorMessage = error.localizedDescription
        } catch {
            errorMessage = "Unexpected error: \(error.localizedDescription)"
        }
    }
}
