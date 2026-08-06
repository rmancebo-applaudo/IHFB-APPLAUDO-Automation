import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ClassroomListPage } from '../pages/ClassroomListPage';
import { ClassroomPage } from '../pages/ClassroomPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HeaderPage } from '../pages/HeaderPage';
import { TaskListPage } from '../pages/TaskListPage';
import { ErrorNotebookPage } from '../pages/ErrorNotebookPage';

const STUDENT_EMAIL = 'qa1s1@test.com';
const STUDENT_PASSWORD = 'test123';
const STUDENT_NAME = 'Student';

test('EI-T138 - Home/Pantalla de Inicio (Estudiante) - Validación general', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const headerPage = new HeaderPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante y validar la pantalla de inicio
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Título: Gestión de Aulas
  await expect(classroomListPage.gestionDeAulasTitle).toBeVisible();

  // Lista de Aulas heading
  await expect(classroomListPage.listaDeAulasHeading).toBeVisible();

  // Fecha
  await expect(classroomListPage.yearLabel).toBeVisible();
  await expect(classroomListPage.dateButton).toBeVisible();

  // Icono con el nombre del estudiante
  await expect(headerPage.accountButton).toBeVisible();

  // Opción de Cerrar Sesión
  await headerPage.openAccountMenu();
  await expect(headerPage.logOutButton).toBeVisible();
  await page.keyboard.press('Escape');

  // Botones para acceder al aula correspondiente - validar ícono y título por cada aula
  await classroomListPage.selectAllClassroomsTab();
  const itemCount = await classroomListPage.classroomItems.count();
  for (let i = 0; i < itemCount; i++) {
    await expect(classroomListPage.classroomItemTitle(i)).toBeVisible();
    await expect(classroomListPage.classroomItemIcon(i)).toBeVisible();
  }
});

test('EI-T140 - Home/Pantalla de Inicio (Estudiante) - Mover al espacio de clase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const classroomPage = new ClassroomPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Dar click en alguna de las clases disponibles
  await classroomListPage.selectAllClassroomsTab();
  const className = await classroomListPage.classroomItemTitle(0).innerText();
  await classroomListPage.clickClassroomItem(0);
  await classroomPage.waitForLoad();

  // El usuario navega al 'espacio de clase': información de la clase es visible
  await expect(classroomPage.classroomInfoRegion).toBeVisible();

  // El nombre de la clase seleccionada se muestra en la página
  await expect(classroomPage.classroomTitle).toHaveText(className);

  // Una lista del Trimestre disponible es visible
  await expect(classroomPage.trimesterList.first()).toBeVisible();
});

