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
  readonly sendButtons: Locator;
  readonly lessonUnitHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Libreta de fallos', level: 1 });
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
    this.sendButtons = page.getByRole('button', { name: /Enviar/ });
    this.lessonUnitHeading = page.locator('xpath=//h6').first();
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.heading.waitFor({ state: 'visible' });
  }
}
