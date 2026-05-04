refreshBtn.onclick = async () => {
  refreshBtn.disabled = true;
  importStatus.innerText = "🔄 Import wird gestartet ...";

  try {
    const response = await fetch("/api/trigger-import", {
      method: "POST"
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Import konnte nicht gestartet werden");
    }

    importStatus.innerText =
      "✅ Import gestartet. Bitte ca. 1 Minute warten und App neu laden.";

  } catch (err) {
    importStatus.innerText =
      "❌ Fehler: " + err.message;

    refreshBtn.disabled = false;
  }
};