"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, PhoneOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Type casting to fix Framer Motion v11 compatibility with React 19
const MotionDiv = motion.div as React.FC<any>;
const MotionButton = motion.button as React.FC<any>;
interface USSDState {
  screen: "idle" | "main" | "service" | "consult_location" | "triaging_name" | "triaging_location" | "triaging_phone" | "triaging_symptoms" | "triaging_description" | "ai_analyzing" | "hospital_recommended" | "confirmation" | "ticket";
  currentInput: string;
  selectedService: string;
  selectedLocation: string;
  patientName: string;
  patientLocation: string;
  patientPhone: string;
  patientSymptoms: string;
  ticketNumber: string;
  messages: string[];
  inputBuffer: string;
  recommendedHospital: any;
}

// Mock hospital database with locations
const HOSPITALS = [
  { id: 1, name: "Hospital Central de Maputo", district: "Maputo", distance: 2 },
  { id: 2, name: "Hospital Geral de Mavalane", district: "Mavalane", distance: 5 },
  { id: 3, name: "Hospital José Macamo", district: "Polana", distance: 3 },
  { id: 4, name: "Hospital Provincial", district: "Maputo", distance: 4 },
  { id: 5, name: "Centro de Saúde da Matola", district: "Matola", distance: 8 },
];

// QWERTY keyboard layout
const KEYBOARD_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const USSDSimulator: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<USSDState>({
    screen: "idle",
    currentInput: "",
    selectedService: "",
    selectedLocation: "",
    patientName: "",
    patientLocation: "",
    patientPhone: "",
    patientSymptoms: "",
    ticketNumber: "",
    messages: [],
    inputBuffer: "",
    recommendedHospital: null,
  });

  // Handle keyboard input from computer
  useEffect(() => {
    if (!isOpen || (state.screen !== "triaging_name" && state.screen !== "triaging_location")) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      // Handle letters
      if (/^[a-zA-Záàâãäãéèêëíìîïóòôõöúùûüçñ]$/.test(e.key)) {
        setState((prev) => ({
          ...prev,
          inputBuffer: prev.inputBuffer + e.key.toLowerCase(),
        }));
      }
      // Handle space
      else if (e.key === " ") {
        setState((prev) => ({
          ...prev,
          inputBuffer: prev.inputBuffer + " ",
        }));
      }
      // Handle backspace
      else if (e.key === "Backspace") {
        setState((prev) => ({
          ...prev,
          inputBuffer: prev.inputBuffer.slice(0, -1),
        }));
      }
      // Handle enter
      else if (e.key === "Enter") {
        handleSubmitText(state.inputBuffer);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, state.screen, state.inputBuffer]);

  // Function to find nearest hospital based on location
  const findNearestHospital = (location: string) => {
    const locationLower = location.toLowerCase();
    
    // Simple matching logic based on district
    const matched = HOSPITALS.find(h => 
      h.district.toLowerCase().includes(locationLower) ||
      locationLower.includes(h.district.toLowerCase())
    );
    
    return matched || HOSPITALS[0]; // Default to first hospital
  };

  const handleCharacter = (char: string) => {
    if (state.screen === "triaging_name" || state.screen === "triaging_location") {
      setState((prev) => ({
        ...prev,
        inputBuffer: prev.inputBuffer + char.toLowerCase(),
      }));
    }
  };

  const handleDigit = (digit: string) => {
    if (state.screen === "idle") {
      setState((prev) => ({
        ...prev,
        screen: "main",
        messages: ["*808# - ViaVerde", "", "1. Consulta", "2. Triagem", "0. Sair"],
        currentInput: "",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      currentInput: digit,
    }));

    // Handle menu selections
    setTimeout(() => {
      handleMenuSelection(digit);
    }, 300);
  };

  const handleBackspace = () => {
    setState((prev) => ({
      ...prev,
      inputBuffer: prev.inputBuffer.slice(0, -1),
    }));
  };

  const handleSubmitText = (text: string) => {
    if (state.screen === "triaging_name") {
      if (text.trim().length === 0) {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, "Nome inválido. Tente novamente."],
          inputBuffer: "",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        patientName: text.trim(),
        screen: "triaging_location",
        messages: [
          "TRIAGEM COM IA",
          "",
          "✓ Nome registado",
          "",
          "Introduza a localização:",
          "(ex: Maputo, Mavalane)",
        ],
        inputBuffer: "",
        currentInput: "",
      }));
    } else if (state.screen === "triaging_location") {
      if (text.trim().length === 0) {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, "Localização inválida."],
          inputBuffer: "",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        patientLocation: text.trim(),
        screen: "triaging_phone",
        messages: [
          "TRIAGEM COM IA",
          "",
          `✓ Nome: ${prev.patientName}`,
          `✓ Local: ${text.trim()}`,
          "",
        //   "Introduza o telefone:",
        //   "(ex: 82XXXXXXX)",
        ],
        inputBuffer: "",
        currentInput: "",
      }));
    // } else if (state.screen === "triaging_phone") {
    //   if (text.trim().length < 7) {
    //     setState((prev) => ({
    //       ...prev,
    //       messages: [...prev.messages, "Telefone inválido."],
    //       inputBuffer: "",
    //     }));
    //     return;
    //   }

      setState((prev) => ({
        ...prev,
        // patientPhone: text.trim(),
        screen: "triaging_symptoms",
        messages: [
          "Qual é o sintoma principal?",
          "",
          "1. Dor de Cabeça",
          "2. Dor Torácica",
          "3. Febre",
          "4. Dificuldade Respiratória",
          "5. Outro (descrever)",
        ],
        inputBuffer: "",
        currentInput: "",
      }));
    } else if (state.screen === "triaging_description") {
      setState((prev) => ({
        ...prev,
        patientSymptoms: prev.patientSymptoms + " - " + text.trim(),
        screen: "ai_analyzing",
        messages: [
          "Analisando dados...",
          "Consultando base de hospitais...",
          "",
          "⏳ Processando triagem...",
        ],
        inputBuffer: "",
        currentInput: "",
      }));

      // Simulate AI analysis with location capture
      setTimeout(() => {
        // Capture approximate location (2km radius)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              // Store approximate coordinates (rounded to ~2km precision)
              const approxLat = Math.round(latitude * 100) / 100;
              const approxLng = Math.round(longitude * 100) / 100;
              
              const hospital = findNearestHospital(state.patientLocation);
              setState((prev) => ({
                ...prev,
                screen: "hospital_recommended",
                recommendedHospital: hospital,
                patientLocation: `${approxLat},${approxLng}`,
                messages: [
                  "✓ Análise Concluída!",
                  "",
                  "Hospital Recomendado:",
                  hospital.name,
                  `(${hospital.district})`,
                  `Distância: ~${hospital.distance}km`,
                  "",
                  "1. Confirmar encaminhamento",
                  "2. Cancelar",
                ],
                currentInput: "",
              }));
            },
            () => {
              // Fallback if geolocation fails
              const hospital = findNearestHospital(state.patientLocation);
              setState((prev) => ({
                ...prev,
                screen: "hospital_recommended",
                recommendedHospital: hospital,
                messages: [
                  "✓ Análise Concluída!",
                  "",
                  "Hospital Recomendado:",
                  hospital.name,
                  `(${hospital.district})`,
                  `Distância: ~${hospital.distance}km`,
                  "",
                  "1. Confirmar encaminhamento",
                  "2. Cancelar",
                ],
                currentInput: "",
              }));
            }
          );
        } else {
          const hospital = findNearestHospital(state.patientLocation);
          setState((prev) => ({
            ...prev,
            screen: "hospital_recommended",
            recommendedHospital: hospital,
            messages: [
              "✓ Análise Concluída!",
              "",
              "Hospital Recomendado:",
              hospital.name,
              `(${hospital.district})`,
              `Distância: ~${hospital.distance}km`,
              "",
              "1. Confirmar encaminhamento",
              "2. Cancelar",
            ],
            currentInput: "",
          }));
        }
      }, 1500);
    }
  };

  const handleMenuSelection = (digit: string) => {
    // Ignore special characters for menu navigation
    if (digit === "*" || digit === "#") {
      return;
    }

    if (state.screen === "main") {
      if (digit === "1") {
        setState((prev) => ({
          ...prev,
          screen: "consult_location",
          selectedService: "consulta",
          messages: [
            "Marcação de Consulta",
            "",
            "Selecione o Hospital:",
            "1. Hospital Central",
            "2. Hospital Jose Macamo",
            "3. Hospital de Mavalane",
            
          ],
          currentInput: "",
        }));
      } else if (digit === "2") {
        // New triaging flow - START WITH NAME
        setState((prev) => ({
          ...prev,
          screen: "triaging_name",
          selectedService: "triagem",
          messages: [
            "TRIAGEM COM IA",
            "",
            "Introduza o seu nome:",
            "(Pressione Enter para enviar)",
          ],
          currentInput: "",
          inputBuffer: "",
        }));
      }
    } else if (state.screen === "consult_location") {
      const locations: Record<string, string> = {
        "1": "Hospital Central",
        "2": "Hospital Jose Macamo",
        "3": "Hospital de Mavalane",
     
      };

      if (locations[digit]) {
        setState((prev) => ({
          ...prev,
          selectedLocation: locations[digit],
          screen: "confirmation",
          messages: [
            "Confirme os dados:",
            `Serviço: Consulta`,
            `Local: ${locations[digit]}`,
            "",
            "1. Confirmar",
            "2. Cancelar",
          ],
          currentInput: "",
        }));
      }
    } else if (state.screen === "triaging_symptoms") {
      const symptoms: Record<string, string> = {
        "1": "Dor de Cabeça",
        "2": "Dor Torácica",
        "3": "Febre",
        "4": "Dificuldade Respiratória",
        "5": "Outro",
      };

      if (symptoms[digit]) {
        if (digit === "5") {
          // Option to describe custom symptoms
          setState((prev) => ({
            ...prev,
            patientSymptoms: "Outro sintoma",
            screen: "triaging_description",
            messages: [
              "Descreva o sintoma:",
              "(Pressione Enter para enviar)",
            ],
            inputBuffer: "",
            currentInput: "",
          }));
        } else {
          // Direct symptom selection
          setState((prev) => ({
            ...prev,
            patientSymptoms: symptoms[digit],
            screen: "ai_analyzing",
            messages: [
              "Analisando dados...",
              "Consultando base de hospitais...",
              "",
              "⏳ Processando triagem...",
            ],
            inputBuffer: "",
            currentInput: "",
          }));

          // Simulate AI analysis
          setTimeout(() => {
            const hospital = findNearestHospital(state.patientLocation);
            setState((prev) => ({
              ...prev,
              screen: "hospital_recommended",
              recommendedHospital: hospital,
              messages: [
                "✓ Análise Concluída!",
                "",
                "Hospital Recomendado:",
                hospital.name,
                `(${hospital.district})`,
                `Distância: ~${hospital.distance}km`,
                "",
                "1. Confirmar encaminhamento",
                "2. Cancelar",
              ],
              currentInput: "",
            }));
          }, 1500);
        }
      }
    } else if (state.screen === "hospital_recommended") {
      if (digit === "1") {
        const ticketNum = Math.floor(Math.random() * 9000) + 1000;
        setState((prev) => ({
          ...prev,
          screen: "ticket",
          ticketNumber: ticketNum.toString(),
          messages: [
            "✓ TRIAGEM CONFIRMADA!",
            "",
            `Número de Fila: ${ticketNum}`,
            `Hospital: ${prev.recommendedHospital.name}`,
            `Paciente: ${prev.patientName}`,
            `Telefone: ${prev.patientPhone}`,
            "",
            "Receberá SMS com",
            "atualizações de fila.",
            "",
            "Pressione 0 para sair",
          ],
          currentInput: "",
        }));
      } else if (digit === "2") {
        handleHangup();
      }
    } else if (state.screen === "confirmation") {
      if (digit === "1") {
        const ticketNum = Math.floor(Math.random() * 9000) + 1000;
        setState((prev) => ({
          ...prev,
          screen: "ticket",
          ticketNumber: ticketNum.toString(),
          messages: [
            "✓ Marcação Confirmada!",
            "",
            `Número de Fila: ${ticketNum}`,
            `Local: ${prev.selectedLocation}`,
            "",
            "Receberá SMS com",
            "atualizações de fila.",
            "",
            "Pressione 0 para sair",
          ],
          currentInput: "",
        }));
      } else if (digit === "2") {
        handleHangup();
      }
    } else if (state.screen === "ticket") {
      if (digit === "0") {
        handleHangup();
      }
    }
  };

  const handleHangup = () => {
    setState({
      screen: "idle",
      currentInput: "",
      selectedService: "",
      selectedLocation: "",
      patientName: "",
      patientLocation: "",
      patientPhone: "",
      patientSymptoms: "",
      ticketNumber: "",
      messages: [],
      inputBuffer: "",
      recommendedHospital: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* @ts-ignore */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* @ts-ignore */}
        <MotionDiv
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          onClick={(e: any) => e.stopPropagation()}
          className="relative w-full h-full"
        >
          {/* Phone Screen - Fullscreen */}
          <div className="w-full h-screen bg-black rounded-none shadow-2xl overflow-hidden flex flex-col">
            {/* Phone Notch */}
            <div className="bg-black h-8 flex items-center justify-between px-8 text-white text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Screen Content - Fullscreen */}
            <div className="bg-black text-green-400 font-mono p-6 flex-1 flex flex-col justify-between overflow-hidden">
              {/* Messages Area */}
              <div className="space-y-1 text-sm overflow-y-auto max-h-64 pb-2">
                {state.messages.map((msg, idx) => (
                  
                  <MotionDiv
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={msg.includes("✓") ? "text-green-300 font-bold" : ""}
                  >
                    {msg}
                  </MotionDiv>
                ))}
                
                {/* Show input buffer for text input screens */}
                {(state.screen === "triaging_name" || state.screen === "triaging_location" || state.screen === "triaging_phone" || state.screen === "triaging_description") && (
                  
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-green-300 font-semibold"
                  >
                    &gt; {state.inputBuffer}
                    <span className="animate-pulse">_</span>
                  </MotionDiv>
                )}
                
                {state.screen === "idle" && (
                  
                  <MotionDiv
                    animate={{ opacity: [0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-green-500 text-sm mt-4"
                  >
                    Pressione qualquer número...
                  </MotionDiv>
                )}
              </div>

              {/* Current Input Display */}
              {state.currentInput && state.screen !== "triaging_name" && state.screen !== "triaging_location" && state.screen !== "triaging_phone" && state.screen !== "triaging_description" && (
                
                <MotionDiv
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center text-lg font-bold text-green-300 py-2"
                >
                  {state.currentInput}
                </MotionDiv>
              )}
            </div>

            {/* Keyboard - Conditional (Numeric or QWERTY) */}
            <div className="bg-gray-800 p-4 space-y-2 flex-1 overflow-y-auto">
              {/* QWERTY Keyboard for text input */}
              {(state.screen === "triaging_name" || state.screen === "triaging_location" || state.screen === "triaging_phone" || state.screen === "triaging_description") && (
                <>
                  {/* QWERTY Rows */}
                  {KEYBOARD_ROWS.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex gap-1 justify-center">
                      {row.map((char) => (
                        
                        <MotionButton
                          key={char}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCharacter(char)}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded text-xs transition"
                        >
                          {char.toUpperCase()}
                        </MotionButton>
                      ))}
                    </div>
                  ))}

                  {/* Space and Special Buttons */}
                  <div className="flex gap-1 justify-center">
                    {/* @ts-ignore */}
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackspace}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-xs flex-1 transition"
                    >
                      ← DEL
                    </MotionButton>
                    {/* @ts-ignore */}
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCharacter(" ")}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded text-xs flex-1 transition"
                    >
                      ESPAÇO
                    </MotionButton>
                    {/* @ts-ignore */}
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubmitText(state.inputBuffer)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-xs flex-1 transition"
                    >
                      OK ✓
                    </MotionButton>
                  </div>
                </>
              )}

              {/* Numeric Keypad - for menu navigation */}
              {state.screen !== "triaging_name" && state.screen !== "triaging_location" && state.screen !== "triaging_phone" && state.screen !== "triaging_description" && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      
                      <MotionButton
                        key={num}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDigit(num.toString())}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition"
                      >
                        {num}
                      </MotionButton>
                    ))}
                  </div>

                  {/* Bottom Row with *, 0, # */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* @ts-ignore */}
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDigit("*")}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition text-xl"
                    >
                      *
                    </MotionButton>

                    {/* @ts-ignore */}
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDigit("0")}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition"
                    >
                      0
                    </MotionButton>

                    {/* @ts-ignore */}
                    <MotionButton
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDigit("#")}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition text-xl"
                    >
                      #
                    </MotionButton>
                  </div>
                </>
              )}

              {/* Call and Hangup Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {/* Green Call Button */}
                {/* @ts-ignore */}
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (state.screen === "idle") {
                      handleDigit("1");
                    }
                  }}
                  className={`font-bold py-3 rounded flex items-center justify-center transition ${
                    state.screen !== "idle"
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  <Phone size={20} />
                </MotionButton>

                {/* Red Hangup Button */}
                {/* @ts-ignore */}
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHangup}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded flex items-center justify-center transition"
                >
                  <PhoneOff size={20} />
                </MotionButton>
              </div>
            </div>
          </div>

          {/* Close Button - Top Right Corner */}
          {/* @ts-ignore */}
          <MotionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg z-50"
        >
          <X size={28} />
        </MotionButton>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  );
};

export default USSDSimulator;
