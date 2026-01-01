// file: ReportsListView.swift

import SwiftUI

struct ReportsListView: View {
    @EnvironmentObject private var appState: AppState
    @StateObject private var viewModel = ReportsViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading && viewModel.reports.isEmpty {
                    ProgressView("Loading reports...")
                        .progressViewStyle(.circular)
                } else if let error = viewModel.errorMessage {
                    VStack(spacing: 12) {
                        Text("Failed to load reports.")
                            .font(.headline)
                        Text(error)
                            .font(.footnote)
                            .foregroundColor(.secondary)
                        Button("Retry") {
                            reload()
                        }
                    }
                    .padding()
                } else if viewModel.reports.isEmpty {
                    Text("No reports available.")
                        .foregroundColor(.secondary)
                } else {
                    List(viewModel.reports) { report in
                        NavigationLink(value: report.id) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(report.summary)
                                    .font(.headline)
                                Text(report.timestampUTC)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .refreshable {
                        reload()
                    }
                }
            }
            .navigationTitle("Reports")
            .navigationDestination(for: String.self) { reportId in
                ReportDetailView(reportId: reportId)
            }
            .onAppear {
                if viewModel.reports.isEmpty {
                    reload()
                }
            }
        }
    }

    private func reload() {
        guard let token = appState.authToken else { return }
        Task {
            await viewModel.loadReports(token: token)
        }
    }
}
