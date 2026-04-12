"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Users } from "lucide-react";
import SearchBar from "../components/SearchBar";

type Step = "choice" | "form";

export default function RegistarOcorrenciaPage() {
  const [step, setStep] = useState<Step>("choice");
  const [isSelf, setIsSelf] = useState<boolean | null>(null);

  const handleChoice = (isForSelf: boolean) => {
    setIsSelf(isForSelf);
    setStep("form");
  };

  const handleBack = () => {
    if (step === "form") {
      setStep("choice");
      setIsSelf(null);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Main container with lg margin */}
      <div className="w-full lg:mx-auto lg:max-w-[calc(100%-320px)] px-4 md:px-8 py-6">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-semibold transition"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        {/* CHOICE STEP */}
        {step === "choice" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                Registar Ocorrência
              </h1>
              <p className="text-lg text-gray-600">
                Via Verde - Triagem e Encaminhamento
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                A ocorrência é para si ou outra pessoa?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* For Self */}
                <button
                  onClick={() => handleChoice(true)}
                  className="group bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 hover:border-green-600 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-600 text-white p-4 rounded-full group-hover:scale-110 transition">
                      <User size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Para Mim
                  </h3>
                  <p className="text-gray-600">
                    Estou a sentir sintomas e preciso de ajuda urgente.
                  </p>
                </button>

                {/* For Other */}
                <button
                  onClick={() => handleChoice(false)}
                  className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 hover:border-blue-600 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-600 text-white p-4 rounded-full group-hover:scale-110 transition">
                      <Users size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Outra Pessoa
                  </h3>
                  <p className="text-gray-600">
                    Estou a reportar uma emergência de outra pessoa.
                  </p>
                </button>
              </div>

              <div className="text-center mt-8 text-sm text-gray-500">
                <p>
                  Precisa de ajuda imediata?{" "}
                  <a href="tel:*808#" className="text-green-600 font-semibold hover:underline">
                    Ligue *808#
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORM STEP */}
        {step === "form" && isSelf !== null && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {isSelf ? "Minha Ocorrência" : "Reportar Ocorrência"}
              </h1>
              <p className="text-gray-600">
                {isSelf
                  ? "Descreva os seus sintomas e localização para receber ajuda"
                  : "Forneça informações sobre a pessoa que precisa de ajuda"}
              </p>
            </div>

            <SearchBar userType={isSelf ? "self" : "other"} />
          </div>
        )}
      </div>
    </div>
  );
}
