import { SalesPortalPage } from '../sales-portal.page';

export class DeleteProductsModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator('.modal-content');

  readonly title = this.uniqueElement.locator('h5');
  readonly confirmDeletingButton = this.uniqueElement.locator('//button[@type="submit"]');
  readonly cancelDeletingButton = this.uniqueElement.locator('//button[contains(text(), "Cancel")]');
  readonly closeButton = this.page.locator('[title="Close"]');

  async clickConfirmButton() {
    this.confirmDeletingButton.click();
  }
}
