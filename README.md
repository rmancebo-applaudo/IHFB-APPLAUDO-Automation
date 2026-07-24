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

---

## Running Tests

| Command | Description |
|---|---|
| `npx playwright test` | Run all tests (headless) |
| `npx playwright test --headed` | Run all tests with browser visible |
| `npx playwright test --project=chromium` | Run on Chromium only |
| `npx playwright test --ui` | Open Playwright UI mode |
| `npx playwright show-report` | Open the last HTML report |

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
