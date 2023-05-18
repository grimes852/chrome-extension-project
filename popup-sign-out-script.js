const cikis_buton = document.querySelector(".cikis");
const go_to_verified_button = document.querySelector("#verified-btn");
const navbar_scan_butonu = document.querySelector(".navbar-scan");
const scan_butonu = document.querySelector("#scan");
const home = document.querySelector(".navbar-home");
//scan sayfasına gidecek sonra
home.addEventListener("click", () => {
  window.location.replace("./popup-sign-out.html");
});
go_to_verified_button.addEventListener("click", () => {
  window.location.replace("./verified-asset.html");
});
cikis_buton.addEventListener("click", () => {
  
  chrome.storage.local.set({ apitoken: 0 }).then(() => {});
  window.location.replace("./popup-sign-in.html");
});

navbar_scan_butonu.addEventListener("click", () => {
  window.location.replace("./free-popup-sign-out.html");
});


//token check
chrome.storage.local.get("apitoken", function (data) {
  let tokenone = data.apitoken;
  isValidToken(tokenone);
});
function isValidToken(mytoken) {
  if (mytoken === undefined || mytoken === null || mytoken === 0) {
    window.location.replace("./popup-sign-in.html");
  } 
}
//token check


//SCAN butonu
scan_butonu.addEventListener("click", () => {
  chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");
});

//hata mesajları
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "error") {
    document.getElementById("warning-message").innerHTML = message.message;
    document.getElementById("warning-message").style.display = "block";
  }
});
//asseti gösterme
chrome.storage.local.get("asseturl", function (result) {
  const myValue = result.asseturl;
  if (myValue === undefined || myValue === null) {
    const inputElement = document.getElementById("assetaktive");
    inputElement.innerText = "Please send an asset";
  } else {
    const inputElement = document.getElementById("assetaktive");
    inputElement.innerText = myValue;
  }
});
//scan type gösterme
chrome.storage.local.get("scan_shown", function (result) {
  const myValue = result.scan_shown;
  if (myValue === undefined || myValue === null) {
    const inputElement = document.getElementById("scan_shown");
    inputElement.innerText = "Please choose a scan";
  } else {
    const inputElement = document.getElementById("scan_shown");
    inputElement.innerText = myValue;
  }
});
