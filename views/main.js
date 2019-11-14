const html = require('html-template-tag');
const layout = require('./layout');

module.exports = pages => {
  let string = '';
  for (let i = 0; i < pages.length; i++) {
    string += `<li><a href="${pages[i].slug}">${pages[i].title}</a></li>`;
  }
  return layout(
    html`
      <h3>Pages</h3>
      <hr />
      <form method="GET" action="/wiki/search">
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <hr />
      <ul class="list-unstyled">
        <ul></ul>
      </ul>
    ` +
      string +
      `
    </ul>
  </ul>`
  );
};
