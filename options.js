// Saves options to chrome.storage
function save_options() {
  let blog = document.getElementById("blog-notification").checked;
  let tool = document.getElementById("tool-notification").checked;
  let scan = document.getElementById("scan-notification").checked;
  chrome.storage.sync.set(
    {
      blog: blog,
      tool: tool,
      scan: scan,
    },
    function () {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get(
    {
      blog: true,
      tool: true,
      scan: true,
    },
    function (items) {
      document.getElementById("blog-notification").checked = items.blog;
      document.getElementById("tool-notification").checked = items.tool;
      document.getElementById("scan-notification").checked = items.scan;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
