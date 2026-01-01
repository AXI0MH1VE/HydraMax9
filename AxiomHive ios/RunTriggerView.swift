// file: RunTriggerView.swift

import SwiftUI

struct RunTriggerView: View {
    @EnvironmentObject private var appState: AppState
    @StateObject private var viewModel = RunTriggerViewModel()

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("Trigger Gemini Automation Run")
                    .font(.title2)
                    .multilineTextAlignment(.center)

                if let status = viewModel.lastRunStatus {
                    Text(status)
                        .font(.subheadline)
                        .padding()
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(8)
                }

                if let error = viewModel.errorMessage {
                    Text(error)
                        .foregroundColor(.red)
                        .font(.footnote)
                        .multilineTextAlignment(.center)
                }

                Button {
                    trigger()
                } label: {
                    if viewModel.isRunning {
                        ProgressView()
                            .frame(maxWidth: .infinity)
                    } else {
                        Text("Run Now")
                            .frame(maxWidth: .infinity)
                    }
                }
                .padding()
                .background(Color.accentColor)
                .foregroundColor(.white)
                .cornerRadius(8)
                .disabled(viewModel.isRunning || appState.authToken == nil)

                Spacer()
            }
            .padding()
            .navigationTitle("Runs")
        }
    }

    private func trigger() {
        guard let token = appState.authToken else { return }
        Task {
            await viewModel.triggerRun(token: token)
        }
    }
}
