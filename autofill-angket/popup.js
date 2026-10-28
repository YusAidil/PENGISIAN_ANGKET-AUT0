document.getElementById("isi").addEventListener("click", async () => {
  const index = parseInt(document.getElementById("pilihan").value);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    args: [index],
    func: (idx) => {
      const groups = {};
      document.querySelectorAll('input[type="radio"]').forEach((r) => {
        if (!groups[r.name]) groups[r.name] = [];
        groups[r.name].push(r);
      });
      Object.values(groups).forEach((radios) => {
        if (radios[idx]) radios[idx].click();
      });
    },
  });
});