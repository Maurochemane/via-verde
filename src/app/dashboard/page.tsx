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
  X,
  QrCode,
  Sliders,
  MessageSquare,
  MapPin,
  Stethoscope,
  Activity,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Status = "Pendente" | "Em Progresso" | "Resolvido";
type ManchesterPriority = "Vermelho" | "Laranja" | "Amarelo" | "Verde" | "Azul";

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
  priority: ManchesterPriority;
  hospital: string;
  status: Status;
  chronic?: boolean;
  // Novos campos
  location: string;
  clinicalQuadro: string;
  aiConfidence: number; // 0-10
  doctorJustification: string;
  originalPriority: ManchesterPriority;
  modifications: Array<{
    date: string;
    from: ManchesterPriority;
    to: ManchesterPriority;
    reason: string;
    doctor: string;
  }>;
  qrCode: string;
};

const hospitals = [
  { name: "Hospital Central de Maputo", specialties: ["Cirurgia", "Cardiologia", "Traumatologia", "Pediatria"] },
  { name: "Hospital Geral de Mavalane", specialties: ["Clínica Geral", "Ortopedia", "Pneumologia"] },
  { name: "Hospital José Macamo", specialties: ["Obstetricia", "Estomatologia", "Oftalmologia"] },
  { name: "Hospital Provincial da Matola", specialties: ["Urgência", "Radiologia", "Psiquiatria"] },
];

const manchesterColors = {
  Vermelho: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", label: "🔴 Emergência" },
  Laranja: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", label: "🟠 Urgência" },
  Amarelo: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", label: "🟡 Urgente" },
  Verde: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", label: "🟢 Pouco Urgente" },
  Azul: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", label: "🔵 Não Urgente" },
};

const MOCK_EMAIL = "nilton.novele@misau.gov.mz";
const MOCK_PASS = "2026";

