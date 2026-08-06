import fs from "node:fs";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(
      /!\[([^\]]*)\]\(((?:https?:\/\/|\/)[^\s)]+)\)/g,
      '<img src="$2" alt="$1" loading="lazy" decoding="async" />',
    )
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    );
}

function markdownToHtml(markdown) {
  const html = [];
  let paragraph = [];
  let list = false;
  let code = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${paragraph.map(inlineMarkdown).join(" ")}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (list) {
      html.push("</ul>");
      list = false;
    }
  };

  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      html.push(
        code
          ? "</code></pre>"
          : `<pre><code class="language-${escapeHtml(line.slice(3).trim())}">`,
      );
      code = !code;
      continue;
    }

    if (code) {
      html.push(`${escapeHtml(line)}\n`);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      if (!list) {
        html.push("<ul>");
        list = true;
      }
      html.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();
  if (code) html.push("</code></pre>");
  return html.join("");
}

function parseDocument(filePath) {
  const source = fs.readFileSync(filePath, "utf8").replace(/\r/g, "");
  const [, rawMeta = "", markdown = source] = source.split("---");
  const meta = Object.fromEntries(
    rawMeta
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [key, ...value] = line.split(":");
        return [key.trim(), value.join(":").trim()];
      }),
  );

  return {
    ...meta,
    stack: meta.stack ? meta.stack.split("|") : [],
    featured: meta.featured === "true",
    bodyHtml: markdownToHtml(markdown.trim()),
  };
}

function readCollection(collection) {
  const directory = path.join(contentRoot, collection);
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const itemDirectory = path.join(directory, entry.name);
      const summary = parseDocument(path.join(itemDirectory, "README.md"));
      const detailPath = path.join(itemDirectory, "detail", "README.md");

      return {
        slug: entry.name,
        ...summary,
        detailHtml: fs.existsSync(detailPath) ? parseDocument(detailPath).bodyHtml : summary.bodyHtml,
      };
    });
}

export function getProjects() {
  return readCollection("projects").sort((a, b) => Number(b.year) - Number(a.year));
}

export function getPosts() {
  return readCollection("blog").sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function getProject(slug) {
  return getProjects().find((project) => project.slug === slug);
}

export function getPost(slug) {
  return getPosts().find((post) => post.slug === slug);
}
