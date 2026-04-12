"use client";

import { useState } from "react";
import {
  Activity,
  Users,
  FileText,
  ChevronDown,
  Smartphone,
  ShieldPlus,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

const sections = [
  { id: "about", label: "Sobre" },
  { id: "mission", label: "Missão" },
  { id: "how", label: "Como Funciona" },
  { id: "emergency", label: "Sistema de Emergência" },
  { id: "docs", label: "Documentação" },
];

const ViaVerdeAboutPage = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleAccordion = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <main className="w-full bg-white text-gray-800">

      {/* NAVIGATION */}
      <nav className="w-full bg-white/90 backdrop-blur border-b border-green-100 shadow-sm py-4">
        <ul className="flex justify-center gap-6 text-sm sm:text-base font-semibold text-green-700">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="animate-fade-in">
          <Activity className="w-12 h-12 text-green-600 mx-auto" />

          <h1 className="text-5xl font-bold text-green-700">
            ViaVerde: Acesso Mais Rápido aos Cuidados de Saúde
          </h1>

          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            A ViaVerde é uma plataforma digital de coordenação de saúde criada
            para reduzir tempos de espera, melhorar a resposta em emergências e
            ligar pacientes aos cuidados de forma mais rápida e eficiente.
            Desde hospitais lotados a chamadas urgentes — simplificamos o acesso
            à saúde quando mais importa.
          </p>

          <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg mt-8">
            <Image
              src="/pac.jpg"
              alt="Doentes numa sala de espera hospitalar cheia"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="bg-green-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
          <ShieldPlus className="w-12 h-12 text-green-600 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700">
            A Nossa Missão
          </h2>

          <p className="text-gray-700 text-lg">
            Acreditamos que nenhum paciente deve sofrer devido a atrasos,
            sobrelotação ou falta de coordenação. A ViaVerde foi criada para
            priorizar urgências, orientar pacientes e ligar profissionais de
            saúde em tempo real.
          </p>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-20">
        <div className="animate-fade-in">
          <h2 className="text-4xl font-bold text-green-700 text-center mb-12">
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            <div>
              <h3 className="flex items-center gap-2 text-2xl text-green-600 font-semibold">
                <Smartphone /> Pacientes
              </h3>
              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                <li>Reportar sintomas ou emergências de imediato</li>
                <li>Receber triagem automática por nível de urgência</li>
                <li>Encontrar o centro de saúde mais próximo disponível</li>
                <li>Receber atualizações por SMS ou WhatsApp</li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-2xl text-green-600 font-semibold">
                <Users /> Profissionais de Saúde
              </h3>
              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                <li>Gestão em tempo real do fluxo de pacientes</li>
                <li>Prioridade automática de casos urgentes</li>
                <li>Controlo de camas e recursos hospitalares</li>
                <li>Comunicação direta com pacientes</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* EMERGENCY */}
      <section id="emergency" className="bg-green-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700">
            Sistema de Resposta de Emergência
          </h2>

          <p className="text-gray-700 max-w-3xl mx-auto">
            A ViaVerde integra triagem inteligente assistida por tecnologia.
            Quando um paciente faz uma chamada ou submete uma emergência,
            o sistema avalia instantaneamente a gravidade e encaminha para a
            unidade de saúde mais próxima e disponível.
          </p>

          <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-lg mt-8">
            <Image
              src="/iwww.jpg"
              alt="Operador de emergência"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* DOCS */}
      <section id="docs" className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-10 animate-fade-in">

          <FileText className="text-green-600 w-10 h-10 mx-auto" />

          <h2 className="text-4xl font-bold text-green-700 text-center">
            Documentação Legal
          </h2>

          <div className="space-y-4">

            {[
              {
                title: "Política de Privacidade",
                desc: "Como os dados dos pacientes são recolhidos, armazenados e protegidos.",
              },
              {
                title: "Termos de Serviço",
                desc: "Regras de utilização da plataforma ViaVerde e do sistema de emergência.",
              },
              {
                title: "Declaração Médica",
                desc: "Limitações da triagem digital e encaminhamento de emergências.",
              },
            ].map((item) => (
              <div key={item.title} className="border rounded-lg overflow-hidden">

                <button
                  onClick={() => toggleAccordion(item.title)}
                  className="w-full flex justify-between items-center py-4 px-5 bg-green-100"
                >
                  <span className="font-semibold text-green-800">
                    {item.title}
                  </span>

                  <ChevronDown
                    className={`transition-transform ${
                      openItem === item.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItem === item.title && (
                  <div className="bg-white px-5 py-4 border-t">
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SIMPLE ANIMATION (SAFE CSS) */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </main>
  );
};

export default ViaVerdeAboutPage;