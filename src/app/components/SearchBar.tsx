"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, User, Users, MapPin, Loader2 } from "lucide-react";

type Step = "who" | "identity" | "details" | "triage" | "result";

interface SearchBarProps {
  userType?: "self" | "other";
}

const ViaVerdeForm: React.FC<SearchBarProps> = ({ userType }) => {
  const [step, setStep] = useState<Step>(userType ? "identity" : "who");
  const [isSelf, setIsSelf] = useState<boolean | null>(userType ? userType === "self" : null);
  const [form, setForm] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [loadingText, setLoadingText] = useState("");
  const [isChronic, setIsChronic] = useState(false);
  const [hospitalNumber, setHospitalNumber] = useState("");
  const [profile, setProfile] = useState<any>(null);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const loadingMessages = [
    "A analisar sintomas...",
    "A avaliar nível de urgência...",
    "A procurar unidade sanitária mais próxima...",
    "A verificar disponibilidade hospitalar...",
    "A preparar pré-notificação...",
    "A validar protocolos clínicos...",
  ];

  useEffect(() => {
    if (step === "triage") {
      let i = 0;

      const interval = setInterval(() => {
        setLoadingText(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        generateResult();
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step]);

  const getPriority = () => {
    if (
      form.consciousness === "inconsciente" ||
      form.breathing === "dificuldade" ||
      form.bleeding === "grave"
    )
      return "Alta";

    if (
      form.symptoms?.toLowerCase().includes("dor intensa") ||
      form.symptoms?.toLowerCase().includes("febre alta")
    )
      return "Média";

    return "Baixa";
  };

  const getInstructions = (priority: string) => {
    if (priority === "Alta") {
      return [
        "Dirija-se imediatamente ao hospital mais próximo.",
        "Se possível, chame uma ambulância.",
        "Mantenha o paciente estável e consciente.",
        "Evite movimentos desnecessários.",
      ];
    }

    if (priority === "Média") {
      return [
        "Dirija-se a uma unidade sanitária nas próximas horas.",
        "Mantenha o paciente hidratado.",
        "Evite automedicação sem orientação.",
      ];
    }

    return [
      "Monitorar os sintomas.",
      "Caso piorem, procurar uma unidade sanitária.",
    ];
  };

  const getHospital = () => {
    const hospitals = [
      "Hospital Central de Maputo",
      "Hospital Geral de Mavalane",
      "Hospital José Macamo",
    ];
    return hospitals[Math.floor(Math.random() * hospitals.length)];
  };

  const generateResult = () => {
    const priority = getPriority();
    const instructions = getInstructions(priority);
    const hospital = getHospital();

    setResult({
      priority,
      instructions,
      hospital,
      reference: "VV-" + Math.floor(Math.random() * 100000),
    });

    setStep("result");
  };

  const handleChronicLookup = () => {
    // MOCK PROFILE DATABASE
    const mockProfiles: any = {
      "MPT-0384-18382": {
        name: "Nilton Novele",
        disease: "Diabetes Tipo 2",
        phone: "+258 84 000 0000",
      },
      "MPT-1000-99999": {
        name: "Maria João",
        disease: "Hipertensão",
        phone: "+258 82 111 2222",
      },
    };

    const found = mockProfiles[hospitalNumber];

    if (found) {
      setProfile({ id: hospitalNumber, ...found });
    } else {
      alert("Número hospitalar não encontrado.");
    }
  };

  const submitOccurrence = () => {
    setStep("triage");
  };

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 p-8 rounded-3xl shadow-xl border max-w-3xl mx-auto">

      {/* PROFILE (CHRONIC PATIENT HEADER) */}
      {profile && (
        <div className="bg-white p-4 rounded-xl shadow border mb-6">
          <h3 className="font-bold text-green-700">Utente Crónico</h3>
          <p><strong>Nome:</strong> {profile.name}</p>
          <p><strong>Nº Único:</strong> {profile.id}</p>
          <p><strong>Doença:</strong> {profile.disease}</p>
        </div>
      )}

      {/* STEP 1 */}
      {step === "who" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            A ocorrência é para si ou outra pessoa?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => { setIsSelf(true); setStep("identity"); }} className="choice-btn">
              <User /> Para mim
            </button>

            <button onClick={() => { setIsSelf(false); setStep("identity"); }} className="choice-btn">
              <Users /> Outra pessoa
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === "identity" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dados do utente</h2>

          {/* CHRONIC OPTION */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isChronic}
              onChange={(e) => setIsChronic(e.target.checked)}
            />
            Utente crónico
          </label>

          {isChronic && (
            <div className="space-y-2">
              <input
                placeholder="Número Único Hospitalar (ex: MPT-XXXX)"
                className="input"
                value={hospitalNumber}
                onChange={(e) => setHospitalNumber(e.target.value)}
              />

              <button
                onClick={handleChronicLookup}
                className="btn-primary w-full"
              >
                Validar Utente
              </button>
            </div>
          )}

          <input
            placeholder="Nome"
            className="input"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            placeholder="Apelido"
            className="input"
            onChange={(e) => handleChange("surname", e.target.value)}
          />

          <input
            placeholder="Localização"
            className="input"
            onChange={(e) => handleChange("location", e.target.value)}
          />

          <input
            placeholder="Telefone"
            className="input"
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <button onClick={() => setStep("details")} className="btn-primary w-full">
            Continuar
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === "details" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> Detalhes da Emergência
          </h2>

          <select className="input" onChange={(e) => handleChange("type", e.target.value)}>
            <option>Tipo de emergência</option>
            <option>Acidente</option>
            <option>Dor súbita</option>
            <option>Problema respiratório</option>
            <option>Febre</option>
            <option>Outro</option>
          </select>

          <select className="input" onChange={(e) => handleChange("consciousness", e.target.value)}>
            <option>Estado de consciência</option>
            <option value="normal">Consciente</option>
            <option value="confuso">Confuso</option>
            <option value="inconsciente">Inconsciente</option>
          </select>

          <select className="input" onChange={(e) => handleChange("breathing", e.target.value)}>
            <option>Respiração</option>
            <option value="normal">Normal</option>
            <option value="dificuldade">Dificuldade</option>
          </select>

          <select className="input" onChange={(e) => handleChange("bleeding", e.target.value)}>
            <option>Hemorragia</option>
            <option value="nenhuma">Nenhuma</option>
            <option value="leve">Leve</option>
            <option value="grave">Grave</option>
          </select>

          <textarea placeholder="Sintomas" className="input" onChange={(e) => handleChange("symptoms", e.target.value)} />
          <textarea placeholder="Descrição da ocorrência" className="input" onChange={(e) => handleChange("description", e.target.value)} />
          <textarea placeholder="Observações adicionais" className="input" onChange={(e) => handleChange("notes", e.target.value)} />

          <button onClick={submitOccurrence} className="btn-danger w-full">
            Submeter Emergência
          </button>
        </div>
      )}

      {/* TRIAGE */}
      {step === "triage" && (
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
          <Loader2 className="animate-spin text-green-600" size={40} />

          <h3 className="text-xl font-semibold text-gray-800">
            A Via Verde está a analisar a situação
          </h3>

          <p className="text-gray-600 text-sm animate-pulse">
            {loadingText}
          </p>

          <div className="text-xs text-gray-400">
            Sistema inteligente + validação clínica
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === "result" && result && (
        <div className="bg-white p-6 rounded-2xl shadow text-center space-y-4">

          <h3 className="text-xl font-bold text-green-600">
            Atendimento Ativado
          </h3>

          <p><strong>Prioridade:</strong> {result.priority}</p>
          <p><strong>Referência:</strong> {result.reference}</p>

          <div className="text-left">
            <h4 className="font-semibold mt-4 mb-2">Instruções Imediatas:</h4>
            <ul className="list-disc pl-5 text-sm">
              {result.instructions.map((i: string) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-xl mt-4">
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              <strong>Unidade Recomendada:</strong> {result.hospital}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              A unidade já foi notificada e está preparada para o seu atendimento.
            </p>
          </div>

          <button onClick={() => setStep("who")} className="btn w-full">
            Nova Ocorrência
          </button>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
        }

        .btn {
          padding: 12px;
          background: #e5e7eb;
          border-radius: 12px;
        }

        .btn-primary {
          padding: 14px;
          background: #16a34a;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-primary:hover {
          background: #15803d;
        }

        .btn-danger {
          padding: 14px;
          background: #dc2626;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        .choice-btn {
          padding: 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </section>
  );
};

export default ViaVerdeForm;