const initialCases: Case[] = [
  {
    id: "VV-10001",
    name: "Maria",
    surname: "João",
    phone: "+258840000001",
    type: "Acidente",
    consciousness: "inconsciente",
    breathing: "dificuldade",
    bleeding: "grave",
    symptoms: "dor intensa no peito, falta de ar",
    description: "Acidente de viação - colisão frontal",
    notes: "Utente estável após tratamento",
    priority: "Vermelho",
    originalPriority: "Vermelho",
    hospital: "Hospital Central de Maputo",
    status: "Pendente",
    location: "Avenida Mao Tse Tung, Maputo",
    clinicalQuadro: "Trauma craniano, potencial fratura de costelas",
    aiConfidence: 9.5,
    doctorJustification: "Mantido em Vermelho - caso crítico requer cirurgia imediata",
    modifications: [
      {
        date: "2026-04-16 10:30",
        from: "Vermelho",
        to: "Vermelho",
        reason: "Confirmado na triagem inicial",
        doctor: "Dr. Silva",
      },
    ],
    qrCode: "VV-10001-2026-04-16",
    chronic: false,
  },
  {
    id: "VV-10002",
    name: "Carlos",
    surname: "Sitoe",
    phone: "+258820000002",
    type: "Febre",
    consciousness: "consciente",
    breathing: "normal",
    bleeding: "nenhuma",
    symptoms: "febre alta 39.5°C, tremores",
    description: "Suspeita de malária ou dengue",
    notes: "Resultado de teste pendente",
    priority: "Laranja",
    originalPriority: "Laranja",
    hospital: "Hospital Geral de Mavalane",
    status: "Em Progresso",
    location: "Bairro de Inhagoia, Maputo",
    clinicalQuadro: "Suspeita de malária. Febre alta persistente.",
    aiConfidence: 7.8,
    doctorJustification: "Alterado para Laranja - esperar testes de malária",
    modifications: [
      {
        date: "2026-04-16 09:00",
        from: "Amarelo",
        to: "Laranja",
        reason: "Febre acima de 39°C requer isolamento precautório",
        doctor: "Dra. Novele",
      },
    ],
    qrCode: "VV-10002-2026-04-16",
    chronic: false,
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
    symptoms: "falta de ar severa, chiado ao respirar",
    description: "Crise asmática - utente crónico",
    notes: "Necessita oxigênio - O2 saturação 88%",
    priority: "Vermelho",
    originalPriority: "Laranja",
    hospital: "Hospital Central de Maputo",
    status: "Pendente",
    location: "Polana, Maputo - próximo Hospital",
    clinicalQuadro: "Asma severa com crise aguda. Saturação O2 crítica.",
    aiConfidence: 8.9,
    doctorJustification: "Escalado para Vermelho - saturação crítica <90%, risco de parada respiratória",
    modifications: [
      {
        date: "2026-04-16 07:45",
        from: "Laranja",
        to: "Vermelho",
        reason: "O2 sat descer para 88%, necessário internamento urgente",
        doctor: "Dr. Muchanga",
      },
    ],
    qrCode: "VV-10003-2026-04-16",
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
    symptoms: "glicose elevada, fadiga",
    description: "Utente crónico - Diabetes tipo 2",
    notes: "Controlo rotinário",
    priority: "Amarelo",
    originalPriority: "Amarelo",
    hospital: "Hospital José Macamo",
    status: "Em Progresso",
    location: "Matosinhos, Maputo",
    clinicalQuadro: "Diabetes tipo 2. Glicose: 280 mg/dL. Nenhuma complicação aguda.",
    aiConfidence: 6.5,
    doctorJustification: "Consulta de controlo rotinário - sem urgência",
    modifications: [],
    qrCode: "VV-10004-2026-04-16",
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
    symptoms: "febre leve 37.8°C, tosse",
    description: "Gripe comum",
    notes: "Caso simples - auto-limitado",
    priority: "Verde",
    originalPriority: "Azul",
    hospital: "Hospital Geral de Mavalane",
    status: "Resolvido",
    location: "Bairro Júlio Nyenzeni, Maputo",
    clinicalQuadro: "Suspeita de gripe. Sintomas leves. Sem fatores de risco.",
    aiConfidence: 5.2,
    doctorJustification: "Ligeiramente mais urgente devido febre - recomendação de paracetamol e repouso",
    modifications: [
      {
        date: "2026-04-15 16:00",
        from: "Azul",
        to: "Verde",
        reason: "Febre presente justifica observação mais atenta",
        doctor: "Enf. Tembe",
      },
    ],
    qrCode: "VV-10005-2026-04-16",
    chronic: false,
  },
  {
    id: "VV-10006",
    name: "Miguel",
    surname: "Bila",
    phone: "+258880000006",
    type: "Acidente",
    consciousness: "confuso",
    breathing: "normal",
    bleeding: "grave",
    symptoms: "trauma craniano, hemorragia",
    description: "Acidente laboral - queda de altura",
    notes: "Emergência - necessário CT urgente",
    priority: "Vermelho",
    originalPriority: "Vermelho",
    hospital: "Hospital Central de Maputo",
    status: "Pendente",
    location: "Zona Industrial, Matola",
    clinicalQuadro: "Trauma craniano com potencial lesão cerebral. Hemorragia controlada.",
    aiConfidence: 9.8,
    doctorJustification: "Mantido em Vermelho - risco de morte necessita cirurgia neurotrauma imediata",
    modifications: [],
    qrCode: "VV-10006-2026-04-16",
    chronic: false,
  },
];

