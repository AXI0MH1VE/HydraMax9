// file: ReportDetailView.swift

import SwiftUI

struct ReportDetailView: View {
    let reportId: String

    @EnvironmentObject private var appState: AppState
    @StateObject private var viewModel = ReportDetailViewModel()

    var body: some View {
        Group {
            if viewModel.isLoading && viewModel.report == nil {
                ProgressView("Loading report...")
            } else if let error = viewModel.errorMessage {
                VStack(spacing: 12) {
                    Text("Failed to load report.")
                        .font(.headline)
                    Text(error)
                        .font(.footnote)
                        .foregroundColor(.secondary)
                }
                .padding()
            } else if let report = viewModel.report {
                List {
                    Section(header: Text("Summary")) {
                        Text(report.summary)
                        Text(report.timestampUTC)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }

                    Section(header: Text("Items")) {
                        ForEach(report.items) { item in
                            VStack(alignment: .leading, spacing: 4) {
                                HStack {
                                    Text(item.title)
                                        .font(.headline)
                                    Spacer()
                                    Text(item.severity.uppercased())
                                        .font(.caption)
                                        .foregroundColor(color(for: item.severity))
                                }
                                Text(item.detail)
                                    .font(.subheadline)
                            }
                        }
                    }
                }
            } else {
                Text("No data.")
                    .foregroundColor(.secondary)
            }
        }
        .navigationTitle("Report Detail")
        .onAppear {
            guard let token = appState.authToken else { return }
            Task {
                await viewModel.loadReport(id: reportId, token: token)
            }
        }
    }

    private func color(for severity: String) -> Color {
        switch severity.lowercased() {
        case "info":
            return .blue
        case "warning":
            return .orange
        case "error":
            return .red
        default:
            return .gray
        }
    }
}
