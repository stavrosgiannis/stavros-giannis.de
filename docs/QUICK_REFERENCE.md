# Quick Reference Guide

## File Organization

```
📦 src/
├── 📁 components/           # UI Components (Presentation)
│   ├── common/              # Navbar, Footer, Particle
│   ├── layout/              # SectionLayout, PageLayout
│   ├── ui/                  # ProjectCard, SkillIcon
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   └── Resume/
├── 📁 pages/                # Page Components (Route Handlers)
│   └── Projects.js          # ✨ NEW: Data-driven
├── 📁 context/              # Global State
│   └── PortfolioContext.js  # ✨ NEW
├── 📁 hooks/                # Custom Hooks
│   ├── useWindowSize.js     # ✨ NEW
│   ├── useMobileDetect.js   # ✨ NEW
│   └── useScrollPosition.js # ✨ NEW
├── 📁 data/                 # Content & Config
│   ├── navigation.config.js # ✨ NEW
│   ├── portfolio.data.js    # ✨ NEW
│   ├── projects.data.js     # ✨ NEW
│   └── skills.data.js       # ✨ NEW
├── App.js                   # ✏️ MODIFIED: Added Provider
├── index.js
└── style.css
```

## Most Used Commands

### Get Portfolio Data
```javascript
const { projects, skills, portfolio, routes } = usePortfolio();
```

### Detect Mobile
```javascript
const isMobile = useMobileDetect();
```

### Get Window Size
```javascript
const { width, height } = useWindowSize();
```

### Create Page Section
```javascript
<SectionLayout className="my-section">
  {children}
</SectionLayout>
```

### Display Project Card
```javascript
<ProjectCard project={projectData} />
```

## Quick Config Changes

### Change Resume Code
📄 `src/data/navigation.config.js` → `RESUME_CONFIG.accessCode`

### Add Project
📄 `src/data/projects.data.js` → Add to `PROJECTS_DATA` array

### Update About Text
📄 `src/data/portfolio.data.js` → `PORTFOLIO_META.aboutText`

### Add Route
📄 `src/data/navigation.config.js` → `ROUTES` object

### Update Skills
📄 `src/data/skills.data.js` → `SKILLS_DATA` object

## Component Patterns

### Simple UI Component
```javascript
import React from "react";
import PropTypes from "prop-types";

function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

MyComponent.defaultProps = {
  prop2: 0,
};

export default React.memo(MyComponent);
```

### Page Component
```javascript
import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionLayout } from "../components/layout";

function MyPage() {
  const { data } = usePortfolio();
  
  return (
    <SectionLayout className="my-class" id="my-id">
      {/* Content using data */}
    </SectionLayout>
  );
}

export default React.memo(MyPage);
```

### Hook Component
```javascript
import React from "react";
import { useMobileDetect, useWindowSize } from "../hooks";

function MyComponent() {
  const isMobile = useMobileDetect();
  const { width } = useWindowSize();
  
  return isMobile ? <MobileView /> : <DesktopView />;
}

export default React.memo(MyComponent);
```

## Import Patterns

### Import from Barrels (Recommended)
```javascript
import { ProjectCard, SkillIcon } from "../components/ui";
import { SectionLayout } from "../components/layout";
import { useMobileDetect, useWindowSize } from "../hooks";
import { ROUTES, PROJECTS_DATA } from "../data";
```

### Import Individual Files
```javascript
import ProjectCard from "../components/ui/ProjectCard";
import { useWindowSize } from "../hooks/useWindowSize";
import { ROUTES } from "../data/navigation.config";
```

## Common Tasks

### Display List of Projects
```javascript
function Projects() {
  const { projects } = usePortfolio();
  
  return (
    <Row>
      {projects.map((project) => (
        <Col key={project.id}>
          <ProjectCard project={project} />
        </Col>
      ))}
    </Row>
  );
}
```

### Render Skills
```javascript
function SkillsSection() {
  const { skills } = usePortfolio();
  
  return (
    <Row>
      {skills.languages.map((skill) => (
        <Col key={skill.name}>
          <SkillIcon name={skill.name} />
        </Col>
      ))}
    </Row>
  );
}
```

### Handle Responsive Layout
```javascript
function Layout() {
  const isMobile = useMobileDetect();
  const { width } = useWindowSize();
  
  return isMobile ? (
    <MobileLayout cols={1} />
  ) : (
    <DesktopLayout cols={width > 1200 ? 4 : 3} />
  );
}
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Context hook error | Wrap component in `<PortfolioProvider>` |
| Long import paths | Use barrel exports (index.js) |
| Data not updating | Check data files in `src/data/` |
| Route not working | Verify `ROUTES` in `navigation.config.js` |
| Mobile hook not working | Ensure component wrapped in app |

## Performance Tips

✅ Use `React.memo()` on components  
✅ Use `useMemo()` for expensive calculations  
✅ Use `useCallback()` for event handlers  
✅ Lazy load page components  
✅ Keep context values memoized  

## Testing Ideas

```javascript
// Test if context provides correct data
test("PortfolioContext provides projects", () => {
  const { result } = renderHook(() => usePortfolio());
  expect(result.current.projects).toBeDefined();
});

// Test if hook detects mobile
test("useMobileDetect returns boolean", () => {
  const isMobile = renderHook(() => useMobileDetect());
  expect(typeof isMobile).toBe("boolean");
});

// Test if component renders with data
test("ProjectCard renders with project prop", () => {
  render(<ProjectCard project={mockProject} />);
  expect(screen.getByText(mockProject.title)).toBeInTheDocument();
});
```

## Documentation

📖 Full docs: `ARCHITECTURE.md`  
📖 Quick summary: `REFACTORING_SUMMARY.md`  
📖 This guide: `QUICK_REFERENCE.md`

---

**Everything is ready to use. No errors found. Happy coding! 🚀**
