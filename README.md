# IHFB-APPLAUDO Automation

End-to-end test automation suite for the [GOES IHFB](https://goes.ihfb.ai/) platform, built with [Playwright](https://playwright.dev/) and TypeScript using the **Page Object Model (POM)** design pattern.

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

---

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rmancebo-applaudo/IHFB-APPLAUDO-Automation.git
   cd IHFB-APPLAUDO-Automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Configure test credentials**
   - Copy `.env.example` to `.env` and add Stage credentials
   - Copy `.env.production.example` to `.env.production` and add Production credentials
   - **Important**: `.env` and `.env.production` are git-ignored and should never be committed

---

## Test Credentials

Test credentials are stored securely in environment-specific `.env` files:

- **`.env`** - Stage credentials (git-ignored, not committed)
- **`.env.production`** - Production credentials (git-ignored, not committed)
- **`.env.example`** - Template for Stage credentials (committed)
- **`.env.production.example`** - Template for Production credentials (committed)

### Available Credential Variables

```env
# Student credentials (can have multiple)
STUDENT_EMAIL_1=...
STUDENT_EMAIL_2=...
STUDENT_PASSWORD=...
STUDENT_NAME=Student     # Expected display name in test assertions

# Teacher credentials (optional)
TEACHER_EMAIL=...
TEACHER_PASSWORD=...
```

Credentials are loaded automatically based on the active environment (`TEST_ENV`) and used in tests via the `config/credentials.ts` helper.

---

## Running Tests

### Available Test Commands

| Command | Description | Environment |
|---|---|---|
| `npm test` | Run all tests (default) | Stage (default) |
| `npm run test:stage` | Run all tests on Stage | Stage |
| `npm run test:production` | Run all tests on Production | Production |
| `npm run test:headed` | Run all tests with browser visible | Stage |
| `npm run test:headed:production` | Run all tests with browser visible | Production |
| `npm run test:debug` | Run in debug mode | Stage |
| `npm run test:ui` | Open Playwright UI mode | Stage |

### Environment Configuration

Tests support multiple environments with automatic URL switching:

- **Stage (Default)**: `http://aprendes.stage.aidt.app`
- **Production**: `https://aprendes.edu.gob.sv`

#### Configuration Files:
- **`.env`** - Default Stage configuration
- **`.env.production`** - Production configuration (loaded when `TEST_ENV=production`)

#### Running Tests on Different Environments

```bash
# Run on Stage (default)
npm test

# Run on Production
npm run test:production

# Custom environment via command line
TEST_ENV=production npx playwright test --headed
TEST_ENV=stage npx playwright test --ui
```



---

## Project Structure

```
├── pages/                      # Page Object Model classes
│   ├── LoginPage.ts            # Login page interactions
│   └── ClassroomListPage.ts    # Classroom list (home) page interactions
│
├── tests/                      # Test specs
│   └── login.spec.ts           # EI-T138: Home screen validation (student)
│
├── playwright.config.ts        # Playwright configuration (baseURL, browsers, etc.)
└── package.json
```

### Page Objects

**`LoginPage`**  
Encapsulates the login form at `/`. Exposes locators for the email input, password input, and login button, plus a `login(email, password)` action method.

**`ClassroomListPage`**  
Encapsulates the student home screen at `/class-room`. Exposes locators for the page title, heading, year label, date button, account menu, logout option, and classroom list items. Provides `classroomItemTitle(nth)` and `classroomItemIcon(nth)` to scope assertions to individual classroom cards.

---

## Test Cases

| Test ID | File | Description |
|---|---|---|
| EI-T138 | `tests/login.spec.ts` | Validates the student home screen: landing page display, login flow, and presence of title, date, classroom list with icons and titles, and the account/logout menu. |

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value |
|---|---|
| `baseURL` | `https://goes.ihfb.ai/` |
| `headless` | `false` (headed by default) |
| `trace` | `on-first-retry` |
| Browsers | Chromium, Firefox, WebKit |
