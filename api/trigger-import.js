export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Nur POST erlaubt"
    });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({
      ok: false,
      error: "GITHUB_TOKEN fehlt in Vercel"
    });
  }

  const response = await fetch(
    "https://api.github.com/repos/Ulli-Buehler/Event-Finder/actions/workflows/import.yml/dispatches",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        ref: "main"
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();

    return res.status(response.status).json({
      ok: false,
      error: text
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Import gestartet"
  });
}