document.getElementById("change-color").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "launchExtension" });
  });