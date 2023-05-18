
const cikis_buton = document.querySelector(".cikis");
const go_to_verified_button = document.querySelector("#verified-btn");
const home = document.querySelector(".navbar-home");
const scan_butonu = document.querySelector("#free-scan");
const go_scan_butonu = document.querySelector("#scan-btn");

//scan sayfasına gidecek sonra
home.addEventListener("click", () => {
  window.location.replace("./popup-sign-out.html");
});
//go verified
go_to_verified_button.addEventListener("click", () => {
  window.location.replace("./verified-asset.html");
});
//logout butonu, apitokeni sıfırlayıp çıkış yapıyor
cikis_buton.addEventListener("click", () => {
  
  chrome.storage.local.set({ apitoken: 0 }).then(() => {});
  window.location.replace("./popup-sign-in.html");
});

//autocompleteautocompleteautocompleteautocompleteautocompleteautocompleteautocomplete

function findMatches(keyword, data) {
  const regex = new RegExp(keyword, "gi");
  return data.filter((place) => place.name.match(regex));
}

function displayMatches() {
  const endpoint = `https://gist.githubusercontent.com/hustledeveloper/d218c8bfe17a27fe9152bc2ce1e6158e/raw/dc43a4b6fdf3b9c3c71ae8abcb9ac1b2ec0e970a/Scan-tools-list.json?q=${this.value}`;
  fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => {
      const matchArray = findMatches(this.value, data);
      const html = matchArray
        .map(
          (place) =>
            `<option id="${place.slug}" class="tool-button">
              <span class="name">${place.name}</span>
            </option>`
        )
        .join("");
      suggestions.innerHTML = html;
      document.querySelector("#free-scan").style.display = "block";
      document.querySelector("#scan-btn").style.display = "block";
      document.querySelector(".suggestions").size = matchArray.length;
      document.querySelector(".suggestions").style.display = "block";
    });

}

const searchInput = document.querySelector(".search-input");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
//autocompleteautocompleteautocompleteautocompleteautocompleteautocompleteautocomplete
const searchIn = document.querySelector(".search-input");
const select = document.querySelector(".suggestions");

searchIn.addEventListener("keyup", () => {
  if (searchIn.value.length > 0) {
    select.style.display = "block";
  } else {
    select.style.display = "none";
  }
});


go_scan_butonu.addEventListener("click", () => {
  const selectedOption = document.querySelector(".suggestions option:checked");
  if (selectedOption) {
    let takeslug = selectedOption.id;
    chrome.storage.local.set({ scan_aktive: takeslug }).then(() => {});

    let takeslug_show = selectedOption.value;
    chrome.storage.local.set({ scan_shown: takeslug_show }).then(() => {});
    window.location.replace("./popup-sign-out.html");
  }
});

select.addEventListener("change", (event) => {
  const selectedOption = document.querySelector(".suggestions option:checked");
  if (selectedOption) {
    let takeslug = selectedOption.id;
    chrome.storage.local.set({ scan_aktive: takeslug }).then(() => {});
    let takeslug_show = selectedOption.value;
    chrome.storage.local.set({ scan_shown: takeslug_show }).then(() => {});
  }
  searchIn.value = event.target.value;
  select.style.display = "none";
});
scan_butonu.addEventListener("click", () => {
  const selectedOption = document.querySelector(".suggestions option:checked");
  if (selectedOption) {
    const url = "https://securityforeveryone.com/tools/" + selectedOption.id;
    let takeslug = selectedOption.id;
    chrome.storage.local.set({ scan_aktive: takeslug }).then(() => {});
    let takeslug_show = selectedOption.value;
    chrome.storage.local.set({ scan_shown: takeslug_show }).then(() => {});
    chrome.tabs.create({ url: url });
  }
});