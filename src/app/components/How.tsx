"use client";

import React from "react";
import Image from "next/image";

export const How = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 sm:px-8 md:px-12 lg:px-16">
      
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold mb-12 text-center">
        <span className="text-blue-600">Como funciona o</span>{" "}
        <span className="text-green-500">SaúdeFila+</span>
      </h1>

      {/* ========================= */}
      {/* PROBLEMA */}
      {/* ========================= */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-700">
          Em Moçambique, muitos pacientes enfrentam{" "}
          <strong>longas filas, tempos de espera imprevisíveis</strong> e{" "}
          <strong>falta de organização nos serviços de saúde</strong>. 
          Além disso, a ausência de um sistema de identificação unificado 
          dificulta o acompanhamento do histórico clínico.
        </p>

        <p className="mt-4 text-lg text-gray-700">
          O <strong className="text-blue-600">SaúdeFila+</strong> resolve estes problemas
          através de uma plataforma digital inteligente que melhora o acesso,
          reduz filas físicas e optimiza o atendimento hospitalar.
        </p>
      </div>

      {/* ========================= */}
      {/* PACIENTES */}
      {/* ========================= */}
      <div className="mb-20 grid gap-10 md:grid-cols-2 items-center">
        
        {/* IMAGE */}
        <div className="flex justify-center md:order-1 order-1">
          <Image
            src="/pac.jpg"
            alt="Pacientes usando SaúdeFila+"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl object-cover w-full"
          />
        </div>

        {/* TEXT */}
        <div className="md:order-2 order-2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Para Pacientes
          </h2>

          <p className="text-lg text-gray-700 mb-6">
            Com o SaúdeFila+, os pacientes podem evitar filas físicas e
            receber atendimento mais rápido e organizado.
          </p>

          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1. Registo ou Identificação:</strong> Insira os seus dados
              ou utilize o seu número único de paciente.
            </li>
            <li>
              <strong>2. Escolha o Serviço:</strong> Marque consulta, peça ajuda
              SOS, encontre medicamentos ou faça triagem.
            </li>
            <li>
              <strong>3. Triagem Inteligente:</strong> Descreva os sintomas e o
              sistema define a prioridade automaticamente.
            </li>
            <li>
              <strong>4. Encaminhamento:</strong> Receba sugestão do hospital mais
              adequado para o seu caso.
            </li>
            <li>
              <strong>5. Fila Virtual:</strong> Obtenha número na fila e tempo
              estimado de atendimento.
            </li>
            <li>
              <strong>6. Check-in Rápido:</strong> Chegue ao hospital e utilize
              QR Code para atendimento imediato.
            </li>
          </ol>
        </div>
      </div>

      {/* ========================= */}
      {/* FUNCIONALIDADES */}
      {/* ========================= */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Funcionalidades Principais
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="font-semibold text-blue-600 mb-2">
              Marcação Inteligente
            </h3>
            <p className="text-sm text-gray-600">
              Agende consultas online ou via WhatsApp sem enfrentar filas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="font-semibold text-green-600 mb-2">
              Triagem Digital
            </h3>
            <p className="text-sm text-gray-600">
              Classificação automática de urgência com base nos sintomas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="font-semibold text-blue-600 mb-2">
              SOS Emergência
            </h3>
            <p className="text-sm text-gray-600">
              Solicite ajuda imediata e veja hospitais próximos rapidamente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="font-semibold text-green-600 mb-2">
              Medicamentos
            </h3>
            <p className="text-sm text-gray-600">
              Saiba onde encontrar medicamentos e como utilizá-los.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="font-semibold text-blue-600 mb-2">
              Doenças Crónicas
            </h3>
            <p className="text-sm text-gray-600">
              Acompanhe tratamentos e consultas recorrentes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
            <h3 className="font-semibold text-green-600 mb-2">
              Identificação Única
            </h3>
            <p className="text-sm text-gray-600">
              Evita duplicação de registos e melhora o histórico do paciente.
            </p>
          </div>

        </div>
      </div>

      {/* ========================= */}
      {/* HOSPITAIS */}
      {/* ========================= */}
      <div className="grid gap-10 md:grid-cols-2 items-center">
        
        {/* IMAGE */}
        <div className="flex justify-center md:order-2 order-1">
          <Image
            src="/hosp.jpg"
            alt="Gestão hospitalar"
            width={600}
            height={200}
            className="rounded-2xl shadow-xl object-cover w-full"
          />
        </div>

        {/* TEXT */}
        <div className="md:order-1 order-2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Para Hospitais
          </h2>

          <p className="text-lg text-gray-700 mb-6">
            O SaúdeFila+ também melhora significativamente a gestão hospitalar.
          </p>

          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1. Gestão de Filas:</strong> Visualização em tempo real dos pacientes.
            </li>
            <li>
              <strong>2. Priorização:</strong> Atenda primeiro os casos urgentes.
            </li>
            <li>
              <strong>3. Redução de Sobrecarga:</strong> Distribuição inteligente de pacientes.
            </li>
            <li>
              <strong>4. Melhor Planeamento:</strong> Dados para tomada de decisão.
            </li>
            <li>
              <strong>5. Atendimento Eficiente:</strong> Menos caos, mais organização.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default How;