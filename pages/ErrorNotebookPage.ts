import { type Page, type Locator } from '@playwright/test';

export class ErrorNotebookPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly mainContent: Locator;
  readonly navigationLinks: Locator;
  readonly actionButtons: Locator;
  readonly dateCard: Locator;
  readonly submitIncorrectAnswerHeading: Locator;
  readonly classUnitsColumn: Locator;
  readonly contentColumn: Locator;
  readonly successRateColumn: Locator;
  readonly sendButtonsColumn: Locator;
  readonly tableRows: Locator;
  readonly sendButton: Locator;
  readonly lessonUnitHeading: Locator;
  readonly classButtonsWithDate: Locator;
  readonly headingText: Locator;
  readonly solveAnswersText: Locator;
  readonly solveLaterBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Libreta de fallos', level: 1 });
    this.headingText = page.locator('p.MDSText--variant_h6:has-text("Libreta de fallos")');
    this.mainContent = page.getByRole('main');
    this.navigationLinks = page.getByRole('navigation').getByRole('link');
    this.actionButtons = page.getByRole('main').getByRole('button');
    this.dateCard = page.getByText(/\d{4}-\d{2}-\d{2}/).first();
    this.submitIncorrectAnswerHeading = page.getByRole('heading', { name: 'Enviar respuesta incorrecta' });
    this.classUnitsColumn = page.getByRole('columnheader', { name: 'Lista de unidades de clase' });
    this.contentColumn = page.getByRole('columnheader').filter({ hasText: 'Contenido' }).first();
    this.successRateColumn = page.getByRole('columnheader', { name: /Tasa de aciertos/ });
    this.sendButtonsColumn = page.getByRole('columnheader', { name: 'Enviar' }).first();
    this.tableRows = page.getByRole('row');
    this.sendButton = page.locator("xpath=//*[contains(@class,'7a7wn8')]");
    this.lessonUnitHeading = page.locator('xpath=//h6').first();
    this.classButtonsWithDate =page.locator('xpath=//a[@title="Abre una nueva ventana"]')
    this.solveAnswersText =page.locator("xpath=//h2[text()='Resolver respuestas incorrectas']")
    this.solveLaterBtn =page.locator("xpath=//button[text()='Resolver después']")
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
    // Try to wait for heading role first, fallback to text if not found
    await Promise.race([
      this.heading.waitFor({ state: 'visible' }).catch(() => null),
      this.headingText.waitFor({ state: 'visible' }).catch(() => null)
    ]);
  }

  async clickClassButtonWithDate(index: number = 0) {
    // Find buttons that have a date within them (contains date pattern)
    const button = this.classButtonsWithDate.filter({ hasText: /\d{4}-\d{2}-\d{2}/ }).nth(index);
    await button.waitFor({ state: 'visible' });
    return await button.click();
  }

}
