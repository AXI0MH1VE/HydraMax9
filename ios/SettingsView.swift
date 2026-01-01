// file: SettingsView.swift

import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Account")) {
                    Button(role: .destructive) {
                        appState.logout()
                    } label: {
                        Text("Log Out")
                    }
                }

                Section(header: Text("About")) {
                    HStack {
                        Text("App")
                        Spacer()
                        Text("GeminiOps")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Version")
                        Spacer()
                        Text("1.0.0")
                            .foregroundColor(.secondary)
                    }
                }
            }
            .navigationTitle("Settings")
        }
    }
}
