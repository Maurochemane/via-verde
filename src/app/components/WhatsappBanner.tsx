"use client";

import { useState } from "react";
import {
  Smartphone,
  Hospital,
  Hash,
  MessageSquareText,
} from "lucide-react";
import USSDSimulator from "./USSDSimulator";

const USSDBanner = () => {
  const [isUSSDOpen, setIsUSSDOpen] = useState(false);

  return (
    <section className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-12 my-12 max-w-5xl mx-auto shadow-sm">

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex justify-center mb-3">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <Smartphone size={26} />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Marcação de Consultas via USSD
        </h2>

        <p className="text-gray-600 mt-3 text-base">
          Para consultas gerais, utilize o código <strong>*808#</strong>. 
          Um processo simples, rápido e acessível, sem necessidade de internet.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <Smartphone className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-800">
              1. Aceda ao USSD
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Marque <strong>*808#</strong> no seu telemóvel e escolha a opção de marcação de consulta.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <Hospital className="text-green-600" size={20} />
            <h3 className="font-semibold text-gray-800">
              2. Escolha a unidade
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Selecione o hospital ou unidade sanitária mais próxima ou conveniente.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <Hash className="text-purple-600" size={20} />
            <h3 className="font-semibold text-gray-800">
              3. Receba o seu número
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Será atribuído um número de fila (slip) para o seu atendimento.
          </p>
        </div>

      </div>

      {/* SMS Info */}
      <div className="bg-white border rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
          <MessageSquareText size={22} />
        </div>

        <p className="text-gray-700 text-sm md:text-base">
          O seu número de fila será atualizado automaticamente via SMS, 
          permitindo acompanhar o progresso sem necessidade de permanecer na unidade sanitária.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setIsUSSDOpen(true)}
          className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 cursor-pointer"
        >
          Simular USSD
        </button>
        <a
          href="tel:*808#"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Discar *808#
        </a>
      </div>

      <USSDSimulator isOpen={isUSSDOpen} onClose={() => setIsUSSDOpen(false)} />
    </section>
  );
};

export default USSDBanner;