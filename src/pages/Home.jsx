import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";
import { useLanguage } from "../context/LanguageContext";
import content from "../data/content.json";

// Action card with hover lift
function ActionCard({ to, icon, title, description, accent = false }) {
  return (
    <Link
      to={to}
      className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200
        hover:-translate-y-0.5 active:translate-y-0
        ${
          accent
            ? "bg-forest-900 border-forest-800 shadow-cta hover:shadow-cta-hover hover:bg-forest-800"
            : "bg-surface-card border-surface-border shadow-card hover:shadow-card-hover hover:border-forest-200"
        }`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl
        ${accent ? "bg-forest-800" : "bg-forest-50"}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={`font-body font-semibold text-base leading-tight mb-1
          ${accent ? "text-white" : "text-ink-900"}`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${accent ? "text-forest-200" : "text-ink-500"}`}
        >
          {description}
        </p>
      </div>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5
          ${accent ? "text-forest-300" : "text-ink-300"}`}
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}

// Deadline row inside the deadlines card
function DeadlineRow({ title, targetDate, lang, t, isLast }) {
  return (
    <div className={`py-4 ${!isLast ? "border-b border-surface-border" : ""}`}>
      <Countdown targetDate={targetDate} title={title} variant="secondary" />
    </div>
  );
}

// Quick topic pill
function TopicPill({ icon, label, to, color }) {
  const colors = {
    green: "bg-forest-50 text-forest-800 border-forest-100 hover:bg-forest-100",
    gold: "bg-gold-50 text-gold-600 border-gold-100 hover:bg-gold-100",
    slate: "bg-ink-50 text-ink-700 border-ink-100 hover:bg-ink-100",
  };
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-body font-medium
        transition-all duration-150 hover:-translate-y-px active:translate-y-0 ${colors[color] || colors.green}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const { elections } = content;

  // Format the target election date for display
  const electionDate = new Date(elections.nextElection);
  const dateStr = electionDate.toLocaleDateString(
    lang === "ha" ? "ha-NG" : "en-NG",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="min-h-screen bg-surface page-root">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="hero-texture bg-gradient-to-b from-forest-900 to-forest-800 px-5 pt-10 pb-12 text-center">
        {/* Status pill */}
        <h1 className="anim-2 font-display text-black text-4xl sm:text-5xl mb-2 leading-none">
          2027
        </h1>
        <div className="anim-1 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-300 animate-dot-pulse" />
          <span className="text-forest-300 text-xs font-body font-medium tracking-wide">
            {lang === "ha" ? "Zaɓe na Gaba" : "General Election"}
          </span>
        </div>

        {/* Big date label */}

        <p className="anim-2 text-forest-200 text-sm font-body mb-8 leading-relaxed">
          {dateStr}
        </p>

        {/* Countdown */}
        <div className="anim-3">
          <Countdown
            targetDate={elections.nextElection}
            title={t("home.nextElection")}
            variant="primary"
          />
        </div>
      </section>

      {/* ─── Deadline card ────────────────────────────────────── */}
      <div className="px-4 -mt-4 anim-4">
        <div className="bg-surface-card rounded-2xl border border-surface-border shadow-card px-5 divide-y-0">
          <DeadlineRow
            title={t("home.registrationDeadline")}
            targetDate={elections.registrationDeadline}
            lang={lang}
            t={t}
          />
          <DeadlineRow
            title={t("home.pvcDeadline")}
            targetDate={elections.pvcDeadline}
            lang={lang}
            t={t}
            isLast
          />
        </div>
      </div>

      {/* ─── Action cards ─────────────────────────────────────── */}
      <section className="px-4 pt-6 pb-2 anim-5">
        <div className="flex flex-col gap-3">
          <ActionCard
            to="/learn?filter=rights"
            icon="🛡️"
            title={t("home.ctaRights")}
            description={
              lang === "ha"
                ? "Koyi game da haƙƙinku na doka a matsayinka na ɗan zaɓe na Najeriya."
                : "Learn about your legal rights as a Nigerian voter."
            }
            accent
          />
          <ActionCard
            to="/learn?filter=before"
            icon="📋"
            title={t("home.ctaPrepare")}
            description={
              lang === "ha"
                ? "Duk abin da kuke buƙata kafin ranar zaɓe — PVC, rijista, da ƙari."
                : "Everything you need before election day — PVC, registration, and more."
            }
          />
        </div>
      </section>

      {/* ─── Browse topics ────────────────────────────────────── */}
      <section className="px-4 pt-6 pb-8 anim-6">
        <p className="text-2xs font-body font-semibold uppercase tracking-[0.14em] text-ink-400 mb-3">
          {lang === "ha" ? "Duba Batutuwa" : "Browse Topics"}
        </p>
        <div className="flex flex-wrap gap-2">
          <TopicPill
            icon="🗳️"
            label={lang === "ha" ? "Wane zai zaɓe?" : "Who can vote?"}
            to="/topic/who_can_vote"
            color="green"
          />
          <TopicPill
            icon="🔒"
            label={lang === "ha" ? "Sirrin zaɓe" : "Secret ballot"}
            to="/topic/secrecy_of_vote"
            color="green"
          />
          <TopicPill
            icon="🪪"
            label={lang === "ha" ? "Karɓar PVC" : "Get your PVC"}
            to="/topic/get_pvc"
            color="gold"
          />
          <TopicPill
            icon="🛡️"
            label={lang === "ha" ? "Kariya" : "Against intimidation"}
            to="/topic/protection_from_intimidation"
            color="slate"
          />
          <TopicPill
            icon="📊"
            label={lang === "ha" ? "Sakamakon" : "After voting"}
            to="/topic/after_voting"
            color="slate"
          />
          <TopicPill
            icon="🏛️"
            label={lang === "ha" ? "Tsayawa takara" : "Run for office"}
            to="/topic/can_i_run"
            color="gold"
          />
        </div>
      </section>

      {/* ─── INEC notice ──────────────────────────────────────── */}
      <section className="px-4 pb-8">
        <div className="flex items-start gap-3 bg-gold-50 border border-gold-100 rounded-2xl px-4 py-3.5">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-ink-600 text-xs font-body leading-relaxed">
            {lang === "ha"
              ? "Koyaushe tabbatar da kwanakin zaɓe a "
              : "Always verify election dates and deadlines at "}
            <a
              href="https://www.inec.gov.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-700 font-semibold hover:underline"
            >
              inec.gov.ng
            </a>
            {lang === "ha"
              ? ". Kwanakin da aka nuna na nuni ne."
              : ". Dates shown are indicative."}
          </p>
        </div>
      </section>
    </div>
  );
}
