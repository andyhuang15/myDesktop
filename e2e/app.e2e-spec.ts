import { HawkPage } from './app.po';

describe('hawk App', () => {
  let page: HawkPage;

  beforeEach(() => {
    page = new HawkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