test('EI-T145 - Tablero (Estudiante) - Validación general', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const classroomPage = new ClassroomPage(page);
  const dashboardPage = new DashboardPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Seleccionar alguna de las clases listadas
  await classroomListPage.selectAllClassroomsTab();
  await classroomListPage.clickClassroomItem(0);
  await classroomPage.waitForLoad();

  // El 'Espacio de la Clase' se visualiza
  await expect(classroomPage.classroomInfoRegion).toBeVisible();

  // Step 4: En el panel izquierdo, seleccionar la opción 'Tablero'
  await classroomPage.navigateToMyProgress();
  await dashboardPage.waitForLoad();

  // La información del tablero se despliega correctamente

  // Gráficos
  // Clases completadas
  await expect(dashboardPage.completedClassesSection).toBeVisible();
  await expect(dashboardPage.completedClassesText).toBeVisible();
  if (await dashboardPage.completedClassesChart.count() > 0) {
    await expect(dashboardPage.completedClassesChart).toBeVisible();
  } else {
    await expect(dashboardPage.completedClassesSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Promedio de tasa de respuestas correctas
  await expect(dashboardPage.averageSection).toBeVisible();
  await expect(dashboardPage.averageText).toBeVisible();
  if (await dashboardPage.averageChart.count() > 0) {
    await expect(dashboardPage.averageChart).toBeVisible();
    await expect(dashboardPage.secondAverageChart).toBeVisible();
    await expect(dashboardPage.thirdAverageChart).toBeVisible();
    await expect(dashboardPage.fourthAverageChart).toBeVisible();
  } else {
    await expect(dashboardPage.averageSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Tasa de finalización de preguntas
  await expect(dashboardPage.questionsCompletionSection).toBeVisible();
  await expect(dashboardPage.questionsCompletionText).toBeVisible();
  if (await dashboardPage.questionsCompletionChart.count() > 0) {
    await expect(dashboardPage.questionsCompletionChart).toBeVisible();
    await expect(dashboardPage.secondQuestionsCompletionChart).toBeVisible();
    await expect(dashboardPage.thirdQuestionsCompletionChart).toBeVisible();
    await expect(dashboardPage.fourthQuestionsCompletionChart).toBeVisible();
  } else {
    await expect(dashboardPage.questionsCompletionSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Tasa de finalización de actividades
  await expect(dashboardPage.activitiesCompletionSection).toBeVisible();
  await expect(dashboardPage.activitiesCompletionText).toBeVisible();
  if (await dashboardPage.activitiesCompletionChart.count() > 0) {
    await expect(dashboardPage.activitiesCompletionChart).toBeVisible();
    await expect(dashboardPage.secondActivitiesCompletionChart).toBeVisible();
    await expect(dashboardPage.thirdActivitiesCompletionChart).toBeVisible();
    await expect(dashboardPage.fourthActivitiesCompletionChart).toBeVisible();
  } else {
    await expect(dashboardPage.activitiesCompletionSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Flechas para expandir o colapsar información
  await expect(dashboardPage.expandCollapseButtons.first()).toBeVisible();

  // Botones
  await expect(dashboardPage.dashboardHeading).toBeVisible();
});

test('EI-T142 - Home/Pantalla de Inicio (Estudiante) - Icono con nombre de estudiante y Cerrar Sesión', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const headerPage = new HeaderPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Dar click en el ícono azul de la esquina superior derecha
  await headerPage.openAccountMenu();

  // Se debe de mostrar el nombre del estudiante y la opción de 'Cerrar Sesión'
  await expect(headerPage.studentNameInMenu(STUDENT_NAME)).toBeVisible();
  await expect(headerPage.logOutButton).toBeVisible();

  // Cerrar sesión y verificar que el usuario es redirigido al login
  await headerPage.logOutButton.click();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('EI-T139 - Date Picker (Estudiante) - Validación del selector de fecha', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Dar click en el botón de la fecha
  await classroomListPage.dateButton.click();

  // Un date picker debiera de estar disponible para que el estudiante pueda seleccionar una fecha específica
  await expect(classroomListPage.datePicker).toBeVisible();

  // Hacer click en Cancelar y confirmar que el date picker se cierra
  await expect(classroomListPage.cancelarButton).toBeVisible();
  await classroomListPage.cancelarButton.click();
  await expect(classroomListPage.datePicker).toBeHidden();

  // Abrir el date picker nuevamente, hacer click en Confirmar y confirmar que se cierra
  await classroomListPage.dateButton.click();
  await expect(classroomListPage.datePicker).toBeVisible();
  await expect(classroomListPage.confirmarButton).toBeVisible();
  await classroomListPage.confirmarButton.click();
  await expect(classroomListPage.datePicker).toBeHidden();
});

test('EI-T180 - Lista de Tareas (Estudiante) - Validación de No hay asignaciones', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const classroomPage = new ClassroomPage(page);
  const taskListPage = new TaskListPage(page);

  // Step 1: Ir a la página de inicio
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante sin asignaciones
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Seleccionar alguna de las clases listadas
  await classroomListPage.selectAllClassroomsTab();
  await classroomListPage.clickClassroomItem(0);
  await classroomPage.waitForLoad();

  // El 'Espacio de la Clase' se visualiza
  await expect(classroomPage.classroomInfoRegion).toBeVisible();

  // Step 4: En el panel izquierdo, seleccionar la opción 'Lista de Tareas'
  await classroomPage.navigateToTaskList();
  await taskListPage.waitForLoad();

  // La página 'Lista de Tareas' se debe de desplegar
  await expect(taskListPage.heading).toBeVisible();

  // En el cuadro principal se debe de leer el texto 'Aún no tienes tareas asignadas.'
  await expect(taskListPage.noAssignmentsText).toHaveText('Aún no tienes tareas asignadas.');
});

test('EI-T156 - Libreta de Fallos (Estudiante) - Validación del botón de selección de clase', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const classroomPage = new ClassroomPage(page);
  const errorNotebookPage = new ErrorNotebookPage(page);

  // Step 1: Ir a la página correspondiente: 'https://goes.ifhb.ai/'
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();

  // El landing page es desplegado.
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  // Usuario: qa1s1@test.com, Password: test123
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // La sesión inicia correctamente.
  await expect(classroomListPage.listaDeAulasHeading).toBeVisible();

  // Step 3: Seleccionar alguna de las clases listadas
  await classroomListPage.selectAllClassroomsTab();
  await classroomListPage.clickClassroomItem(0);
  await classroomPage.waitForLoad();

  // El 'Espacio de la Clase' se visualiza.
  await expect(classroomPage.classroomInfoRegion).toBeVisible();

  // Step 4: En el panel izquierdo, seleccionar la opción 'Libreta de Fallos'
  await classroomPage.navigateToErrorNotebook();
  await errorNotebookPage.waitForLoad();

  // La información de la 'Libreta de Fallos' se despliega correctamente.
  await expect(errorNotebookPage.heading).toBeVisible();

  // Step 5: Dar click en el botón de alguna de las clases (la que tiene fecha)
  // Wait for new page to open in new tab
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    errorNotebookPage.clickClassButtonWithDate(0)
  ]);

  await newPage.waitForLoadState('networkidle');

  // En un nuevo tab se abre la libreta de fallos de la clase correspondiente.
  const newPageUrl = newPage.url();
  expect(newPageUrl).toBeTruthy();

  // Verify the new tab contains error notebook content
  const newErrorNotebookPage = new ErrorNotebookPage(newPage);
  await newErrorNotebookPage.waitForLoad();
  await expect(newErrorNotebookPage.headingText).toBeVisible();

  await newPage.close();
});