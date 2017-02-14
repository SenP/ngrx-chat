import { NgrxChatPage } from './app.po';

describe('ngrx-chat App', function() {
  let page: NgrxChatPage;

  beforeEach(() => {
    page = new NgrxChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
