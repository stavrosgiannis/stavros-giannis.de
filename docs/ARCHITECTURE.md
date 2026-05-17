# Architecture Refactoring Documentation

## Overview

The codebase has been refactored from a component-centric architecture to a **modular, data-driven architecture**. This improves maintainability, scalability, and testability.

## New Directory Structure

```
src/
├── components/              # Pure UI components (presentation only)
│   ├── common/              # Shared components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Particle.js
│   │   └── Pre.js
│   ├── layout/              # Layout wrapper components
│   │   ├── SectionLayout.js
│   │   ├── PageLayout.js
│   │   └── index.js
│   ├── ui/                  # Reusable UI widgets
│   │   ├── ProjectCard.js
│   │   ├── SkillIcon.js
│   │   └── index.js
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   └── Resume/
│
├── pages/                   # Full page components (route handlers)
│   ├── Projects.js
│   └── [Other pages...]
│
├── context/                 # Global state management
│   └── PortfolioContext.js
│
├── hooks/                   # Custom React hooks
│   ├── useWindowSize.js
│   ├── useMobileDetect.js
│   ├── useScrollPosition.js
│   └── index.js
│
├── data/                    # Content and configuration files
│   ├── portfolio.data.js    # Portfolio metadata
│   ├── projects.data.js     # Projects content
│   ├── skills.data.js       # Skills and tools
│   ├── navigation.config.js # Routes and navigation
│   └── index.js
│
└── App.js                   # Root component with providers
```

## Key Improvements

### 1. **Data Layer** (`src/data/`)

All static content is now centralized in data files:

```javascript
// src/data/projects.data.js
export const PROJECTS_DATA = [
  {
    id: "wlan-csi-ai",
    title: "WLAN-CSI AI",
    description: "An AI project focusing on WLAN Channel State Information.",
    // ...
  },
];
```

**Benefits:**
- ✅ Single source of truth for content
- ✅ Easy to add/update/remove items
- ✅ Can be replaced with API calls without component changes
- ✅ Type-safe with clear structure

### 2. **Context API** (`src/context/PortfolioContext.js`)

Global state management via React Context:

```javascript
// Usage in any component
const { projects, skills, routes } = usePortfolio();
```

**Benefits:**
- ✅ No prop drilling
- ✅ Centralized data access
- ✅ Easy to add global features (themes, user preferences)
- ✅ Memoized for performance

### 3. **Custom Hooks** (`src/hooks/`)

Reusable logic extracted into custom hooks:

```javascript
// Hook for window resizing
const { width, height } = useWindowSize();

// Hook for mobile detection
const isMobile = useMobileDetect(768);

// Hook for scroll tracking
const { position, direction, isScrolled } = useScrollPosition();
```

**Benefits:**
- ✅ Reusable across components
- ✅ Cleaner component code
- ✅ Testable independently
- ✅ Follows React best practices

### 4. **Layout Components** (`src/components/layout/`)

Wrapper components for consistent page structure:

```javascript
// Usage
<SectionLayout className="project-section" id="projects" showParticles={true}>
  {children}
</SectionLayout>
```

**Benefits:**
- ✅ Consistent layout across pages
- ✅ DRY (Don't Repeat Yourself)
- ✅ Easy to change global layout patterns
- ✅ Particle background management centralized

### 5. **UI Components** (`src/components/ui/`)

Reusable, isolated UI widgets:

```javascript
<ProjectCard project={projectData} />
<SkillIcon name="React" icon={ReactIcon} />
```

**Benefits:**
- ✅ Highly reusable
- ✅ PropTypes validation
- ✅ Easy to test
- ✅ Clear component contracts

## Migration Guide

### Before (Mixed concerns):
```javascript
// Old component - data + presentation mixed
function Projects() {
  const projects = [
    { title: "WLAN-CSI AI", ... }, // Hardcoded data
  ];
  
  return (
    <Container>
      <Particle />
      <h1>My Works</h1>
      {/* Rendering logic */}
    </Container>
  );
}
```

### After (Separation of concerns):
```javascript
// New component - presentation only
function Projects() {
  const { projects } = usePortfolio(); // Data from context
  
  return (
    <SectionLayout className="project-section">
      <h1 className="project-heading">
        My Recent <strong className="purple">Works</strong>
      </h1>
      <Row>
        {projects.map((project) => (
          <Col key={project.id}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </SectionLayout>
  );
}
```

## Usage Examples

### Example 1: Access Portfolio Data
```javascript
import { usePortfolio } from "../context/PortfolioContext";

function MyComponent() {
  const { portfolio, socials, projects } = usePortfolio();
  
  return (
    <div>
      <h1>{portfolio.name}</h1>
      <p>Email: {portfolio.email}</p>
    </div>
  );
}
```

### Example 2: Use Custom Hooks
```javascript
import { useMobileDetect, useWindowSize } from "../hooks";

function ResponsiveComponent() {
  const isMobile = useMobileDetect();
  const { width } = useWindowSize();
  
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

### Example 3: Create Layout
```javascript
import { SectionLayout } from "../components/layout";

function MySection() {
  return (
    <SectionLayout className="my-section" id="my-section">
      <h2>My Content</h2>
    </SectionLayout>
  );
}
```

## Configuration

### Update Routes
Edit `src/data/navigation.config.js`:

```javascript
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/project",
  RESUME: "/resume",
  // Add new routes here
};
```

### Update Resume Access Code
Edit `src/data/navigation.config.js`:

```javascript
export const RESUME_CONFIG = {
  accessCode: "YourNewCode", // Change this
  accessCodeMessage: "Enter access code to view resume",
  denialMessage: "Access denied. Incorrect code.",
};
```

### Add New Projects
Edit `src/data/projects.data.js`:

```javascript
export const PROJECTS_DATA = [
  {
    id: "project-1",
    title: "Project Title",
    description: "Project description",
    image: "image.png",
    github: "https://github.com/...",
    demo: "https://demo.com",
    tags: ["tag1", "tag2"],
    featured: true,
  },
  // Add more projects
];
```

## Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Maintainability** | Hard - data mixed with components | Easy - clear separation |
| **Scalability** | Difficult to add features | Simple to extend |
| **Reusability** | Low - components tightly coupled | High - modular design |
| **Testing** | Hard to test logic separately | Easy - testable units |
| **API Integration** | Requires component changes | Just update data files |
| **Code Organization** | Scattered across components | Centralized and organized |

## Next Steps

### Phase 3-4 (Optional):
- [ ] Add TypeScript for type safety
- [ ] Create utils/ folder for helper functions
- [ ] Add constants.js for magic strings
- [ ] Move inline styles to CSS modules

### Phase 5-6 (Optional):
- [ ] Refactor remaining pages (Home, About, Resume)
- [ ] Create styles/ folder for centralized CSS
- [ ] Add component documentation

### Phase 7 (Optional):
- [ ] Connect to backend API
- [ ] Add Redux/Zustand if needed
- [ ] Add error boundaries
- [ ] Add analytics

## Troubleshooting

### "usePortfolio must be used within PortfolioProvider"
**Solution:** Ensure `<PortfolioProvider>` wraps your component tree in `App.js`

### Import paths too long
**Solution:** Use index.js re-exports:
```javascript
// Instead of:
import ProjectCard from "../components/ui/ProjectCard";

// Use:
import { ProjectCard } from "../components/ui";
```

## Questions?

Refer to the specific section above or check the individual component files for documentation.
