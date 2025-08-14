import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, ArrowDown, Search, Info, Layers } from "lucide-react";

// Default export so it can be previewed right away
export default function DnsVisual() {
  const [domain, setDomain] = useState<string>("google.com");
  const [showFlow, setShowFlow] = useState<boolean>(true);

  const demoRecords = useMemo(() => {
    // Demo data — just to visualize; not a real DNS query
    const base = domain.trim() || "example.com";
    return {
      ns: [
        `ns1.${base}`,
        `ns2.${base}`,
      ],
      a: ["142.250.190.78", "142.250.190.110"],
      aaaa: ["2a00:1450:4010:c0b::6a"],
      cname: base.startsWith("www") ? [base.replace(/^www\./, "")] : ["—"],
      mx: [
        `10 alt1.aspmx.l.${base.split(".").slice(-2).join(".")}`,
        `20 alt2.aspmx.l.${base.split(".").slice(-2).join(".")}`,
      ],
      txt: ["v=spf1 include:_spf.google.com ~all"],
    };
  }, [domain]);

  const steps = [
    {
      title: "Браузер → Резолвер",
      desc: "Ты вводишь домен. Локальный резолвер (провайдера/1.1.1.1/8.8.8.8) проверяет кеш.",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: "Резолвер → Root",
      desc: "Если в кеше нет — спрашиваем корневые сервера: где TLD для .com/.az?",
      icon: <Server className="w-5 h-5" />,
    },
    {
      title: "Резолвер → TLD",
      desc: "TLD(.com/.org/.az) подсказывает авторитетные NS домена.",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      title: "Резолвер → Authoritative",
      desc: "Авторитетные NS отдают записи A/AAAA/CNAME/MX/…",
      icon: <Server className="w-5 h-5" />,
    },
    {
      title: "Ответ → Браузер",
      desc: "Результат кешируется. Браузер подключается по IP к серверу сайта.",
      icon: <ArrowDown className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              DNS: визуально, коротко и ясно
            </h1>
            <p className="text-slate-300 mt-2 max-w-2xl">
              Введите домен, посмотрите цепочку резолвинга и типы записей. Этот компонент —
              учебная визуализация без реальных сетевых запросов.
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                className="w-full sm:w-64 rounded-2xl bg-slate-800/70 backdrop-blur px-10 py-2.5 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
                placeholder="например, google.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFlow((s) => !s)}
              className="rounded-2xl px-4 py-2.5 bg-indigo-500/90 hover:bg-indigo-400 active:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-900/30 transition"
            >
              {showFlow ? "Спрятать цепочку" : "Показать цепочку"}
            </button>
          </div>
        </div>

        {/* Diagram */}
        <AnimatePresence initial={false}>
          {showFlow && (
            <motion.section
              key="diagram"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10"
            >
              {/* Left: Flow chart */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/70 ring-1 ring-slate-800 shadow-xl">
                  <h2 className="text-xl font-bold mb-4">Цепочка резолвинга</h2>
                  <div className="relative">
                    {/* SVG diagram for crisp lines */}
                    <svg viewBox="0 0 900 520" className="w-full h-auto">
                      {/* Arrows */}
                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                        </marker>
                      </defs>

                      {/* Nodes */}
                      {[
                        { x: 40, y: 40, w: 280, h: 90, label: "Браузер", icon: Globe },
                        { x: 580, y: 40, w: 280, h: 90, label: "Рекурсивный резолвер", icon: Server },
                        { x: 40, y: 210, w: 280, h: 90, label: "Корневые (Root)", icon: Server },
                        { x: 580, y: 210, w: 280, h: 90, label: "TLD-серверы (.com/.az)", icon: Layers },
                        { x: 310, y: 380, w: 280, h: 90, label: "Авторитетные NS домена", icon: Server },
                      ].map((n, i) => (
                        <g key={i}>
                          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={18} ry={18} className="fill-slate-800 stroke-slate-700" strokeWidth="1" />
                          <foreignObject x={n.x} y={n.y} width={n.w} height={n.h}>
                            <div className="w-full h-full flex items-center gap-3 px-5 text-slate-100">
                              {React.createElement(n.icon, { className: "w-5 h-5 shrink-0" })}
                              <span className="font-semibold">{n.label}</span>
                            </div>
                          </foreignObject>
                        </g>
                      ))}

                      {/* Connecting lines */}
                      <g className="stroke-slate-500" strokeWidth="2" markerEnd="url(#arrow)">
                        {/* Browser -> Resolver */}
                        <line x1="320" y1="85" x2="580" y2="85" />
                        {/* Resolver -> Root */}
                        <line x1="720" y1="130" x2="180" y2="210" />
                        {/* Root -> TLD */}
                        <line x1="180" y1="255" x2="720" y2="255" />
                        {/* TLD -> Authoritative */}
                        <line x1="720" y1="300" x2="450" y2="380" />
                        {/* Authoritative -> Resolver (answer) */}
                        <line x1="450" y1="380" x2="720" y2="130" />
                        {/* Resolver -> Browser (final) */}
                        <line x1="580" y1="85" x2="320" y2="85" />
                      </g>
                    </svg>
                  </div>

                  <div className="mt-4 text-sm text-slate-300 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5" />
                    <p>
                      Резолвер кеширует ответы (TTL), чтобы в следующий раз не ходить по всей цепочке.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Steps */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/70 ring-1 ring-slate-800 shadow-xl">
                  <h2 className="text-xl font-bold mb-4">Шаги запроса для «{domain || "example.com"}»</h2>
                  <ol className="space-y-3">
                    {steps.map((s, idx) => (
                      <li key={idx} className="flex gap-3">
                        <div className="shrink-0 mt-1 text-indigo-300">{s.icon}</div>
                        <div>
                          <p className="font-semibold">{idx + 1}. {s.title}</p>
                          <p className="text-slate-300">{s.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Records table */}
        <section className="rounded-2xl p-6 sm:p-8 bg-slate-900/70 ring-1 ring-slate-800 shadow-xl">
          <h2 className="text-xl font-bold mb-6">Типы DNS-записей (демо)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <RecordCard name="A" hint="IPv4-адрес" items={demoRecords.a} />
            <RecordCard name="AAAA" hint="IPv6-адрес" items={demoRecords.aaaa} />
            <RecordCard name="CNAME" hint="Псевдоним (указатель на другой домен)" items={demoRecords.cname} />
            <RecordCard name="MX" hint="Почтовые сервера домена" items={demoRecords.mx} />
            <RecordCard name="NS" hint="Авторитетные DNS сервера" items={demoRecords.ns} />
            <RecordCard name="TXT" hint="Проверки/политики (SPF/DKIM/… )" items={demoRecords.txt} />
          </div>
          <p className="text-slate-400 text-sm mt-4">
            Примечание: данные сгенерированы для визуализации и могут не соответствовать реальным записям.
          </p>
        </section>

        {/* Footer */}
        <div className="mt-10 text-center text-slate-400 text-sm">
          Сделано для обучения: домены, DNS и цепочка резолвинга.
        </div>
      </div>
    </div>
  );
}

function RecordCard({ name, hint, items }: { name: string; hint: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl bg-slate-800/60 ring-1 ring-slate-700 hover:ring-indigo-400/60 transition shadow-lg p-5"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold tracking-tight">{name}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/30">
          DNS record
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-3">{hint}</p>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="rounded-xl bg-slate-900/60 px-3 py-2 text-sm ring-1 ring-slate-700/80 group-hover:ring-indigo-500/40 truncate">
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
