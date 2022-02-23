document.addEventListener(
  "DOMContentLoaded",
  function () {
    document
      .getElementById("runScript")
      .addEventListener("click", onclick, false);
    function onclick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "hello" }, displayData);
      });
    }
    function displayData(res) {
      let filename = generateTitle() + ".csv";
      download(filename, res.message);
    }
  },
  false
);

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function generateTitle() {
  const d = new Date();
  return d.toUTCString().split(" ").join("");
}
