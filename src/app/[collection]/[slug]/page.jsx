import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getProjects } from "@/lib/content";

export function generateStaticParams() {
  return [
    ...getProjects().map((project) => ({ collection: "projects", slug: project.slug })),
    ...getPosts().map((post) => ({ collection: "field-notes", slug: post.slug })),
  ];
}

export default function ContentDetail({ params }) {
  const isProject = params.collection === "projects";
  const items = isProject ? getProjects() : params.collection === "field-notes" ? getPosts() : [];
  const item = items.find((entry) => entry.slug === params.slug);

  if (!item) notFound();

  return (
    <main className="detail-page">
      <div className="detail-shell">
        <header className="detail-header">
          <Link href={isProject ? "/?tab=projects" : "/?tab=notes"} className="detail-back">
            ← Back to {isProject ? "projects" : "field notes"}
          </Link>
          <span>{isProject ? "PROJECT DOSSIER" : "FIELD NOTE"} / {item.year || item.date}</span>
        </header>

        <article className="detail-card">
          <div className="detail-card-meta">
            <span>{item.eyebrow}</span>
            <span>{item.stack?.join(" / ") || item.readTime}</span>
          </div>
          <div className="detail-article markdown-body" dangerouslySetInnerHTML={{ __html: item.detailHtml }} />
          {item.repo && (
            <a className="button button-primary detail-repo" href={item.repo} target="_blank" rel="noreferrer">
              Open repository →
            </a>
          )}
        </article>
      </div>
    </main>
  );
}
