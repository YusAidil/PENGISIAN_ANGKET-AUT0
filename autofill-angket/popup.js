document.getElementById("isi").addEventListener("click", async () => {
  const index = parseInt(document.querySelector('input[name="pilihan"]:checked').value);
  const status = document.getElementById("status");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    await chrome.scripting.executeScript({
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
    status.textContent = "Selesai diisi.";
  } catch (e) {
    status.textContent = "Gagal: halaman ini tidak bisa diakses.";
  }
});