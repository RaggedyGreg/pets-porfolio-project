# Pet Manager

[![CI/CD Pipeline](https://github.com/RaggedyGreg/pets-porfolio-project/actions/workflows/ci.yml/badge.svg)](https://github.com/RaggedyGreg/pets-porfolio-project/actions/workflows/ci.yml)
[![Deploy to Vercel](https://github.com/RaggedyGreg/pets-porfolio-project/actions/workflows/deploy.yml/badge.svg)](https://github.com/RaggedyGreg/pets-porfolio-project/actions/workflows/deploy.yml)
[![codecov](https://codecov.io/gh/RaggedyGreg/pets-porfolio-project/branch/main/graph/badge.svg)](https://codecov.io/gh/RaggedyGreg/pets-porfolio-project)

> A modern pet management SPA showcasing React best practices, TypeScript patterns, and performance optimization.

### 🚀 [View Live Demo](https://pet-app-portfolio-c5wm0soha-gregory-loginows-projects.vercel.app)

> 📖 **Want to dive deeper?** Check out [PORTFOLIO.md](PORTFOLIO.md) for an in-depth technical breakdown, architectural decisions, and learning outcomes.

## 📊 Key Metrics

| Metric | Value |
|--------|-------|
| **Bundle Size Reduction** | 61.8% (329 KB → 126 KB) |
| **Test Coverage** | 113 tests passing (100%) |
| **Performance** | 3.3x faster initial load |
| **Accessibility** | WCAG AA compliant |

---

## 💡 What This Demonstrates

**React & TypeScript Expertise**
- Advanced TypeScript patterns (discriminated unions, type guards)
- Performance optimization (useMemo, useCallback, React.memo)
- Code splitting and lazy loading

**Software Architecture**
- Strategy Pattern for extensible pet-specific logic
- SOLID principles and clean architecture
- Zero-modification extensibility (add new pet types without changing existing code)

**Quality & Testing**
- 113 tests covering components, hooks, and business logic
- TDD approach with comprehensive coverage
- Accessibility testing (keyboard navigation, ARIA, screen readers)

**Modern Tooling**
- CI/CD with GitHub Actions
- Automatic deployment to Vercel
- ESLint, Prettier, and code quality automation

---

## ✨ Features

🔍 **Real-time Search** • 🎯 **Type Filters** • 🌓 **Dark Mode** • ♿ **Accessibility** • 🌐 **i18n (EN/ES)** • 📱 **Responsive**

---

## 🛠️ Tech Stack

**Frontend:** React 18 • TypeScript 4.9 • Material-UI 5 • React Router 6 • i18next  
**Testing:** Jest • React Testing Library • MSW  
**DevOps:** GitHub Actions • Vercel • Codecov

---

## 🏗️ Architecture Highlights

### Strategy Pattern
Extensible health calculation system using Strategy Pattern:

```typescript
// Different strategies for different pet types
HealthStrategyFactory
  ├── DogHealthStrategy   → weight / (height × length)
  ├── CatHealthStrategy   → weight / (height × length × lives)
  └── BirdHealthStrategy  → wingspan / (weight × feathers)
```

### TypeScript Discriminated Unions
Type-safe pet handling with compiler-enforced checks:

```typescript
type Pet = DogPet | CatPet | BirdPet;

function isDog(pet: Pet): pet is DogPet {
  return pet.kind === "dog";
}

// TypeScript knows the exact type inside the block
if (isDog(pet)) {
  console.log(pet.breed); // ✅ Type-safe access
}
```

### Performance Optimization
React memoization preventing unnecessary re-renders:

```typescript
// Memoized filtering
const filteredData = useMemo(() => 
  filterPets(data.rows, searchQuery, petTypeFilter),
  [data.rows, searchQuery, petTypeFilter]
);

// Memoized components with custom comparison
export default React.memo(PetTableRow, (prev, next) => 
  prev.pet.id === next.pet.id && prev.pet.name === next.pet.name
);
```

**Why These Patterns?**
- ✅ **Extensibility** - Add new pet types without modifying existing code
- ✅ **Type Safety** - Compiler catches errors before runtime
- ✅ **Performance** - Optimized rendering for large lists
- ✅ **Testability** - Isolated, unit-testable strategies

---

## 🚀 Quick Start

```bash
git clone https://github.com/RaggedyGreg/pets-porfolio-project.git
cd pets-porfolio-project
npm install
npm start
```

**Available Commands:**
- `npm start` - Development server
- `npm test` - Run test suite
- `npm run build` - Production build
- `npm run lint` - Code quality check

---

## 🎯 Adding New Pet Types

The architecture makes extensibility trivial:

```typescript
// 1. Define type
interface RabbitPet extends BasePet {
  kind: "rabbit";
  ear_length: number;
}

// 2. Create strategy
class RabbitHealthStrategy implements HealthStrategy {
  calculate(pet: RabbitPet): HealthStatus {
    return pet.ear_length > 10 ? "healthy" : "unhealthy";
  }
}

// 3. Register
strategies.set("rabbit", new RabbitHealthStrategy());
```

**No existing code needs modification.** TypeScript ensures type safety, and the Strategy Pattern handles the rest.

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Health, Layout, PetTableRow)
├── hooks/            # Custom hooks (useFetch, useFetchDetail)
├── interfaces/       # TypeScript types and type guards
├── strategies/       # Strategy Pattern implementations
│   └── health/       # Pet-specific health calculation strategies
├── locales/          # i18n translations (EN/ES)
└── views/            # Page components (Home, Detail, NoMatch)
```

---

## 🤝 Connect

**Gregory Loginow**  
[GitHub](https://github.com/RaggedyGreg) • [Live Demo](https://pet-app-portfolio-c5wm0soha-gregory-loginows-projects.vercel.app)

---

<div align="center">

**Built with** React • TypeScript • Material-UI • Jest • GitHub Actions • Vercel

MIT License

</div>
