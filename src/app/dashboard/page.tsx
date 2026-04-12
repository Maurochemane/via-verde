"use client";

import { useState } from "react";
import Container from "../components/Container";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  LogOut,
  Lock,
  LockOpen,
  Filter,
  Plus,
} from "lucide-react";

type Status = "Pendente" | "Em Progresso" | "Resolvido";
type Priority = "Alta" | "Média" | "Baixa";

type Case = {
  id: string;
  name: string;
  surname: string;
  phone: string;
  type: string;
  consciousness: string;
  breathing: string;
  bleeding: string;
  symptoms: string;
  description: string;
  notes: string;
  priority: Priority;
  hospital: string;
  status: Status;
  chronic?: boolean;
};

const hospitals = [
  "Hospital Central de Maputo",
  "Hospital Geral de Mavalane",
  "Hospital José Macamo",
  "Hospital Provincial da Matola",
];

const MOCK_EMAIL = "nilton.novele@misau.gov.mz";
const MOCK_PASS = "2026";

const initialCases: Case[] = [
  {
    id: "VV-10001",
    name: "Maria",
    surname: "João",
    phone: "+258840000001",
    type: "Acidente",
    consciousness: "consciente",
    breathing: "normal",
    bleeding: "leve",
    symptoms: "dor intensa no peito",
    description: "Acidente de viação",
    notes: "Utente está estável",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
  },
  {
    id: "VV-10002",
    name: "Carlos",
    surname: "Sitoe",
    phone: "+258820000002",
    type: "Febre",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre alta",
    description: "Suspeita de malária",
    notes: "",
    priority: "Média",
    hospital: hospitals[1],
    status: "Em Progresso",
  },
  {
    id: "VV-10003",
    name: "Ana",
    surname: "Mucavele",
    phone: "+258850000003",
    type: "Respiratório",
    consciousness: "confuso",
    breathing: "dificuldade",
    bleeding: "nenhuma",
    symptoms: "falta de ar severa",
    description: "Crise asmática",
    notes: "Caso crítico",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
    chronic: true,
  },
  {
    id: "VV-10004",
    name: "João",
    surname: "Muchanga",
    phone: "+258860000004",
    type: "Diabetes",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "hiperglicemia",
    description: "Utente crónico",
    notes: "Diabetes tipo 2",
    priority: "Média",
    hospital: hospitals[2],
    status: "Em Progresso",
    chronic: true,
  },
  {
    id: "VV-10005",
    name: "Helena",
    surname: "Chissano",
    phone: "+258870000005",
    type: "Febre",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre leve",
    description: "Gripe",
    notes: "",
    priority: "Baixa",
    hospital: hospitals[1],
    status: "Resolvido",
  },
  {
    id: "VV-10006",
    name: "Miguel",
    surname: "Bila",
    phone: "+258880000006",
    type: "Acidente",
    consciousness: "inconsciente",
    breathing: "dificuldade",
    bleeding: "grave",
    symptoms: "trauma craniano",
    description: "Acidente laboral",
    notes: "Emergência máxima",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Pendente",
  },
  {
    id: "VV-10007",
    name: "Paula",
    surname: "Nhampossa",
    phone: "+258890000007",
    type: "Hipertensão",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "dor de cabeça",
    description: "Pressão alta",
    notes: "",
    priority: "Média",
    hospital: hospitals[3],
    status: "Em Progresso",
    chronic: true,
  },
  {
    id: "VV-10008",
    name: "David",
    surname: "Tembe",
    phone: "+258890000008",
    type: "Dor súbita",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "leve",
    symptoms: "dor abdominal",
    description: "Apêndice suspeito",
    notes: "",
    priority: "Alta",
    hospital: hospitals[2],
    status: "Pendente",
  },
  {
    id: "VV-10009",
    name: "Rosa",
    surname: "Mabunda",
    phone: "+258890000009",
    type: "Febre",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre alta persistente",
    description: "Possível malária",
    notes: "",
    priority: "Média",
    hospital: hospitals[1],
    status: "Pendente",
  },
  {
    id: "VV-10010",
    name: "Isaac",
    surname: "Massingue",
    phone: "+258890000010",
    type: "Acidente",
    consciousness: "confuso",
    breathing: "normal",
    bleeding: "leve",
    symptoms: "queda",
    description: "Trauma leve",
    notes: "",
    priority: "Baixa",
    hospital: hospitals[3],
    status: "Resolvido",
  },
  {
    id: "VV-10011",
    name: "Lina",
    surname: "Macuacua",
    phone: "+258890000011",
    type: "Respiratório",
    consciousness: "normal",
    breathing: "dificuldade",
    bleeding: "nenhuma",
    symptoms: "asma crónica",
    description: "Crónico",
    notes: "",
    priority: "Alta",
    hospital: hospitals[0],
    status: "Em Progresso",
    chronic: true,
  },
  {
    id: "VV-10012",
    name: "Edson",
    surname: "Munguambe",
    phone: "+258890000012",
    type: "Dor súbita",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "dor no peito leve",
    description: "Avaliação necessária",
    notes: "",
    priority: "Média",
    hospital: hospitals[2],
    status: "Pendente",
  },
  {
    id: "VV-10013",
    name: "Sara",
    surname: "Nconde",
    phone: "+258890000013",
    type: "Crónico",
    consciousness: "normal",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "controlo diabetes",
    description: "Consulta de rotina",
    notes: "",
    priority: "Baixa",
    hospital: hospitals[1],
    status: "Resolvido",
    chronic: true,
  },
];

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-700 border-red-300";
    case "Média":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Baixa":
      return "bg-green-100 text-green-700 border-green-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case "Pendente":
      return <AlertCircle className="text-orange-500" size={18} />;
    case "Em Progresso":
      return <Clock className="text-blue-500" size={18} />;
    case "Resolvido":
      return <CheckCircle2 className="text-green-500" size={18} />;
    default:
      return null;
  }
};