const getPriorityColor = (priority: ManchesterPriority) => {
  return `${manchesterColors[priority].bg} ${manchesterColors[priority].text} ${manchesterColors[priority].border}`;
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
  const [selectedHospital, setSelectedHospital] = useState("Hospital Central de Maputo");
  const [filterByPriority, setFilterByPriority] = useState<ManchesterPriority | "Todos">("Todos");
  const [lock, setLock] = useState(true);

  // Modal state
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");
  const [editingJustification, setEditingJustification] = useState(false);
  const [newJustification, setNewJustification] = useState("");
  const [newPriority, setNewPriority] = useState<ManchesterPriority>("Vermelho");

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

  const filteredCases =
    filterByPriority === "Todos"
      ? visibleCases
      : visibleCases.filter((c) => c.priority === filterByPriority);

  const updatePriority = (id: string, newPrio: ManchesterPriority, justification: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            priority: newPrio,
            doctorJustification: justification,
            modifications: [
              ...c.modifications,
              {
                date: new Date().toLocaleString("pt-PT"),
                from: c.priority,
                to: newPrio,
                reason: justification,
                doctor: "Dr. Nilton Novele",
              },
            ],
          };
        }
        return c;
      })
    );
  };

  const updateStatus = (id: string, status: Status) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    if (selectedCase?.id === id) {
      setSelectedCase((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const updateConfidence = (id: string, confidence: number) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, aiConfidence: confidence } : c))
    );
    if (selectedCase?.id === id) {
      setSelectedCase((prev) => (prev ? { ...prev, aiConfidence: confidence } : null));
    }
  };

  // ============ LOGIN ============
  if (!logged) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <Container>
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 border-t-4 border-green-600">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                ViaVerde
              </h1>
              <p className="text-gray-600 font-semibold">Painel de Gestão Clínica</p>
              <p className="text-gray-500 text-sm mt-1">MISAU - Ministério da Saúde</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">E-mail Institucional</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  placeholder="nilton.novele@misau.gov.mz"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Palavra-chave</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                  placeholder="••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
              >
                🔒 Aceder ao Painel
              </button>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-600 text-center font-mono">
                <strong>Demo:</strong> nilton.novele@misau.gov.mz
                <br />
                <strong>Senha:</strong> 2026
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
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">Bem-vindo, Dr. Nilton Novele</h1>
              <p className="text-green-100 text-sm">
                Hospital Central de Maputo • Nº Profissional: HC-77821
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setLock(!lock)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg border border-white/30 transition font-semibold backdrop-blur"
              >
                {lock ? <Lock size={18} /> : <LockOpen size={18} />}
                {lock ? "Este Hospital" : "Todos"}
              </button>

              <button
                onClick={() => setLogged(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition font-semibold"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">🏥 Unidade Sanitária</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                {hospitals.map((h) => (
                  <option key={h.name} value={h.name}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" /> Urgência (Manchester)
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              value={filterByPriority}
              onChange={(e) => setFilterByPriority(e.target.value as ManchesterPriority | "Todos")}
            >
              <option value="Todos">Todas as Urgências</option>
              <option value="Vermelho">🔴 Emergência</option>
              <option value="Laranja">🟠 Urgência</option>
              <option value="Amarelo">🟡 Urgente</option>
              <option value="Verde">🟢 Pouco Urgente</option>
              <option value="Azul">🔵 Não Urgente</option>
            </select>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-600 text-xs font-medium">Total de Casos</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{filteredCases.length}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-gray-600 text-xs font-medium">🔴 Emergência</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {filteredCases.filter((c) => c.priority === "Vermelho").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
            <p className="text-gray-600 text-xs font-medium">🟠 Urgência</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {filteredCases.filter((c) => c.priority === "Laranja").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-600 text-xs font-medium">Em Progresso</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {filteredCases.filter((c) => c.status === "Em Progresso").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-gray-600 text-xs font-medium">✅ Resolvidos</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {filteredCases.filter((c) => c.status === "Resolvido").length}
            </p>
          </div>
        </div>

        {/* CASES TABLE */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">QR</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Utente</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sintomas</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Urgência</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
                        title="Ver detalhes"
                      >
                        <QrCode size={18} />
                        <span className="text-xs font-mono">{c.id}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {c.name} {c.surname}
                          {c.chronic && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Crónico</span>}
                        </p>
                        <p className="text-xs text-gray-500">{c.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{c.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.symptoms.substring(0, 40)}...</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${manchesterColors[c.priority].bg} ${manchesterColors[c.priority].text} ${manchesterColors[c.priority].border}`}
                      >
                        {manchesterColors[c.priority].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {c.status === "Pendente" && <AlertCircle className="text-orange-500" size={18} />}
                        {c.status === "Em Progresso" && <Clock className="text-blue-500" size={18} />}
                        {c.status === "Resolvido" && <CheckCircle2 className="text-green-500" size={18} />}
                        <span className="text-sm font-medium text-gray-700">{c.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedCase(c);
                          setEditingJustification(false);
                          setExpandedSection("overview");
                        }}
                        className="px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs hover:bg-blue-100 transition font-semibold"
                      >
                        📋 Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      {/* MODAL DETALHES DO CASO */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`${manchesterColors[selectedCase.priority].bg} ${manchesterColors[selectedCase.priority].text} p-6 flex justify-between items-start`}>
              <div>
                <div className="flex items-center gap-3">
                  <QrCode size={24} />
                  <h2 className="text-2xl font-bold">{selectedCase.id} - QR: {selectedCase.qrCode}</h2>
                </div>
                <p className="text-sm mt-2 opacity-90">
                  {selectedCase.name} {selectedCase.surname} • {selectedCase.phone}
                </p>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* OVERVIEW */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "overview" ? null : "overview")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <Activity size={20} /> Visão Geral
                  </span>
                  {expandedSection === "overview" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "overview" && (
                  <div className="p-4 space-y-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Tipo</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedCase.type}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Status</p>
                        <select
                          value={selectedCase.status}
                          onChange={(e) => updateStatus(selectedCase.id, e.target.value as Status)}
                          className="px-3 py-2 border border-gray-300 rounded-lg font-semibold text-gray-900"
                        >
                          <option value="Pendente">⏳ Pendente</option>
                          <option value="Em Progresso">🔄 Em Progresso</option>
                          <option value="Resolvido">✅ Resolvido</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Consciência</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.consciousness}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Respiração</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.breathing}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Hemorragia</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.bleeding}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Hospital</p>
                        <p className="text-gray-900 font-semibold">{selectedCase.hospital}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-600 uppercase">Sintomas</p>
                      <p className="text-gray-900">{selectedCase.symptoms}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-600 uppercase">Descrição do Caso</p>
                      <p className="text-gray-900">{selectedCase.description}</p>
                    </div>

                    {selectedCase.notes && (
                      <div>
                        <p className="text-xs font-bold text-gray-600 uppercase">Notas</p>
                        <p className="text-gray-900">{selectedCase.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* LOCALIZAÇÃO E QUADRO CLÍNICO */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "clinical" ? null : "clinical")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={20} /> Localização & Quadro Clínico
                  </span>
                  {expandedSection === "clinical" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "clinical" && (
                  <div className="p-4 space-y-4 bg-blue-50 border-t border-blue-200">
                    <div>
                      <p className="text-xs font-bold text-blue-700 uppercase mb-2">📍 Localização do Doente</p>
                      <p className="text-gray-900 bg-white p-3 rounded border border-blue-200">{selectedCase.location}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-700 uppercase mb-2">🏥 Quadro Clínico</p>
                      <p className="text-gray-900 bg-white p-3 rounded border border-blue-200">{selectedCase.clinicalQuadro}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ESCALA MANCHESTER */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "manchester" ? null : "manchester")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <Stethoscope size={20} /> Escala de Manchester
                  </span>
                  {expandedSection === "manchester" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "manchester" && (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                      {(Object.keys(manchesterColors) as ManchesterPriority[]).map((priority) => (
                        <button
                          key={priority}
                          onClick={() => {
                            setNewPriority(priority);
                            setEditingJustification(true);
                            setNewJustification(selectedCase.doctorJustification);
                          }}
                          className={`p-3 rounded-lg border-2 font-bold text-center transition cursor-pointer ${
                            selectedCase.priority === priority
                              ? `${manchesterColors[priority].bg} ${manchesterColors[priority].text} ${manchesterColors[priority].border} border-2`
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-150"
                          }`}
                        >
                          {manchesterColors[priority].label}
                        </button>
                      ))}
                    </div>

                    {selectedCase.originalPriority !== selectedCase.priority && (
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                        <p className="text-xs font-bold text-yellow-700">⚠️ PRIORITY ALTERADA</p>
                        <p className="text-sm text-gray-900">
                          Original: {manchesterColors[selectedCase.originalPriority].label} → Atual:{" "}
                          {manchesterColors[selectedCase.priority].label}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CONFIABILIDADE AI */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "ai" ? null : "ai")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <Sliders size={20} /> Confiabilidade do AI
                  </span>
                  {expandedSection === "ai" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "ai" && (
                  <div className="p-4 space-y-4 bg-purple-50 border-t border-purple-200">
                    <div>
                      <p className="text-xs font-bold text-purple-700 uppercase mb-2">Nível de Confiança (0-10)</p>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={selectedCase.aiConfidence}
                          onChange={(e) => updateConfidence(selectedCase.id, parseFloat(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-2xl font-bold text-purple-700 bg-white p-3 rounded min-w-[60px] text-center">
                          {selectedCase.aiConfidence.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {selectedCase.aiConfidence >= 8
                          ? "✅ Muito confiável"
                          : selectedCase.aiConfidence >= 6
                          ? "⚠️ Confiável"
                          : "❌ Baixa confiança"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* JUSTIFICATIVA DO MÉDICO */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "justification" ? null : "justification")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare size={20} /> Justificativa Médica
                  </span>
                  {expandedSection === "justification" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "justification" && (
                  <div className="p-4 space-y-4 bg-green-50 border-t border-green-200">
                    {!editingJustification ? (
                      <>
                        <p className="text-gray-900 bg-white p-3 rounded border border-green-200">{selectedCase.doctorJustification}</p>
                        <button
                          onClick={() => {
                            setEditingJustification(true);
                            setNewJustification(selectedCase.doctorJustification);
                            for (let p of Object.keys(manchesterColors) as ManchesterPriority[]) {
                              if (selectedCase.priority === p) {
                                setNewPriority(p);
                                break;
                              }
                            }
                          }}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                        >
                          ✏️ Editar Justificativa
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-xs font-bold text-gray-700 uppercase mb-2">Alterar Urgência</p>
                          <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value as ManchesterPriority)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                          >
                            {(Object.keys(manchesterColors) as ManchesterPriority[]).map((p) => (
                              <option key={p} value={p}>
                                {manchesterColors[p].label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-gray-700 uppercase mb-2">Nova Justificativa</p>
                          <textarea
                            value={newJustification}
                            onChange={(e) => setNewJustification(e.target.value)}
                            placeholder="Explique o motivo da alteração..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium h-24 focus:outline-none focus:ring-2 focus:ring-green-600"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              updatePriority(selectedCase.id, newPriority, newJustification);
                              setEditingJustification(false);
                              // Atualizar selectedCase
                              const updated = cases.find((c) => c.id === selectedCase.id);
                              if (updated) setSelectedCase(updated);
                            }}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                          >
                            ✅ Guardar
                          </button>
                          <button
                            onClick={() => setEditingJustification(false)}
                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold"
                          >
                            ❌ Cancelar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* HISTÓRICO DE MUDANÇAS */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "history" ? null : "history")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    <History size={20} /> Histórico de Mudanças
                  </span>
                  {expandedSection === "history" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "history" && (
                  <div className="p-4 space-y-3 bg-indigo-50 border-t border-indigo-200">
                    {selectedCase.modifications.length === 0 ? (
                      <p className="text-gray-600 italic">Sem histórico de mudanças</p>
                    ) : (
                      selectedCase.modifications.map((mod, idx) => (
                        <div key={idx} className="bg-white p-3 rounded border border-indigo-200 space-y-1">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-gray-700">{mod.date}</p>
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{mod.doctor}</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            {manchesterColors[mod.from].label} → {manchesterColors[mod.to].label}
                          </p>
                          <p className="text-sm text-gray-700">"{mod.reason}"</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* PORTFOLIO HOSPITAL */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === "portfolio" ? null : "portfolio")}
                  className="w-full bg-gray-100 p-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  <span className="flex items-center gap-2">
                    🏥 Portfolio do Hospital
                  </span>
                  {expandedSection === "portfolio" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === "portfolio" && (
                  <div className="p-4 space-y-3 bg-orange-50 border-t border-orange-200">
                    <p className="font-semibold text-gray-900">{selectedCase.hospital}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {hospitals
                        .find((h) => h.name === selectedCase.hospital)
                        ?.specialties.map((spec) => (
                          <div
                            key={spec}
                            className="bg-white px-3 py-2 rounded border border-orange-200 text-sm font-semibold text-gray-900 text-center"
                          >
                            {spec}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedCase(null)}
                className="w-full px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}