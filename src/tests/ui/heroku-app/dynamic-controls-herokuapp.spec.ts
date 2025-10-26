/**
 * Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import { expect, test } from '@playwright/test';

test.describe('[HEROKUAPP]', () => {
  const baseUrl = 'https://the-internet.herokuapp.com/';

  enum PAGE_TEXT {
    HEADING = 'Dynamic Controls',
    DESCRIBE_HEADING = 'This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.',
    GONE = "It's gone!",
    BACK = "It's back!",
  }

  test('Dynamic Controls', async ({ page }) => {
    const dynamicControlsLink = page.getByRole('link', { name: 'Dynamic Controls' });
    const removeButton = page.getByRole('button', { name: 'Remove' });
    const headingText = page.getByRole('heading', { level: 4 }).nth(0);
    const describeHeadingText = page.getByRole('paragraph').nth(0);
    const checkbox = page.getByRole('checkbox');
    const addButton = page.getByRole('button', { name: 'Add' });
    const goneBackText = page.getByRole('paragraph').nth(1);

    await page.goto(baseUrl);
    await dynamicControlsLink.click();
    await removeButton.isVisible();

    await expect.soft(headingText).toHaveText(PAGE_TEXT.HEADING);
    await expect.soft(describeHeadingText).toHaveText(PAGE_TEXT.DESCRIBE_HEADING);

    await checkbox.check();
    await removeButton.click();
    await checkbox.isHidden();

    await expect.soft(addButton).toBeVisible();
    await expect.soft(goneBackText).toHaveText(PAGE_TEXT.GONE);

    await addButton.click();
    await checkbox.isVisible();
    await expect.soft(goneBackText).toHaveText(PAGE_TEXT.BACK);
  });
});
