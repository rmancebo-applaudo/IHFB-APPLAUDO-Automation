import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly completedClassesSection: Locator;
  readonly completedClassesChart: Locator;
  readonly completedClassesText: Locator;
  readonly averageSection: Locator;
  readonly averageChart: Locator;
  readonly secondAverageChart: Locator;
  readonly thirdAverageChart: Locator;
  readonly fourthAverageChart: Locator;
  readonly averageText: Locator;
  readonly questionsCompletionSection: Locator;
  readonly questionsCompletionChart: Locator;
  readonly secondQuestionsCompletionChart: Locator;
  readonly thirdQuestionsCompletionChart: Locator;
  readonly fourthQuestionsCompletionChart: Locator;
  readonly questionsCompletionText: Locator;
  readonly expandCollapseButtons: Locator;
  readonly activitiesCompletionSection: Locator;
  readonly activitiesCompletionChart: Locator;
  readonly secondActivitiesCompletionChart: Locator;
  readonly thirdActivitiesCompletionChart: Locator;
  readonly fourthActivitiesCompletionChart: Locator;
  readonly activitiesCompletionText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page
      .getByRole('heading', { level: 1 })
      .filter({ hasText: 'Panel de control' });

    this.completedClassesSection = page.locator("xpath=//section[@aria-label='Clases completadas']");
    this.completedClassesChart = this.completedClassesSection
      .locator("xpath=.//*[local-name()='svg' and @height='105']");
    this.completedClassesText = this.completedClassesSection
      .locator("xpath=.//h3[text()='Clases completadas']");

    this.averageSection = page.locator("xpath=//section[@aria-label='Promedio de tasa de respuestas correctas']");
    this.averageChart = this.averageSection
      .locator("xpath=.//*[local-name()='svg']").first();
    this.secondAverageChart = this.averageSection
      .locator("xpath=.//*[local-name()='svg']").nth(1);
    this.thirdAverageChart = this.averageSection
      .locator("xpath=.//*[local-name()='svg']").nth(2);
    this.fourthAverageChart = this.averageSection
      .locator("xpath=.//*[local-name()='svg']").nth(3);
    this.averageText = this.averageSection
      .locator("xpath=.//h3[text()='Promedio de tasa de respuestas correctas']");

    this.questionsCompletionSection = page.locator("xpath=//section[@aria-label='Tasa de finalización de preguntas']");
    this.questionsCompletionChart = this.questionsCompletionSection
      .locator("xpath=.//*[local-name()='svg']").first();
    this.secondQuestionsCompletionChart = this.questionsCompletionSection
      .locator("xpath=.//*[local-name()='svg']").nth(1);
    this.thirdQuestionsCompletionChart = this.questionsCompletionSection
      .locator("xpath=.//*[local-name()='svg']").nth(2);
    this.fourthQuestionsCompletionChart = this.questionsCompletionSection
      .locator("xpath=.//*[local-name()='svg']").nth(3);
    this.questionsCompletionText = this.questionsCompletionSection
      .locator("xpath=.//h3[text()='Tasa de finalización de preguntas']");

    this.activitiesCompletionSection = page.locator("xpath=//section[@aria-label='Tasa de finalización de actividades']");
    this.activitiesCompletionChart = this.activitiesCompletionSection
      .locator("xpath=.//*[local-name()='svg']").first();
    this.secondActivitiesCompletionChart = this.activitiesCompletionSection
      .locator("xpath=.//*[local-name()='svg']").nth(1);
    this.thirdActivitiesCompletionChart = this.activitiesCompletionSection
      .locator("xpath=.//*[local-name()='svg']").nth(2);
    this.fourthActivitiesCompletionChart = this.activitiesCompletionSection
      .locator("xpath=.//*[local-name()='svg']").nth(3);
    this.activitiesCompletionText = this.activitiesCompletionSection
      .locator("xpath=.//h3[text()='Tasa de finalización de actividades']");

    this.expandCollapseButtons = page
      .getByRole('article', { name: /Ver detalles por unidad/ })
      .getByRole('button')
      .filter({ hasText: /.+/ });
  }

  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.dashboardHeading.waitFor({ state: 'visible' });
  }
}
