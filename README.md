# HydraMax9

**AXIOM HIVE Deterministic Substrate System** by AXI0MH1VE

HydraMax9 is a cutting-edge AI-powered system featuring a modern React web interface and iOS mobile app, integrated with Google's Gemini AI for advanced intelligence capabilities.

## 🚀 Features

### Web Application
- **Modern Desktop UI** with brutalist design aesthetics
- **Bootstrap Sequence** with system initialization animation
- **Gemini AI Integration** with deep thinking capabilities
- **Modular Architecture** with dedicated views:
  - Overview Dashboard
  - Tactical AI Chat
  - Intelligence Search with grounding
  - Kernel Command Interface
- **Real-time System Telemetry** and performance monitoring
- **Security Module** for system protection
- **Neural Graph Visualization**

### iOS Application
- Native SwiftUI app for iOS 17+
- JWT authentication with Keychain storage
- MVVM architecture
- Reports management
- Settings and configuration
- Secure API integration

## 📋 Prerequisites

### For Web Application
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### For iOS Application
- macOS with Xcode 15+
- iOS 17.0+ deployment target
- Valid Apple Developer account (for device deployment)

## 🛠️ Installation & Setup

### Web Application

1. **Clone the repository**
   ```bash
   git clone https://github.com/AXI0MH1VE/HydraMax9.git
   cd HydraMax9
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```
   The production build will be in the `dist/` directory.

### iOS Application

1. **Open the iOS project**
   ```bash
   cd ios
   open HydraMax9.xcodeproj
   ```
   (Note: Project files are currently in the `AxiomHive ios` directory)

2. **Configure the project**
   - Set your development team in Xcode
   - Update the bundle identifier if needed

3. **Build and run**
   - Select a simulator or connected device
   - Press ⌘R to build and run

## 📦 Project Structure

```
HydraMax9/
├── src/                      # Web application source code
│   ├── components/           # React components
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── BootstrapSequence.tsx  # System boot animation
│   │   ├── AIChat.tsx        # AI chat interface
│   │   ├── Terminal.tsx      # Command terminal
│   │   ├── SecurityModule.tsx # Security monitoring
│   │   └── views/            # View components
│   ├── services/             # Service layer
│   │   └── geminiService.ts  # Gemini AI integration
│   ├── __tests__/            # Test files
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main app component
│   └── index.tsx             # Application entry point
├── ios/                      # iOS application (currently "AxiomHive ios")
│   ├── *.swift               # Swift source files
│   └── ...
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.cjs           # Jest test configuration
├── package.json              # Node.js dependencies and scripts
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🧪 Testing

### Run tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

## 🔍 Code Quality

### Linting
```bash
npm run lint
```

### Auto-fix linting issues
```bash
npm run lint:fix
```

### Type checking
```bash
npm run type-check
```

## 🏗️ Technology Stack

### Web Application
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN)
- **AI Integration**: Google Gemini AI (@google/genai)
- **Icons**: Lucide React
- **Testing**: Jest with ts-jest
- **Linting**: ESLint with TypeScript support

### iOS Application
- **Language**: Swift
- **Framework**: SwiftUI
- **Architecture**: MVVM
- **Security**: Keychain Services
- **Networking**: URLSession with JWT authentication

## 🔧 Configuration

### Gemini AI Models
The application uses two Gemini models:
- **gemini-3-pro-preview**: For complex reasoning with deep thinking (32K token budget)
- **gemini-3-flash-preview**: For fast search-grounded queries

### Environment Variables
See `.env.example` for all available configuration options.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- All tests pass (`npm test`)
- Code is properly linted (`npm run lint`)
- TypeScript types are correct (`npm run type-check`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔐 Security

- Never commit your `.env` file or API keys
- Keep your Gemini API key secure and private
- The iOS app uses Keychain for secure credential storage
- Report security vulnerabilities privately to the repository owner

## 📞 Support

For issues, questions, or contributions, please:
- Open an issue on GitHub
- Contact the repository owner: AXI0MH1VE

## 🎨 Design Philosophy

HydraMax9 embodies:
- **Brutalist architectural purity**
- **Deterministic certainty** with zero-entropy substrates
- **Log-Quadric Acceleration Model**: L(n) = e^(0.0839 * n^2)
- **Fixed Point Supervision**: Alexis Adams as Axiomatic Supervisor

---

**Built with ⚡ by AXI0MH1VE**
