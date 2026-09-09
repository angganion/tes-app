import fs from "node:fs";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");

const SQL_KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER",
  "CROSS", "ON", "AS", "AND", "OR", "NOT", "IN", "IS", "NULL", "BETWEEN",
  "LIKE", "ILIKE", "DISTINCT", "ORDER", "BY", "GROUP", "HAVING", "LIMIT",
  "OFFSET", "UNION", "ALL", "EXCEPT", "INTERSECT", "EXISTS", "CASE", "WHEN",
  "THEN", "ELSE", "END", "WITH", "RECURSIVE", "OVER", "PARTITION", "ROWS",
  "RANGE", "UNBOUNDED", "PRECEDING", "FOLLOWING", "CURRENT", "ROW", "LAG",
  "LEAD", "RANK", "DENSE_RANK", "ROW_NUMBER", "NTILE", "FIRST_VALUE",
  "LAST_VALUE", "NTH_VALUE", "INSERT", "INTO", "VALUES", "UPDATE", "SET",
  "DELETE", "CREATE", "TABLE", "DROP", "ALTER", "ADD", "COLUMN", "VIEW",
  "MATERIALIZED", "REFRESH", "CONCURRENTLY", "TEMP", "TEMPORARY", "TEMP",
  "BEGIN", "COMMIT", "ROLLBACK", "MERGE", "USING", "MATCHED", "CONFLICT",
  "DO", "EXCLUDED", "IF", "IF", "PRIMARY", "KEY", "FOREIGN", "REFERENCES",
  "DEFAULT", "UNIQUE", "INDEX", "ANALYZE", "EXPLAIN", "VACUUM", "REINDEX",
  "INTERVAL", "TRUE", "FALSE", "CASE", "ASC", "DESC", "RETURNING", "EPOCH",
  "AT", "TIME", "ZONE", "DATE", "TIMESTAMP", "TIMESTAMPTZ", "EXTRACT",
  "FILTER", "LATERAL", "UNNEST", "QUALIFY", "USING", "GIN", "DOW", "NULLS",
  "FIRST", "LAST", "COLLATE", "GRANT", "CAST", "DISTINCT", "STRFTIME",
]);

const SQL_FUNCTIONS = new Set([
  "COUNT", "SUM", "AVG", "MIN", "MAX", "ROUND", "UPPER", "LOWER", "LENGTH",
  "SUBSTR", "SUBSTRING", "CONCAT", "COALESCE", "NULLIF", "DATE_TRUNC",
  "EXTRACT", "GENERATE_SERIES", "STRING_AGG", "ARRAY_AGG",
  "PERCENTILE_CONT", "SPLIT_PART", "TRIM", "POSITION", "REGEXP_REPLACE",
  "JSONB_ARRAY_ELEMENTS", "CURRENT_DATE", "CURRENT_TIMESTAMP", "NOW",
  "TO_CHAR", "TO_TIMESTAMP", "CHAR_LENGTH", "GREATEST", "LEAST", "ABS",
  "CEIL", "FLOOR", "STRFTIME", "SAFE_CAST", "TRY_CAST", "JSON_EXTRACT",
  "JSONB_EXTRACT_PATH_TEXT", "STRING_TO_ARRAY", "REPLACE", "RANK",
]);

const tokenizeSql = (code) => {
  const lines = code.split("\n");
  const tokens = [];
  lines.forEach((line, i) => {
    const row = [];
    const push = (text, cls) => row.push({ text, cls });
    let buffer = "";
    let cls = null;
    const flush = () => {
      if (buffer) push(buffer, cls);
      buffer = "";
      cls = null;
    };
    let j = 0;
    while (j < line.length) {
      const ch = line[j];
      if (ch === "-" && line[j + 1] === "-") {
        flush();
        push(line.slice(j), "sql-cmt");
        j = line.length;
        break;
      }
      if (ch === "'") {
        flush();
        let end = j + 1;
        while (end < line.length && line[end] !== "'") end++;
        push(line.slice(j, end + 1), "sql-str");
        j = end + 1;
        continue;
      }
      if (/[a-zA-Z_]/.test(ch)) {
        if (cls !== "ident") { flush(); cls = "ident"; }
        buffer += ch;
        j++;
        continue;
      }
      if (/[0-9]/.test(ch)) {
        if (cls !== "num") { flush(); cls = "num"; }
        buffer += ch;
        j++;
        continue;
      }
      flush();
      push(ch, null);
      j++;
    }
    flush();
    tokens.push(row);
  });

  return tokens.map((row) =>
    row
      .map((token) => {
        if (!token.cls) return escapeHtml(token.text);
        const value = token.text;
        if (token.cls === "ident") {
          const upper = value.toUpperCase();
          if (SQL_KEYWORDS.has(upper)) return `<span class="sql-kw">${escapeHtml(value)}</span>`;
          if (SQL_FUNCTIONS.has(upper)) return `<span class="sql-fn">${escapeHtml(value)}</span>`;
        }
        if (token.cls === "sql-cmt") return `<span class="sql-cmt">${escapeHtml(value)}</span>`;
        if (token.cls === "sql-str") return `<span class="sql-str">${escapeHtml(value)}</span>`;
        if (token.cls === "num") return `<span class="sql-num">${escapeHtml(value)}</span>`;
        return escapeHtml(value);
      })
      .join("")
  ).join("\n");
};

