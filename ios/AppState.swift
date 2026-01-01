// file: AppState.swift

import Foundation

final class AppState: ObservableObject {
    @Published var authToken: String? = nil {
        didSet {
            if let token = authToken {
                try? KeychainService.shared.storeToken(token)
            } else {
                try? KeychainService.shared.clearToken()
            }
        }
    }

    init() {
        // Attempt to load existing token from Keychain at startup.
        if let existing = try? KeychainService.shared.loadToken() {
            authToken = existing
        }
    }

    func logout() {
        authToken = nil
    }
}
