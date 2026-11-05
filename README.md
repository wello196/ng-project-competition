# Angular 22 Project Competition Platform

A modern, scalable, enterprise-grade **Project Competition Management Platform** built with **Angular 22**. The platform provides full lifecycle management for innovation challenges, participant registrations, project submissions, dynamic CRUD administration, and real-time dashboard analytics.

The application strictly follows an **Enterprise Layered Architecture**, segmenting codebase responsibilities into `core` (singletons, guards, validators, API constants, models, services), `shared` (reusable UI feedback components, loaders, pipes), and `pages` (feature routes and view modules).

---

## 🔗 Live Demo

Experience the live application online:

🚀 [**View Live Demo**](https://ng-project-competition-three.vercel.app/home)

---

## 📋 Table of Contents

* [Project Overview](#-project-overview)
* [Main Features](#-main-features)
* [Technologies & Tech Stack](#-technologies--tech-stack)
* [Architecture & Design Patterns](#-architecture--design-patterns)
* [Folder Structure](#-folder-structure)
* [Data Models & Contracts](#-data-models--contracts)
* [Reactive Forms & Custom Domain Validators](#-reactive-forms--custom-domain-validators)
* [Role-Based Access Control (RBAC) & Guards](#-role-based-access-control-rbac--guards)
* [Services & State Management](#-services--state-management)
* [Shared UI Components & Custom Pipes](#-shared-ui-components--custom-pipes)
* [Pages & Route Configuration](#-pages--route-configuration)
* [Installation & Setup](#-installation--setup)

---

## 🌟 Project Overview

The **Project Competition Platform** provides an arena for creators, developers, and engineers to register, explore challenges, submit project repositories, and compete for recognition. Meanwhile, administrators benefit from an analytics dashboard and inline modal/tabular CRUD interfaces to manage challenge lifecycles.

Built on top of **Angular 22**, the platform demonstrates modern framework primitives including **Signals**, `@defer` block lazy loading, functional route guards (`CanActivateFn`), component input binding for route parameters, and reactive form validation.

---

## ✨ Main Features

* **Layered Clean Architecture:** Strict decoupling across `core` (infrastructure, auth, domain models), `shared` (reusable presentation components & pipes), and `pages` (isolated route modules).
* **Role-Based Access Control (RBAC):** Protects routes using functional guards (`authGuard`, `adminGuard`, `alreadyLoggedIn`) with hardcoded administrator ID validation.
* **Angular Signals & Reactive State:** Built-in session state management using signals (`signal`, `computed`) synchronized with browser `localStorage`.
* **Advanced Reactive Form Validations:** Cross-field form group validators (`PasswordMatch`, `CompareDateValidator`) and custom control validators (`NoNumber`).
* **Deferred UI Loading (`@defer`):** Smooth performance optimization using native Angular `@defer (when ...)` blocks with `@placeholder` fallback loaders for heavy data tables and dashboard cards.
* **Paginated Challenge List:** Pagination logic with progressive loading (`CHUNK_SIZE`) implemented via computed signals in `ViewCompetitions`.
* **Dynamic Route Binding:** Utilizes `provideRouter(routes, withComponentInputBinding())` to map dynamic path parameters (`:competitionId`) directly into component `input.required()` signals.
* **Reusable UI Feedback System:** Modular presentation controls (`Alert`, `Success`, `Loader`, `Cautious`) for unified feedback and demo credential guidance.

---

## 🛠️ Technologies & Tech Stack

* **Framework:** Angular 22.0.0 (`@angular/core`, `@angular/common`, `@angular/router`, `@angular/forms`)
* **HTTP Client:** `@angular/common/http` (`HttpClient`, `provideHttpClient()`)
* **Reactivity:** Angular Signals (`signal`, `computed`, `input`) & RxJS (`~7.8.0`)
* **Language:** TypeScript (`~6.0.2`)
* **Styling:** Custom CSS with responsive layouts, modal overlays, CSS grid tables, and status badges
* **Build Tooling:** `@angular/build` (`^22.0.7`), `@angular/cli` (`^22.0.7`), Vitest (`^4.0.8`)

---

## 🏛️ Architecture & Design Patterns

```
+-----------------------------------------------------------------------------------+
|                               Root Application                                    |
|                                 (app-navbar)                                      |
+-----------------------------------------+-----------------------------------------+
                                          |
                   +----------------------+----------------------+
                   |                                             |
                   v                                             v
+-------------------------------------+       +-------------------------------------+
|             Core Layer              |       |            Shared Layer             |
+-------------------------------------+       +-------------------------------------+
| • Services (User, Competition)      |       | • Presentation Components           |
| • Functional Guards (RBAC)          |       |   (Alert, Success, Loader, Cautious)|
| • Domain Models & DTOs              |       | • Custom Utility Pipes              |
| • Form Group & Field Validators     |       |   (FirstWordPipe)                   |
| • API Configuration Constants       |       +-------------------------------------+
+-------------------------------------+                          |
                   |                                             |
                   +----------------------+----------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                              Pages Layer (Features)                               |
| • Home               • Login                 • Register        • Competitions     |
| • SubmitProject      • Dashboard Analytics   • Students        • Unauthorized     |
+-----------------------------------------------------------------------------------+
```

---

## 📂 Folder Structure

```
src/
├── app/
│   ├── core/
│   │   ├── components/
│   │   │   └── navbar/               # Header navigation with reactive auth dropdown
│   │   ├── constants/
│   │   │   └── Api.constant.ts       # Global REST API endpoint constants
│   │   ├── guards/
│   │   │   └── auth-guard.ts         # Functional route guards (authGuard, adminGuard, alreadyLoggedIn)
│   │   ├── models/
│   │   │   ├── competiton-model.ts   # CreateCompetition & CompetitionResponse DTOs
│   │   │   ├── login-payload.ts      # Authentication payload contract
│   │   │   ├── register-payload.ts   # Registration payload contract
│   │   │   └── user-data.ts          # User entity model interface
│   │   ├── Services/
│   │   │   ├── competition-service.ts# HTTP REST client for challenges & submissions
│   │   │   └── user-service.ts       # Authentication & user profile state manager
│   │   └── validators/
│   │       ├── compare-date.validator.ts  # Cross-field start/end date validation
│   │       ├── no-number.validator.ts     # Control text validator preventing numeric characters
│   │       └── password-match.validator.ts# Password & confirmation matching validator
│   ├── shared/
│   │   ├── components/
│   │   │   ├── alert/                # Form validation error notification
│   │   │   ├── cautious/             # Demo credentials & system banner panel
│   │   │   ├── loader/               # Animated busy/spinner feedback control
│   │   │   └── success/              # Action success alert dialog component
│   │   └── pipes/
│   │       └── first-word-pipe.ts    # Extracts first name from full user name string
│   └── pages/
│       ├── competition/              # Admin CRUD competition management & sub-components
│       │   ├── components/
│       │   └── view-competitions/    # Paginated challenge grid list view
│       ├── dashboard/                # System analytics & metric breakdown dashboard
│       │   ├── model/                # DashboardModel interface definition
│       │   └── services/             # DashboardService REST endpoint handler
│       ├── home/                     # Public landing hero section & deferred competitions viewer
│       ├── login/                    # User authentication sign-in page
│       ├── register/                 # Account creation page with role selection
│       ├── submit-project/           # Challenge submission form mapped via dynamic competition ID
│       ├── students/                 # Student directory route component
│       ├── projects/                 # Projects directory route component
│       └── unauthorized/             # HTTP 403 Forbidden error handling view
```

---

## 📄 Data Models & Contracts

### 1. `UserData` (`user-data.ts`)
```typescript
export interface UserData {
  userId: number;
  fullName: string;
  email: string;
  password: string;
  collegeName: string;
  role: string;
}
```

### 2. `CompetitionResponse` & `CreateCompetition` (`competiton-model.ts`)
```typescript
export interface CreateCompetition {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface CompetitionResponse {
  competitionId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}
```

### 3. `DashboardModel` (`dashboardModel.ts`)
```typescript
export interface DashboardModel {
  totalUsers: number;
  totalCompetitions: number;
  ongoingCompetitions: number;
  completedCompetitions: number;
  upcomingCompetitions: number;
  totalProjectSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
  winnersDeclared: number;
}
```

---

## 🧪 Reactive Forms & Custom Domain Validators

The platform leverages Angular's `FormBuilder.nonNullable` to construct reactive forms with strong typing and custom validation rules:

### 1. `CompareDateValidator` (`compare-date.validator.ts`)
Ensures competition start dates precede end dates across form controls.
```typescript
export class CompareDateValidator {
  static compareDates(date1: string, date2: string) {
    return (form: AbstractControl) => {
      const start = form.get(date1)?.value;
      const end = form.get(date2)?.value;
      if (!start || !end) return null;
      return new Date(start).getTime() > new Date(end).getTime() ? { dateNotMatch: true } : null;
    };
  }
}
```

### 2. `PasswordMatch` (`password-match.validator.ts`)
Validates equality between `password` and `confirmPassword` controls inside a nested `passwordGroup`.
```typescript
export class PasswordMatch {
  static checkPasswordMatch(password: string, confirmPassword: string) {
    return (form: AbstractControl) => {
      const p = form.get(password)?.value;
      const cp = form.get(confirmPassword)?.value;
      if (!p || !cp) return null;
      return p === cp ? null : { passwordNotMatch: true };
    };
  }
}
```

### 3. `NoNumber` (`no-number.validator.ts`)
Restricts string inputs (e.g., `fullName`, `collegeName`) from containing numeric digits.
```typescript
export class NoNumber {
  static noNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    return /[0-9]/.test(control.value) ? { hasNumber: true } : null;
  }
}
```

---

## 🔒 Role-Based Access Control (RBAC) & Guards

Functional Angular guards (`CanActivateFn`) secure the platform's routes based on authentication status and administrator privilege checks:

```typescript
// auth-guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return localStorage.getItem('userId') ? true : (router.navigate(['login']), false);
};

export const alreadyLoggedIn: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return !localStorage.getItem('userId') ? true : (router.navigate(['home']), false);
};

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');
  return (userId === '1021' || userId === '1022') ? true : (router.navigate(['unauthorized']), false);
};
```

---

## ⚡ Services & State Management

### `UserService` (`user-service.ts`)
Manages global session state via Angular Signals (`tokenId`, `isLoggedIn`, `userName`), restoring user tokens from `localStorage` upon initialization.

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private httpClient = inject(HttpClient);
  tokenId = signal<number | null | string>(localStorage.getItem('userId'));
  isLoggedIn = signal<boolean>(Boolean(localStorage.getItem('userId')));
  userName = signal('');

  constructor() {
    if (this.tokenId()) { this.getUser().subscribe(); }
  }

  setToken(userId: number) {
    const idStr = userId.toString();
    localStorage.setItem('userId', idStr);
    this.tokenId.set(idStr);
    this.isLoggedIn.set(true);
    this.getUser().subscribe();
  }

  onUserLogout() {
    localStorage.removeItem('userId');
    this.isLoggedIn.set(false);
  }
  
  // REST operations for Login, Register, & Profile retrieval...
}
```

---

## 🧩 Shared UI Components & Custom Pipes

* **`FirstWordPipe` (`first-word-pipe.ts`):** Transforms full user string names into single first names for personalized navbar greetings (`{{ userName() | firstWord }}`).
* **`Alert` Component (`app-alert`):** Renders inline form validation warnings and backend API error messages.
* **`Success` Component (`app-success`):** Displays positive confirmation messages after project submission.
* **`Loader` Component (`app-loader`):** Standard spinner animation used as placeholder content inside `@defer` blocks.
* **`Cautious` Component (`app-cautious`):** Provides contextual guidance and admin demo login credentials (`collegeAdmin@gmail.com`).

---

## 🚀 Pages & Route Configuration

| Path | Component | Guard(s) | Description |
| :--- | :--- | :--- | :--- |
| `/` | Redirects to `/home` | - | Default route fallback |
| `/home` | `Home` | None | Landing hero page with deferred challenge list |
| `/login` | `Login` | `alreadyLoggedIn` | User sign-in interface with demo credentials hint |
| `/register` | `Register` | `alreadyLoggedIn` | Participant registration with custom form validation |
| `/competitions` | `Competition` | `adminGuard` | Tabular & Modal CRUD challenge management panel |
| `/competitions/submit-project/:competitionId` | `SubmitProject` | `authGuard` | Challenge project repository submission interface |
| `/dashboard` | `Dashboard` | `adminGuard` | Real-time platform metric analytics breakdown |
| `/students` | `Students` | None | Student directory view |
| `/projects` | `Projects` | None | Projects gallery view |
| `/unauthorized` | `Unauthorized` | None | HTTP 403 Access Denied view |

---

## 💻 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/project-competition.git
   cd project-competition
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm start
   # or
   ng serve
   ```
   Navigate to `http://localhost:4200/`.

4. **Build for Production:**
   ```bash
   npm run build
   ```

5. **Run Unit Tests:**
   ```bash
   npm test
   ```