const highlightCode = (code, lang) =>
  lang === "sql" ? tokenizeSql(code) : escapeHtml(code);

function sqlCellMarkdown(value) {
  const blocks = value.split(/`([^`]+)`/);
  return blocks
    .map((part, i) => {
      if (i % 2 === 1) {
        const rendered = highlightCode(part, "sql");
        return `<code>${rendered.replace(/\n/g, "<br>")}</code>`;
      }
      return inlineMarkdown(part.replace(/\n/g, "<br>"));
    })
    .join("");
}

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
    .replace(/&lt;br&gt;/g, "<br />")
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

function collapseTableCodeSpans(markdown) {
  const lines = markdown.split("\n");
  const out = [];
  const countBackticks = (s) => {
    let n = 0;
    for (const ch of s) if (ch === "`") n++;
    return n;
  };
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!/^\s*\|/.test(line)) {
      out.push(line);
      continue;
    }
    let open = countBackticks(line);
    let inRow = open % 2 === 1 || !/\|\s*$/.test(line);
    while (inRow && i + 1 < lines.length) {
      i++;
      const next = lines[i];
      line += "<br>" + next.trimEnd();
      open += countBackticks(next);
      inRow = open % 2 === 1 || !/\|\s*$/.test(line);
    }
    out.push(line);
  }
  return out.join("\n");
}

function markdownToHtml(markdown) {
  markdown = collapseTableCodeSpans(markdown);
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

  const splitRow = (line) => {
    const cells = [];
    let current = "";
    let inBacktick = false;
    const raw = line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "");
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      if (ch === "`") inBacktick = !inBacktick;
      if (ch === "|" && !inBacktick && raw[i - 1] !== "\\") {
        cells.push(current);
        current = "";
        continue;
      }
      if (ch === "\\" && raw[i + 1] === "|") continue;
      current += ch;
    }
    cells.push(current);
    return cells
      .map((cell) => cell.trim().replace(/\n/g, " ").replace(/<br>/g, "\n"));
  };

  const isDelimiterRow = (line) => /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes("-");

  const renderTable = () => {
    if (!table) return;
    const [header, ...rows] = table.rows;
    const howIndex = header ? header.findIndex((h) => h === "How to use") : -1;
    const isPair =
      howIndex === -1 && header && header.length === 2 && header[0] === "BAD" && header[1] === "GOOD";
    const isSql = howIndex !== -1 || isPair;
    const isCodeCell = (ci) => isSql && (howIndex !== -1 ? ci === howIndex : isPair);
    const tableClass = isSql ? (isPair ? ' class="sql-table sql-pair"' : ' class="sql-table"') : "";

    html.push(`<table${tableClass}>`);
    if (header) {
      html.push(
        `<thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>`,
      );
    }
    if (rows.length) {
      html.push(
        `<tbody>${rows
          .map(
            (row) =>
              `<tr>${row
                .map((cell, ci) =>
                  isCodeCell(ci)
                    ? `<td class="sql-how">${sqlCellMarkdown(cell)}</td>`
                    : `<td>${inlineMarkdown(cell)}</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}</tbody>`,
      );
    }
    html.push("</table>");
    table = null;
  };

  const lines = markdown.split("\n");
  let codeLabel = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      renderTable();
      if (code !== false) {
        html.push("</code></pre>");
        if (codeLabel) html.push("</div>");
        code = false;
        codeLabel = false;
      } else {
        const lang = line.slice(3).trim() || "text";
        html.push(`<pre class="codeblock"><code class="language-${escapeHtml(lang)}">`);
        code = lang;
      }
      continue;
    }

    if (code !== false) {
      // ```sql + "-- label: JOIN" line → renders a clause label above the code
      const labelMatch = /^\s*--\s*label:\s*(.+)$/.exec(line);
      if (labelMatch) {
        codeLabel = true;
        html[html.length - 1] = html[html.length - 1].replace(
          /^<pre class="codeblock">/,
          `<div class="sql-block"><div class="sql-label">${escapeHtml(labelMatch[1])}</div><pre class="codeblock">`,
        );
        continue;
      }
      html.push(`${highlightCode(line, code)}\n`);
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

    if (line.startsWith("> ")) {
      flushParagraph();
      closeList();
      const noteLines = [line.slice(2)];
      while (lines[i + 1] && lines[i + 1].startsWith("> ")) {
        noteLines.push(lines[++i].slice(2));
      }
      html.push(`<aside class="sql-note">${inlineMarkdown(noteLines.join(" "))}</aside>`);
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

    // Continuation of a list item (wrapped lines): append to the last <li>
    // instead of starting a new paragraph, so multi-line bullets stay one item.
    if (list && line.trim()) {
      html[html.length - 1] = html[html.length - 1].replace(
        /<\/li>$/,
        ` ${inlineMarkdown(line.trim())}</li>`,
      );
      continue;
    }

    closeList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();
  renderTable();
  if (code !== false) {
    html.push("</code></pre>");
    if (codeLabel) html.push("</div>");
  }
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
