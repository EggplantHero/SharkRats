chrome.runtime.onMessage.addListener(doStuff);

function doStuff(request, sender, sendResponse) {
  let data = document.querySelectorAll(
    "article.tel-resultentry table.tel-resultentry tbody"
  );

  let headerLine = `"name","street","city","zip","tel","weblink"\n`;
  let finalString = "";
  finalString += headerLine;

  Array.from(data).map((article) => {
    let name = article.querySelector("h1 a");
    try {
      name = name.text;
    } catch {
      name = "";
    }

    let street = article.querySelector("div.tel-address");
    try {
      street = street.childNodes[0].nodeValue;
      street = street.substring(0, street.length - 2);
    } catch {
      street = "";
    }

    let zip = article.querySelector("div.tel-address span.postal-code");
    try {
      zip = zip.textContent;
    } catch {
      zip = "";
    }

    let city = article.querySelector("div.tel-address span.locality");
    try {
      city = city.textContent;
    } catch {
      city = "";
    }

    let tel = article.querySelector(
      "td.tel-result-main ul.tel-result-actions a.tel-result-action.sl-icon-call"
    );
    try {
      tel = tel.text;
    } catch {
      tel = "";
    }

    let weblink = article.querySelector(
      "td.tel-result-main ul.tel-result-actions a.tel-result-action.sl-icon-website"
    );
    if (weblink == null) {
      weblink = "";
    }

    let stringedArticle = `"${name}","${street}","${city}","${zip}","${tel}","${weblink}"\n`;

    finalString += stringedArticle;
  });
  sendResponse({ message: finalString });
}
