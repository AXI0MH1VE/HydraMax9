# HydraMax9

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)

**AXIOM HIVE Deterministic AI Substrate & Intelligence Platform**

HydraMax9 is an advanced deterministic AI substrate designed for sovereign intelligence operations, featuring real-time performance monitoring, neural graph visualization, security entropy tracking, and Gemini AI integration.

## 🚀 Features

### Core Capabilities
- **Deterministic AI Substrate**: Mathematically grounded, reproducible AI operations
- **Real-time Performance Monitoring**: System telemetry, resource tracking, and anomaly detection
- **Neural Graph Visualization**: Dynamic visualization of AI processing pathways
- **Security Entropy Module**: Cryptographic entropy monitoring and threat detection
- **Gemini AI Integration**: Advanced language model capabilities with source attribution
- **Terminal Interface**: Command-line style interaction for system operations
- **Bootstrap Sequence**: Cinematic system initialization with status monitoring

### Technical Architecture
- **Frontend**: React 18 + TypeScript 5.3 + Vite
- **Styling**: TailwindCSS with custom brutalist design system
- **State Management**: React hooks with centralized app state
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier + TypeScript strict mode
- **CI/CD**: GitHub Actions for automated testing and deployment

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/AXI0MH1VE/HydraMax9.git
cd HydraMax9

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your environment variables
# Edit .env and add your Gemini API key and other settings
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Access the application at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck
```

## 📁 Project Structure

```
HydraMax9/
├── OneDrive/Desktop/HyHive/     # Main application directory
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── views/          # Page-level components
│   │   │   ├── AIChat.tsx
│   │   │   ├── BootstrapSequence.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── NeuralGraph.tsx
│   │   │   ├── PerformanceMonitor.tsx
│   │   │   ├── SecurityModule.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Terminal.tsx
│   │   ├── services/           # API and service integrations
│   │   │   └── geminiService.ts
│   │   ├── __tests__/          # Test files
│   │   ├── App.tsx             # Root component
│   │   ├── index.tsx           # Entry point
│   │   └── types.ts            # TypeScript type definitions
│   ├── index.html              # HTML template
│   └── vite.config.ts          # Vite configuration
├── AxiomHive ios/              # iOS companion app (Swift)
├── .github/workflows/          # CI/CD pipelines
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Background**: `#020202` (Deep Black)
- **Primary Accent**: `#06af6e` (UV Green)
- **Text**: UV Green with glow effects

### Visual Style
- **Aesthetic**: Brutalist + Cyberpunk
- **Typography**: Monospace fonts with UV glow
- **Effects**: CRT scanlines, phosphor glow, data stream animations

## 🔐 Environment Variables

See `.env.example` for all available configuration options. Key variables:

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key
- `VITE_API_BASE_URL`: Backend API endpoint
- `VITE_ENABLE_SECURITY_MODULE`: Enable/disable security monitoring
- `VITE_ENTROPY_THRESHOLD`: Cryptographic entropy threshold

## 🧪 Testing Strategy

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Service integrations and API calls
- **E2E Tests**: Critical user flows (planned)
- **Coverage Target**: >80% code coverage

## 📱 iOS Companion App

The `AxiomHive ios` directory contains a Swift-based iOS companion application with:
- Secure API client with keychain integration
- Report viewing and management
- Run trigger capabilities
- Settings and authentication

## 🚢 Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t hydramax9:latest .

# Run container
docker run -p 8080:80 hydramax9:latest
```

### Environment-Specific Builds
```bash
# Development
NODE_ENV=development npm run build

# Production
NODE_ENV=production npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author: Alexis M. Adams

**Axiom Hive**
- Email: devdollzai@gmail.com
- GitHub: [@AXI0MH1VE](https://github.com/AXI0MH1VE)
- Twitter: [@devdollzai](https://twitter.com/devdollzai)
- Website: [https://www.upwork.com/freelancers/~01bd41893585092ae6](https://www.upwork.com/freelancers/~01bd41893585092ae6)

## 🙏 Acknowledgments

- Google Gemini AI for advanced language capabilities
- React and TypeScript communities
- Open-source contributors

## 🔮 Roadmap

- [ ] Enhanced neural graph algorithms
- [ ] Multi-model AI orchestration
- [ ] Advanced anomaly detection ML models
- [ ] Distributed substrate architecture
- [ ] Real-time collaborative features
- [ ] Mobile app feature parity
- [ ] WebAssembly performance modules
- [ ] Quantum-resistant cryptography integration

## 📊 Status

![Build Status](https://img.shields.io/github/actions/workflow/status/AXI0MH1VE/HydraMax9/ci.yml?branch=master)
![Issues](https://img.shields.io/github/issues/AXI0MH1VE/HydraMax9)
![Pull Requests](https://img.shields.io/github/issues-pr/AXI0MH1VE/HydraMax9)

---

**Built with deterministic precision by Axiom Hive** ⚡
