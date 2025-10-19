import { expect, Page, test } from '@playwright/test';
import { IUser, listOfUsers } from 'data/table-rows/table-rows.data';

test.describe('[Heroku App] Table', () => {
  /**
   * Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
    Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }
    Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2
    Сайт: https://the-internet.herokuapp.com/tables
  */

  const baseUrl = 'https://the-internet.herokuapp.com/tables';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    const table = page.locator('#table2');
    expect(table).toBeVisible();
  });

  for (const user of listOfUsers) {
    test(`Find user by email ${user.Email}`, async ({ page }) => {
      const expectedUser = await getTableRow({ page, email: user.Email });
      expect(expectedUser, '[ASSERT] The user found matches the expected user').toEqual(user);
    });
  }
});

async function getTableRow(data: { page: Page; email: string }): Promise<IUser | string> {
  const { page, email } = data;
  const table = page.locator('#table2');

  const headers = await table.locator('th').allInnerTexts();
  headers.pop();

  const tableRows = await table.locator('tbody tr').all();
  const usersData: Record<string, string>[] = [];
  for (const row of tableRows) {
    const cells = await row
      .locator('td')
      .filter({ hasNot: page.locator('a') })
      .allInnerTexts();

    const rowData = headers.reduce(
      (acc, el, i) => {
        acc[el] = cells[i]!;
        return acc;
      },
      {} as Record<string, string>,
    );

    usersData.push(rowData);
  }

  const expectedUser: IUser = usersData.find((user) => user.Email === email) as unknown as IUser;
  return expectedUser ? expectedUser : 'No user with this email was found';
}
