// file: HydraMax9App.swift

import SwiftUI

@main
struct HydraMax9App: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
        }
    }
}
