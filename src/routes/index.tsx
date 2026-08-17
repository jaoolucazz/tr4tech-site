import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Bot,
  CalendarCheck,
  LayoutTemplate,
  MessageSquare,
  Plug,
  Sparkles,
  Table2,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TR4 Tech — Agentes de IA, automações e landing pages" },
      {
        name: "description",
        content:
          "Criação de agentes de IA para WhatsApp, integração com CRM e landing pages que capturam leads. Cases: Okay Coworking, DKS Construtora, Smart Insp e Smart Target.",
      },
      { property: "og:title", content: "TR4 Tech — Agentes de IA e automações" },
      {
        property: "og:description",
        content:
          "Atendimento automatizado no WhatsApp, leads direto no CRM e landing pages que convertem.",
      },
    ],
  }),
  component: Index,
});

const CONTACT_EMAIL = "contato@tr4tech.com";
// TODO: trocar pelo número real (formato: código do país + DDD + número, só dígitos)
const WHATSAPP_NUMBER = "55XXXXXXXXXXX";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.72.45 3.4 1.3 4.87L2.05 22l5.36-1.4a9.9 9.9 0 0 0 4.63 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.07c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.15-4.9-4.34-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.29-.12.57.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

// Small utility that gives buttons the diagonal "shine" sweep on hover.
const shineClasses =
  "relative overflow-hidden before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-[130%]";

// Sets the --mx/--my custom properties a spotlight-card reads to position its glow.
function trackSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

const services = [
  {
    icon: Bot,
    title: "Agentes de IA para WhatsApp",
    text: "Atendimento automático que responde dúvidas, envia valores, consulta disponibilidade e agenda — reduzindo o trabalho manual do time.",
  },
  {
    icon: Workflow,
    title: "Automação de leads e CRM",
    text: "Cada lead é qualificado pelo agente, cadastrado automaticamente no CRM (RD Station) e o responsável é avisado no WhatsApp na hora.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing pages que geram leads",
    text: "Páginas de apresentação de serviços com formulário integrado: os dados caem em planilha e disparam notificação no WhatsApp.",
  },
  {
    icon: Plug,
    title: "Integrações e melhoria de sistemas",
    text: "Gestão técnica, evolução de sistemas em produção e integrações entre ferramentas que a operação já usa.",
  },
];

const cases = [
  {
    name: "Okay Coworking",
    url: "https://okaycoworking.com.br/",
    role: "Agente de IA + Landing pages",
    tags: ["IA no WhatsApp", "Agendamentos", "Formulário → Planilha"],
    text: "Criação de um agente de IA para tratativa das mensagens de WhatsApp, apoiando os atendentes e resolvendo demandas sozinho: valores de salas, horários disponíveis e agendamentos. Também desenvolvi duas landing pages (Kalenborn e Condomínio Inteligente) com formulário integrado a planilha e notificação em um número de WhatsApp.",
  },
  {
    name: "DKS Construtora",
    url: "https://www.dksconstrutora.com.br/",
    role: "Agente de IA + RD Station",
    tags: ["Qualificação de leads", "RD Station", "Notificação ao corretor"],
    text: "Agente de IA responsável pela tratativa dos leads: todo interessado em um empreendimento é atendido, qualificado e enviado direto para o CRM (RD Station), com aviso automático no WhatsApp do corretor responsável por aquele empreendimento.",
  },
  {
    name: "Smart Insp",
    url: "https://smartinsp.com.br/",
    role: "Gestor de TI",
    tags: ["Gestão de TI", "Evolução do sistema", "Processos"],
    text: "Atuo como gestor de TI da empresa, à frente das decisões técnicas e das melhorias contínuas dentro do sistema.",
  },
  {
    name: "Smart Target",
    url: "https://www.stinsp.com.br/",
    role: "Desenvolvimento do produto",
    tags: ["Produto", "Do início ao fim", "Sistema completo"],
    text: "Participei do desenvolvimento do sistema como um todo, do início ao lançamento.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "Entendimento",
    text: "Mapeio o fluxo atual de atendimento ou de captação e onde está o gargalo.",
  },
  {
    icon: Sparkles,
    title: "Construção",
    text: "Monto o agente de IA e/ou a página com a linguagem e as regras do seu negócio.",
  },
  {
    icon: Table2,
    title: "Integração",
    text: "Conecto planilha, CRM e WhatsApp para que nada dependa de trabalho manual.",
  },
  {
    icon: CalendarCheck,
    title: "Acompanhamento",
    text: "Ajustes com base nas conversas reais até o fluxo rodar redondo.",
  },
];

function Index() {
  const [form, setForm] = useState({ nome: "", empresa: "", contato: "", mensagem: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim() || !form.contato.trim()) {
      toast.error("Preencha nome e contato para continuar.");
      return;
    }
    const body = `Nome: ${form.nome}\nEmpresa: ${form.empresa}\nContato: ${form.contato}\n\n${form.mensagem}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Contato pelo site — ${form.nome}`,
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Abrindo seu e-mail com a mensagem pronta.");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
          >
            <img src={logo} alt="TR4 Tech" width={32} height={32} className="h-8 w-8" />
            TR4 Tech
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {[
              ["#servicos", "Serviços"],
              ["#cases", "Cases"],
              ["#processo", "Como funciona"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className={shineClasses}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-border">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1200}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="hero-grid" />
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Badge variant="outline" className="border-primary/40 text-primary">
              Agentes de IA · Automação · Landing pages
            </Badge>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-bold md:text-6xl">
              Automatizo o atendimento e a captação de leads da sua{" "}
              <span className="text-gradient">operação</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Sou João Lucas, da TR4 Tech. Construo agentes de IA que conversam no WhatsApp,
              resolvem demandas e entregam os leads prontos no CRM — além de landing pages
              integradas a planilhas e notificações automáticas.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className={shineClasses}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Quero automatizar meu atendimento
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#cases">Ver cases</a>
              </Button>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-8 md:grid-cols-4">
              {[
                ["4+", "projetos entregues"],
                ["24/7", "atendimento ativo"],
                ["CRM", "leads integrados"],
                ["0", "planilha preenchida à mão"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-bold text-primary">{value}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold md:text-4xl">O que eu faço</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Tecnologia aplicada onde dá resultado: menos trabalho repetitivo, mais leads
            aproveitados.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                onMouseMove={trackSpotlight}
                className="surface-card spotlight group rounded-lg p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <Icon
                  className="size-6 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cases" className="border-y border-border bg-card/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold md:text-4xl">Cases</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Projetos reais, em produção, com empresas de coworking, construção e tecnologia.
            </p>
            <div className="mt-12 space-y-5">
              {cases.map((item) => (
                <article
                  key={item.name}
                  onMouseMove={trackSpotlight}
                  className="surface-card spotlight group rounded-lg p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow md:flex md:gap-10"
                >
                  <div className="md:w-64 md:shrink-0">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-primary">{item.role}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Visitar site
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="secondary">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold md:text-4xl">Como funciona</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <article
                key={title}
                className="surface-card group rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="font-display text-sm text-primary transition-transform duration-300 group-hover:scale-125 group-hover:[text-shadow:0_0_16px_var(--color-primary)] inline-block">
                  0{i + 1}
                </span>
                <Icon
                  className="mt-4 size-5 text-accent transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>TR4 Tech · tr4tech.com</span>
          <span>Agentes de IA, automações e landing pages</span>
        </div>
      </footer>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-110"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