export default function DashboardPage() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cases, setCases] = useState<Case[]>(initialCases);
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [filterByPriority, setFilterByPriority] = useState<Priority | "Todos">("Todos");
  const [lock, setLock] = useState(true);

  const handleLogin = () => {
    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      setLogged(true);
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  const visibleCases = lock
    ? cases.filter((c) => c.hospital === selectedHospital)
    : cases;

  const filteredCases = filterByPriority === "Todos" 
    ? visibleCases 
    : visibleCases.filter((c) => c.priority === filterByPriority);

  const updateStatus = (id: string, status: Status) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteCase = (id: string) => {
    if (confirm("Deseja eliminar este caso?")) {
      setCases((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // ============ LOGIN ============
  if (!logged) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Container>
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ViaVerde
              </h1>
              <p className="text-gray-600 text-sm">Painel de Gestão Clínica</p>
              <p className="text-gray-500 text-xs mt-1">MISAU - Ministério da Saúde</p>
            </div>

            <div className="space-y-4">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="E-mail institucional"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="Palavra-chave"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Aceder ao Painel
              </button>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center">
                <strong>Demo:</strong> nilton.novele@misau.gov.mz / 2026
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // ============ DASHBOARD ============
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        {/* HEADER */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-t-4 border-green-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo, Nilton Novele
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Hospital Central de Maputo • Nº de Profissional: HC-77821
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setLock(!lock)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition font-medium"
              >
                {lock ? <Lock size={18} /> : <LockOpen size={18} />}
                {lock ? "Este Hospital" : "Todos"}
              </button>

              <button
                onClick={() => setLogged(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition font-medium"
              >
                <LogOut size={18} /> Sair
              </button>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {lock && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unidade Sanitária
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                {hospitals.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" /> Prioridade
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={filterByPriority}
              onChange={(e) => setFilterByPriority(e.target.value as Priority | "Todos")}
            >
              <option value="Todos">Todas as Prioridades</option>
              <option value="Alta">🔴 Alta</option>
              <option value="Média">🟡 Média</option>
              <option value="Baixa">🟢 Baixa</option>
            </select>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Total de Casos</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{filteredCases.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium">Prioridade Alta</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {filteredCases.filter((c) => c.priority === "Alta").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Em Progresso</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {filteredCases.filter((c) => c.status === "Em Progresso").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Resolvidos</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {filteredCases.filter((c) => c.status === "Resolvido").length}
            </p>
          </div>
        </div>

        {/* CASES TABLE */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Utente</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sintomas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prioridade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-semibold text-green-600">{c.id}</span>
                      {c.chronic && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Crónico</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{c.name} {c.surname}</p>
                        <p className="text-xs text-gray-500">{c.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.symptoms}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(c.priority)}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(c.status)}
                        <span className="text-sm font-medium text-gray-700">{c.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {c.status !== "Resolvido" && (
                          <button
                            onClick={() => updateStatus(c.id, "Resolvido")}
                            className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs hover:bg-green-100 transition font-medium"
                          >
                            Resolver
                          </button>
                        )}
                        <button
                          onClick={() => deleteCase(c.id)}
                          className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs hover:bg-red-100 transition font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}