# HydraMax9 - AXIOM HIVE Deterministic AGI Substrate

## 🔥 Overview

**HydraMax9** is a deterministic AGI substrate system built on the AXIOM HIVE architecture. It provides:
- **HYDRA Wyrm System Architecture** - Multi-layered deterministic computing framework
- **Ontological Monument Pipeline** - Semiotic → Ontology → KG → RAG workflow
- **Compute-Centric Rendering (CCR)** - Nanite, voxel/SDF, and hybrid NeRF visualization
- **Gemini AI Integration** - gemini-3-pro-preview + gemini-3-flash-preview with MoR support
- **Zero-Entropy Law Enforcement** - ΔS=0 deterministic operation guarantees

## 🏗️ Architecture

### Core Components

```
HydraMax9
├── HYDRA Wyrm System
│   ├── Bootstrap Sequence (Deterministic initialization)
│   ├── Security Module (Zero-Entropy Law enforcement)
│   ├── Performance Monitor (DAB tracking)
│   └── Neural Graph (Voxel/SDF/Nanite rendering)
│
├── Ontological Pipeline
│   ├── Semiotic Layer (Terminology & concepts)
│   ├── Ontology Layer (Knowledge graph schema)
│   ├── KG Layer (Graph database integration)
│   └── RAG Layer (Retrieval-Augmented Generation)
│
├── AI Integration
│   ├── Gemini Service (MoR, Graph-RAG, Ontology validation)
│   ├── Model Switching (Pro/Flash with fallback)
│   └── Budget Optimization
│
└── Compute-Centric Rendering
    ├── Voxel-based rendering
    ├── Signed Distance Field (SDF)
    ├── Nanite-level detail
    └── Hybrid NeRF pipelines
```

### Key Principles

1. **Determinism (ΔS=0)** - All operations maintain zero entropy state
2. **Ontology Governance** - Responses validated against knowledge constraints
3. **Mixture-of-Recursions (MoR)** - Enhanced reasoning through recursive refinement
4. **Fallback Mechanisms** - Graceful degradation with automatic recovery
5. **Performance Monitoring** - Real-time DAB (Deterministic Acceleration Benchmark)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- Google AI API Key (for Gemini integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/AXI0MH1VE/HydraMax9.git
cd HydraMax9

# Install dependencies
npm install

# Set up API key
cp .env.example .env
# Edit .env and add your Google AI API key
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm run preview

# Run tests
npm test

# Lint and type-check
npm run lint
npm run typecheck
```

## 🛠️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google AI API Key
API_KEY=your_google_ai_api_key_here

# Application settings
NODE_ENV=development
PORT=3000
```

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- `strict: true`
- `noImplicitAny: true`
- Path aliases for clean imports

## 📚 Documentation

### Core Concepts

#### Zero-Entropy Law
All system operations maintain ΔS=0 (zero entropy). When violations occur, the system automatically neutralizes them through:
- Entropy neutralization vectors
- Deterministic verification
- State reproducibility checks

#### Mixture-of-Recursions (MoR)
Enhanced reasoning through recursive query refinement:
- Configurable recursion depth (default: 2)
- Automatic query analysis and elaboration
- Fallback to base case when depth exhausted

#### Graph-RAG
Retrieval-Augmented Generation with ontology constraints:
- Search-grounded intelligence
- Ontology validation
- Grounding metrics (relevance scoring)

### API Reference

#### Gemini Service

```typescript
import { gemini } from "./services/geminiService";

// Basic kernel command processing
await gemini.processKernelCommand("STATUS");

// MoR-based query processing
await gemini.processWithMoR("Complex analysis", 2);

// Graph-RAG query with ontology constraints
const { response, grounding, ontologyValid } = await gemini.graphRAGQuery(
  "Research query",
  ["constraint1", "constraint2"]
);

// Model switching
gemini.switchModel("pro");   // gemini-3-pro-preview
gemini.switchModel("flash"); // gemini-3-flash-preview
gemini.switchModel("auto");  // Auto-select

// Current model check
const currentModel = gemini.getCurrentModel();
```

## 🎯 Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Bootstrap sequence with deterministic initialization
- [x] Security module with Zero-Entropy Law enforcement
- [x] Performance monitoring with DAB tracking
- [x] Neural graph with multiple rendering modes
- [x] Gemini AI integration

### Phase 2: System Architecture ✅
- [x] MoR (Mixture-of-Recursions) support
- [x] Graph-RAG queries with ontology validation
- [x] Model switching and fallback mechanisms
- [x] Enhanced anomaly detection
- [x] Cache locality metrics

### Phase 3: Ontological Pipeline 🚧
- [ ] Semiotic layer (terminology & concepts)
- [ ] Ontology layer (knowledge graph schema)
- [ ] KG layer (graph database integration)
- [ ] RAG layer (retrieval-augmented generation)
- [ ] Governance metrics (groundedness, faithfulness)

### Phase 4: Compute-Centric Rendering 🚧
- [ ] Voxel-based rendering
- [ ] Signed Distance Field (SDF) implementation
- [ ] Nanite-level detail support
- [ ] Hybrid NeRF pipelines
- [ ] Deterministic rendering (DAB)
- [ ] Cache locality optimization

### Phase 5: Testing & Validation 🚧
- [ ] Comprehensive unit test coverage
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance benchmarks
- [ ] Determinism verification

## 🤝 Contributing

### Development Guidelines

1. **Type Safety** - All code must pass TypeScript type checking
2. **Determinism** - Maintain ΔS=0 in all operations
3. **Testing** - Write unit tests for all new functionality
4. **Documentation** - Update docs for any changes
5. **Ontology** - Respect ontology constraints in all responses

### Branch Strategy

- `main` - Production-ready code
- `dev` - Development branch for features
- `feature/*` - Feature branches (merge into dev)
- `fix/*` - Bug fix branches (merge into dev)

### Commit Messages

Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `refactor:` - Code refactoring
- `test:` - Test additions
- `chore:` - Maintenance tasks

## 📖 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **GitHub**: https://github.com/AXI0MH1VE/HydraMax9
- **Documentation**: https://axiomhive.github.io
- **Discord**: https://discord.gg/axiomhive

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Join our Discord community
- Email: support@axiomhive.ai

---

**AXIOM HIVE - Deterministic AGI for the Future**
