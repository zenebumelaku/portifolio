import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowUpRightFromSquare,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Pencil,
  Plus,
  Search,
  Shapes,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  createProjectId,
  loadPortfolioProjects,
  savePortfolioProjects,
  type PortfolioProject,
} from "@/data/projects";

type AdminPage = "overview" | "projects";
type ProjectDraft = Omit<PortfolioProject, "id"> & { id?: string };

const blankProject: ProjectDraft = {
  mediaType: "placeholder",
  imageAlt: "",
  category: "",
  title: "",
  description: "",
  skills: [],
  published: true,
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

export const AdminDashboard = () => {
  const [initialLoad] = useState(loadPortfolioProjects);
  const [page, setPage] = useState<AdminPage>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState(initialLoad.projects);
  const [storageError, setStorageError] = useState(initialLoad.error ?? "");
  const [search, setSearch] = useState("");
  const [editor, setEditor] = useState<ProjectDraft | null>(null);
  const [notice, setNotice] = useState("");

  const publishedCount = projects.filter((project) => project.published).length;
  const categoriesCount = new Set(projects.map((project) => project.category)).size;
  const draftCount = projects.length - publishedCount;

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) =>
      [project.title, project.category, ...project.skills]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [projects, search]);

  const commitProjects = (nextProjects: PortfolioProject[], message: string) => {
    try {
      savePortfolioProjects(nextProjects);
      setProjects(nextProjects);
      setStorageError("");
      setNotice(message);
      setEditor(null);
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "Unknown storage error";
      setStorageError(`Changes could not be saved in this browser: ${reason}`);
    }
  };

  const startNewProject = () => {
    setNotice("");
    setEditor({ ...blankProject });
    setPage("projects");
  };

  const saveProject = (draft: ProjectDraft) => {
    const project: PortfolioProject = {
      ...draft,
      id: draft.id ?? createProjectId(),
    };
    const exists = projects.some((item) => item.id === project.id);
    const nextProjects = exists
      ? projects.map((item) => (item.id === project.id ? project : item))
      : [project, ...projects];
    commitProjects(nextProjects, exists ? "Project changes saved." : "Project added.");
  };

  const togglePublished = (project: PortfolioProject) => {
    const nextProjects = projects.map((item) =>
      item.id === project.id ? { ...item, published: !item.published } : item,
    );
    commitProjects(
      nextProjects,
      project.published ? "Project moved to drafts." : "Project published.",
    );
  };

  const deleteProject = (project: PortfolioProject) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      return;
    }
    commitProjects(
      projects.filter((item) => item.id !== project.id),
      "Project deleted.",
    );
  };

  const navigate = (nextPage: AdminPage) => {
    setPage(nextPage);
    setEditor(null);
    setNotice("");
    setSidebarOpen(false);
  };

  const currentPageTitle = editor
    ? editor.id
      ? "Edit project"
      : "Add project"
    : page === "overview"
      ? "Overview"
      : "Projects";

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col bg-[#111827] text-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="/admin" className="flex h-[76px] items-center gap-3 px-7">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-sm font-bold tracking-tight">
            Z.
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-wide">
              ZENEBU
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Portfolio studio
            </span>
          </span>
        </a>

        <div className="mx-5 mb-5 mt-6 border-t border-white/10" />
        <p className="px-7 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </p>
        <nav className="grid gap-1 px-4">
          <SidebarLink
            active={page === "overview" && editor === null}
            icon={<LayoutDashboard size={17} />}
            label="Overview"
            onClick={() => navigate("overview")}
          />
          <SidebarLink
            active={page === "projects"}
            icon={<FolderKanban size={17} />}
            label="Projects"
            count={projects.length}
            onClick={() => navigate("projects")}
          />
        </nav>

        <div className="mt-auto px-5 pb-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
              <CircleHelp size={15} className="text-indigo-300" />
              Need a hand?
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              Project edits are saved to this browser and appear on your public
              portfolio.
            </p>
            <a
              href="/"
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-white"
            >
              Open public site <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="mt-5 flex items-center gap-2 px-3 py-2 text-[10px] font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Local preview · no sign-in
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[264px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur md:px-9">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={19} />
            </button>
            <div>
              <p className="text-[11px] font-medium text-slate-400">
                Workspace <span className="px-1.5">/</span>
                <span className="text-slate-700">{currentPageTitle}</span>
              </p>
              <h1 className="mt-0.5 text-sm font-semibold text-slate-900">
                {currentPageTitle}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Eye size={15} />
              <span className="hidden sm:inline">View portfolio</span>
              <ArrowUpRightFromSquare size={13} />
            </a>
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 sm:flex">
              ZM
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-7 md:px-9 md:py-9">
          {storageError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <CircleHelp size={17} className="mt-0.5 shrink-0" />
              {storageError}
            </div>
          )}
          {notice && (
            <div
              role="status"
              className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <Check size={16} />
              {notice}
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setNotice("")}
                className="ml-auto rounded p-1 hover:bg-emerald-100"
              >
                <X size={15} />
              </button>
            </div>
          )}
          {editor ? (
            <ProjectEditor
              initial={editor}
              onCancel={() => setEditor(null)}
              onSave={saveProject}
            />
          ) : page === "overview" ? (
            <Overview
              projects={projects}
              publishedCount={publishedCount}
              categoriesCount={categoriesCount}
              draftCount={draftCount}
              onManageProjects={() => navigate("projects")}
              onAddProject={startNewProject}
              onTogglePublished={togglePublished}
            />
          ) : (
            <ProjectsPage
              projects={filteredProjects}
              search={search}
              onSearch={setSearch}
              onAdd={startNewProject}
              onEdit={(project) => {
                setNotice("");
                setEditor({ ...project });
              }}
              onTogglePublished={togglePublished}
              onDelete={deleteProject}
            />
          )}
        </main>
        <footer className="px-5 pb-7 text-center text-[11px] text-slate-400 md:px-9">
          Portfolio Studio <span className="px-1">·</span> Changes are stored
          locally in this browser
        </footer>
      </div>
    </div>
  );
};

