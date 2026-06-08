export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Admin Console</p>
        <h1 className="mt-4 text-4xl font-black">Hello Operations</h1>
        <p className="mt-4 text-slate-300">Manage SaaS users, jobs, files, LiveKit rooms, and monitoring links from this Next.js route.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Users/Auth.js', 'Queues/Celery', 'Metrics/Grafana'].map((item) => <div className="rounded-2xl bg-slate-900 p-5" key={item}>{item}</div>)}
        </div>
      </section>
    </main>
  )
}
