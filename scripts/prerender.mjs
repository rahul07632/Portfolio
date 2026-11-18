import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const dist = path.resolve("dist");
const routes = ["/", "/work", "/stack", "/about", "/education", "/contact"];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    pathname = "/";
  }

  if (pathname === "/") pathname = "/index.html";

  let file = path.resolve(dist, `.${pathname}`);
  if (!file.startsWith(dist)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(dist, "index.html");
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[path.extname(file)] || "application/octet-stream",
  });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(4174, "127.0.0.1", resolve));

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();

  for (const route of routes) {
    await page.goto(`http://127.0.0.1:4174${route === "/" ? "/" : route}`, {
      waitUntil: "networkidle0",
      timeout: 120000,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const html = await page.content();
    const output = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, html);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
