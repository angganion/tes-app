import PortfolioShell from "./portfolio-shell";
import { getPosts, getProjects } from "@/lib/content";

export default function Home() {
  return <PortfolioShell projects={getProjects()} posts={getPosts()} />;
}