type SidebarLinkProps = {
  active: boolean;
  icon: ReactNode;
  label: string;
  count?: number;
  onClick: () => void;
};

const SidebarLink = ({
  active,
  icon,
  label,
  count,
  onClick,
}: SidebarLinkProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-11 items-center gap-3 rounded-xl px-3 text-left text-[13px] font-medium transition ${
      active
        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-950/20"
        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
    }`}
  >
    {icon}
    {label}
    {count !== undefined && (
      <span
        className={`ml-auto rounded-md px-2 py-0.5 text-[10px] ${
          active ? "bg-white/15 text-white" : "bg-white/[0.08] text-slate-400"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

type OverviewProps = {
  projects: PortfolioProject[];
  publishedCount: number;
  categoriesCount: number;
  draftCount: number;
  onManageProjects: () => void;
  onAddProject: () => void;
  onTogglePublished: (project: PortfolioProject) => void;
};

const Overview = ({
  projects,
  publishedCount,
  categoriesCount,
  draftCount,
  onManageProjects,
  onAddProject,
  onTogglePublished,
}: OverviewProps) => (
  <div className="space-y-7">
    <section className="relative overflow-hidden rounded-[24px] bg-[#172033] px-6 py-7 text-white md:px-9 md:py-8">
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/[0.08]" />
      <div className="absolute -right-2 -top-12 h-52 w-52 rounded-full border border-white/[0.08]" />
      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-300/20 bg-indigo-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-200">
            <Sparkles size={12} /> Portfolio overview
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-[28px]">
            Make your next move.
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
            Your work, all in one place. Keep your projects current and your
            portfolio ready for what&apos;s next.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddProject}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition hover:bg-indigo-50 sm:self-auto"
        >
          <Plus size={15} /> Add a project
        </button>
      </div>
    </section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Total projects"
        value={projects.length}
        detail="Across your portfolio"
        icon={<BriefcaseBusiness size={18} />}
        accent="indigo"
      />
      <MetricCard
        label="Published"
        value={publishedCount}
        detail="Visible to visitors"
        icon={<Eye size={18} />}
        accent="green"
      />
      <MetricCard
        label="Drafts"
        value={draftCount}
        detail="Hidden from the site"
        icon={<FolderKanban size={18} />}
        accent="amber"
      />
      <MetricCard
        label="Categories"
        value={categoriesCount}
        detail="Project disciplines"
        icon={<Shapes size={18} />}
        accent="blue"
      />
    </section>

    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(270px,0.8fr)]">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:px-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Your projects</h3>
            <p className="mt-1 text-xs text-slate-500">
              A quick look at your latest work
            </p>
          </div>
          <button
            type="button"
            onClick={onManageProjects}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Manage all <ChevronRight size={14} />
          </button>
        </div>
        {projects.length === 0 ? (
          <EmptyProjects onAdd={onAddProject} />
        ) : (
          <div className="divide-y divide-slate-100">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-3 px-5 py-3.5 md:px-6"
              >
                <ProjectThumb project={project} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {project.title}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {project.category}
                  </p>
                </div>
                <PublishBadge published={project.published} />
                <button
                  type="button"
                  aria-label={`${project.published ? "Unpublish" : "Publish"} ${project.title}`}
                  title={project.published ? "Unpublish project" : "Publish project"}
                  onClick={() => onTogglePublished(project)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  {project.published ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <h3 className="text-sm font-semibold text-slate-900">Quick actions</h3>
        <p className="mt-1 text-xs text-slate-500">
          Keep your portfolio looking its best.
        </p>
        <div className="mt-5 grid gap-2.5">
          <QuickAction
            icon={<Plus size={16} />}
            title="Add a project"
            description="Showcase something new"
            onClick={onAddProject}
          />
          <QuickAction
            icon={<FolderKanban size={16} />}
            title="Manage projects"
            description="Edit, publish, or remove work"
            onClick={onManageProjects}
          />
          <a
            href="/"
            className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-100 hover:bg-indigo-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-700">
              <ArrowUpRightFromSquare size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-slate-800">
                Preview portfolio
              </span>
              <span className="mt-1 block text-[10px] text-slate-500">
                See what visitors see
              </span>
            </span>
            <ChevronRight
              size={15}
              className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
            />
          </a>
        </div>
      </div>
    </section>
  </div>
);

type MetricCardProps = {
  label: string;
  value: number;
  detail: string;
  icon: ReactNode;
  accent: "indigo" | "green" | "amber" | "blue";
};

const MetricCard = ({ label, value, detail, icon, accent }: MetricCardProps) => {
  const accentClasses = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-sky-50 text-sky-600",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          {icon}
        </span>
      </div>
      <p className="mt-4 text-[28px] font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-slate-500">{detail}</p>
    </article>
  );
};

type QuickActionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

const QuickAction = ({ icon, title, description, onClick }: QuickActionProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50/50"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-700">
      {icon}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-xs font-semibold text-slate-800">{title}</span>
      <span className="mt-1 block text-[10px] text-slate-500">{description}</span>
    </span>
    <ChevronRight
      size={15}
      className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
    />
  </button>
);

type ProjectsPageProps = {
  projects: PortfolioProject[];
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
  onEdit: (project: PortfolioProject) => void;
  onTogglePublished: (project: PortfolioProject) => void;
  onDelete: (project: PortfolioProject) => void;
};

const ProjectsPage = ({
  projects,
  search,
  onSearch,
  onAdd,
  onEdit,
  onTogglePublished,
  onDelete,
}: ProjectsPageProps) => (
  <section className="space-y-5">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-medium text-slate-500">
          Keep your portfolio fresh with your latest work.
        </p>
        <p className="mt-2 text-[11px] text-slate-400">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
      >
        <Plus size={15} /> Add project
      </button>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <FolderKanban size={16} className="text-indigo-600" />
          <h2 className="text-sm font-semibold text-slate-900">All projects</h2>
        </div>
        <label className="relative block w-full sm:w-64">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            aria-label="Search projects"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />
        </label>
      </div>

      {projects.length === 0 ? (
        <div className="px-5 py-12 text-center md:px-6">
          <p className="text-sm font-semibold text-slate-800">
            No projects found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different search or add a new project.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50/80 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              <tr>
                <th className="px-6 py-3">Project</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Technologies</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-slate-50/60">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ProjectThumb project={project} />
                      <div className="min-w-0">
                        <p className="max-w-[190px] truncate text-xs font-semibold text-slate-800">
                          {project.title}
                        </p>
                        <p className="mt-1 max-w-[190px] truncate text-[10px] text-slate-500">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex max-w-[190px] flex-wrap gap-1">
                      {project.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-500"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 2 && (
                        <span className="px-1 py-0.5 text-[9px] text-slate-400">
                          +{project.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <PublishBadge published={project.published} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionIcon
                        label={project.published ? "Unpublish" : "Publish"}
                        onClick={() => onTogglePublished(project)}
                      >
                        {project.published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </ActionIcon>
                      <ActionIcon
                        label={`Edit ${project.title}`}
                        onClick={() => onEdit(project)}
                      >
                        <Pencil size={14} />
                      </ActionIcon>
                      <ActionIcon
                        label={`Delete ${project.title}`}
                        onClick={() => onDelete(project)}
                        destructive
                      >
                        <Trash2 size={15} />
                      </ActionIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </section>
);

type ProjectEditorProps = {
  initial: ProjectDraft;
  onCancel: () => void;
  onSave: (project: ProjectDraft) => void;
};

const ProjectEditor = ({ initial, onCancel, onSave }: ProjectEditorProps) => {
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const mediaSrc = String(data.get("mediaSrc") ?? "").trim();
    const imageAlt = String(data.get("imageAlt") ?? "").trim();
    const mediaType = String(data.get("mediaType") ?? "placeholder") as
      | "image"
      | "video"
      | "placeholder";
    const skills = String(data.get("skills") ?? "")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if ((mediaType === "image" || mediaType === "video") && !mediaSrc) {
      setError("Add a media URL or choose the placeholder option.");
      return;
    }

    const draft: ProjectDraft = {
      ...initial,
      title,
      category,
      description,
      mediaType,
      imageAlt: imageAlt || title,
      skills,
      published: data.get("published") === "on",
      mediaSrc: mediaSrc || undefined,
      live: String(data.get("live") ?? "").trim() || undefined,
      github: String(data.get("github") ?? "").trim() || undefined,
    };
    onSave(draft);
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-5">
        <button
          type="button"
          onClick={onCancel}
          className="mb-3 text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          ← Back to projects
        </button>
        <p className="text-xs text-slate-500">
          Add the details visitors need to understand your work.
        </p>
      </div>
      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Project title
            <input
              name="title"
              required
              maxLength={80}
              defaultValue={initial.title}
              placeholder="e.g. Storefront redesign"
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Category
            <input
              name="category"
              required
              maxLength={40}
              defaultValue={initial.category}
              placeholder="e.g. Full Stack"
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700 sm:col-span-2">
            Description
            <textarea
              name="description"
              required
              maxLength={500}
              rows={4}
              defaultValue={initial.description}
              placeholder="What did you build, and what makes it interesting?"
              className={`${inputClass} resize-y`}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Media type
            <select
              name="mediaType"
              defaultValue={initial.mediaType}
              className={inputClass}
            >
              <option value="placeholder">Designed placeholder</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Media URL
            <input
              name="mediaSrc"
              type="url"
              defaultValue={initial.mediaSrc}
              placeholder="https://..."
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Image description
            <input
              name="imageAlt"
              maxLength={120}
              defaultValue={initial.imageAlt}
              placeholder="Describe the project preview"
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Technologies
            <input
              name="skills"
              defaultValue={initial.skills.join(", ")}
              placeholder="React, TypeScript, Node.js"
              className={inputClass}
            />
            <span className="font-normal text-slate-400">
              Separate each technology with a comma.
            </span>
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            Live project URL
            <input
              name="live"
              type="url"
              defaultValue={initial.live}
              placeholder="https://..."
              className={inputClass}
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            GitHub URL
            <input
              name="github"
              type="url"
              defaultValue={initial.github}
              placeholder="https://github.com/..."
              className={inputClass}
            />
          </label>
        </div>
        <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3.5">
          <input
            name="published"
            type="checkbox"
            defaultChecked={initial.published}
            className="h-4 w-4 accent-indigo-600"
          />
          <span>
            <span className="block text-xs font-semibold text-slate-800">
              Publish this project
            </span>
            <span className="mt-1 block text-[11px] text-slate-500">
              Published projects appear in the public portfolio.
            </span>
          </span>
        </label>
        {error && (
          <p role="alert" className="mt-4 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
        <div className="mt-6 flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-5 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
          >
            <Check size={15} /> Save project
          </button>
        </div>
      </form>
    </section>
  );
};

const ProjectThumb = ({ project }: { project: PortfolioProject }) => (
  <div className="h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-50 via-slate-100 to-slate-200">
    {project.mediaSrc && project.mediaType === "image" ? (
      <img
        src={project.mediaSrc}
        alt=""
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full items-center justify-center text-indigo-500">
        <BriefcaseBusiness size={16} />
      </div>
    )}
  </div>
);

const PublishBadge = ({ published }: { published: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-semibold ${
      published
        ? "bg-emerald-50 text-emerald-700"
        : "bg-slate-100 text-slate-500"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        published ? "bg-emerald-500" : "bg-slate-400"
      }`}
    />
    {published ? "Published" : "Draft"}
  </span>
);

const ActionIcon = ({
  label,
  onClick,
  destructive = false,
  children,
}: {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className={`rounded-lg p-2 transition ${
      destructive
        ? "text-slate-400 hover:bg-red-50 hover:text-red-600"
        : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
    }`}
  >
    {children}
  </button>
);

const EmptyProjects = ({ onAdd }: { onAdd: () => void }) => (
  <div className="px-5 py-12 text-center">
    <p className="text-sm font-semibold text-slate-800">Nothing here yet</p>
    <p className="mt-1 text-xs text-slate-500">
      Add your first project to start building your portfolio.
    </p>
    <button
      type="button"
      onClick={onAdd}
      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
    >
      <Plus size={14} /> Add a project
    </button>
  </div>
);
