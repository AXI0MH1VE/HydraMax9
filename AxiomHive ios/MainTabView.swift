// file: MainTabView.swift

import SwiftUI

struct MainTabView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        TabView {
            ReportsListView()
                .tabItem {
                    Label("Reports", systemImage: "doc.text.magnifyingglass")
                }

            RunTriggerView()
                .tabItem {
                    Label("Runs", systemImage: "play.circle")
                }

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
        }
    }
}
