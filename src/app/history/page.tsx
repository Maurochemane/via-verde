"use client";

import React, { useState } from "react";
import { User, Users, Phone, Lock, CheckCircle } from "lucide-react";

type Step = "login" | "otp" | "history";

const MOCK_OTP = "2026";

export default function ViaVerdeHistory() {
  const [step, setStep] = useState<Step>("login");
  const [form, setForm] = useState<any>({});
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const verifyOTP = () => {
    if (otp === MOCK_OTP) {
      setVerified(true);
      setStep("history");
    } else {
      alert("Código OTP inválido. Use 2026 (mock)");
    }
  };

  const occurrences = [
    {
      id: "VV-10021",
      owner: "self",
      title: "Dor torácica aguda",
      status: "Resolvido",
      hospital: "Hospital Central de Maputo",
      date: "2026-03-18",
    },
    {
      id: "VV-10022",
      owner: "self",
      title: "Febre alta persistente",
      status: "Concluído",
      hospital: "Hospital Geral de Mavalane",
      date: "2026-02-11",
    },
    {
      id: "VV-10023",
      owner: "other",
      title: "Acidente rodoviário",
      status: "Crítico (atendido)",
      hospital: "Hospital José Macamo",
      date: "2026-01-05",
    },
    {
      id: "VV-10024",
      owner: "other",
      title: "Dificuldade respiratória",
      status: "Resolvido",
      hospital: "Hospital Central de Maputo",
      date: "2025-12-20",
    },
    {
      id: "VV-10025",
      owner: "self",
      title: "Consulta de urgência dentária",
      status: "Não compareceu",
      hospital: "Clínica Dental Maputo",
      date: "2025-11-02",
    },
    {
      id: "VV-10026",
      owner: "other",
      title: "Suspeita de infeção",
      status: "Em análise",
      hospital: "Hospital Provincial",
      date: "2025-10-14",
    },
    {
      id: "VV-10027",
      owner: "self",
      title: "Lesão muscular",
      status: "Descontinuado",
      hospital: "Centro de Saúde da Matola",
      date: "2025-09-30",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolvido":
        return "text-green-600";
      case "Concluído":
        return "text-blue-600";
      case "Crítico (atendido)":
        return "text-red-600";
      case "Não compareceu":
        return "text-orange-500";
      case "Em análise":
        return "text-yellow-600";
      case "Descontinuado":
        return "text-gray-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">

      {/* LOGIN */}
      {step === "login" && (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-green-700 text-center">
            Aceder ao Histórico ViaVerde
          </h2>

          <input
            placeholder="Nome"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            placeholder="Apelido"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleChange("surname", e.target.value)}
          />

          <input
            placeholder="Telefone"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <button
            onClick={() => setStep("otp")}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Continuar
          </button>
        </div>
      )}

      {/* OTP */}
      {step === "otp" && (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4 text-center">
          <Lock className="mx-auto text-green-600" size={40} />

          <h2 className="text-xl font-bold text-green-700">
            Verificação OTP
          </h2>

          <p className="text-sm text-gray-600">
            Introduza o código enviado (demo: 2026)
          </p>

          <input
            placeholder="Código OTP"
            className="w-full p-3 border rounded-lg text-center tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Verificar
          </button>
        </div>
      )}

      {/* HISTORY */}
      {step === "history" && (
        <div className="w-full max-w-5xl space-y-6">

          <h1 className="text-3xl font-bold text-green-700 text-center">
            Histórico Clínico ViaVerde
          </h1>

          {/* MY CASES */}
          <div>
            <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
              <User /> As Minhas Ocorrências
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              {occurrences
                .filter((o) => o.owner === "self")
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl shadow border"
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.hospital}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <p className={`mt-2 font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* OTHER PEOPLE */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2 mt-6">
              <Users /> Outras Ocorrências Associadas
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              {occurrences
                .filter((o) => o.owner === "other")
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl shadow border"
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.hospital}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <p className={`mt-2 font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => {
                setStep("login");
                setOtp("");
                setVerified(false);
              }}
              className="bg-gray-200 px-6 py-2 rounded-lg"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}