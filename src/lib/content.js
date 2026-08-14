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
  let table = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      // Join lines first so inline formatting (bold, code, links) can span
      // line breaks inside a paragraph, then process inline markdown once.
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (list) {
      html.push("</ul>");
      list = false;
    }
  };

  const splitRow = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const isDelimiterRow = (line) => /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes("-");

  const renderTable = () => {
    if (!table) return;
    const [header, ...rows] = table.rows;
    html.push("<table>");
    if (header) {
      html.push(
        `<thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>`,
      );
    }
    if (rows.length) {
      html.push(
        `<tbody>${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
          .join("")}</tbody>`,
      );
    }
    html.push("</table>");
    table = null;
  };

  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      renderTable();
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
      renderTable();
      continue;
    }

    // Table block: header row, delimiter row, then body rows.
    const nextLine = lines[i + 1] || "";
    if (!table && /^\s*\|/.test(line) && isDelimiterRow(nextLine)) {
      table = { rows: [splitRow(line)] };
      continue;
    }
    if (table && isDelimiterRow(line)) {
      continue;
    }
    if (table && /^\s*\|/.test(line)) {
      table.rows.push(splitRow(line));
      continue;
    }
    renderTable();

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
  renderTable();
  if (code) html.push("</code></pre>");
  return html.join("");
}

function parseDocument(filePath) {
  const source = fs.readFileSync(filePath, "utf8").replace(/\r/g, "");
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const rawMeta = frontmatterMatch ? frontmatterMatch[1] : "";
  const markdown = frontmatterMatch
    ? source.slice(frontmatterMatch[0].length)
    : source;
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
