// file: GeminiOpsApp.swift

import SwiftUI

@main
struct GeminiOpsApp: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
        }
    }
}
