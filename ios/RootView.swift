// file: RootView.swift

import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        Group {
            if let _ = appState.authToken {
                MainTabView()
            } else {
                LoginView()
            }
        }
    }
}
