"use client";
import { useState } from "react";
import Container from "../components/Container";

export default function ContactPage() {
  // Form states
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState({ rating: "", comments: "" });
  const [contactSent, setContactSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Simple email regex for validation
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    let errs: { [key: string]: string } = {};
    if (!contact.name.trim()) errs.name = "Nome é obrigatório";
    if (!contact.email.trim()) errs.email = "Email é obrigatório";
    else if (!validateEmail(contact.email)) errs.email = "Email inválido";
    if (!contact.message.trim()) errs.message = "Mensagem é obrigatória";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const json = await res.json();

      if (res.ok) {
        setContactSent(true);
        setContact({ name: "", email: "", message: "" });
      } else {
        setErrors({ form: json.error || "Falha ao enviar mensagem" });
      }
    } catch (err) {
      setErrors({ form: "Falha ao enviar mensagem" });
    }
  }

  function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    let errs: { [key: string]: string } = {};
    if (!feedback.rating) errs.rating = "Por favor selecione uma avaliação";
    if (!feedback.comments.trim()) errs.comments = "Comentários são obrigatórios";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFeedbackSent(true);
    setFeedback({ rating: "", comments: "" });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 w-full">
      <Container>
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">
          Entre em Contacto
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Temos prazer em ouvir sugestões e comentários sobre o ViaVerde
        </p>

        <section className="grid md:grid-cols-2 gap-12">
        {/* Contact Details & Form */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-green-700">
              Informações de Contacto
            </h2>
            <p className="text-gray-700">
              Contacte-nos através do formulário ou utilize os dados abaixo para nos alcançar.
            </p>
          </div>

          <div className="space-y-3 text-gray-700 bg-green-50 p-6 rounded-lg border border-green-200">
            <p>
              <strong>Localização:</strong> Ministério da Saúde, Maputo, Moçambique
            </p>
            <p>
              <strong>Telemóvel:</strong> +258 21 314 500
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@viaverde.gov.mz"
                className="text-green-600 underline font-medium"
              >
                info@viaverde.gov.mz
              </a>
            </p>
            <p>
              <strong>Horário:</strong> Seg-Sex, 07:00 - 19:00
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            noValidate
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6"
          >
            <h3 className="text-xl font-semibold text-green-700">
              Enviar Mensagem
            </h3>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="Seu nome"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                placeholder="Escreva sua mensagem..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              Enviar Mensagem
            </button>
            {errors.form && (
              <p className="text-red-600 text-center mt-2">{errors.form}</p>
            )}
            {contactSent && (
              <p className="text-green-600 text-center mt-2 font-medium">
                Mensagem enviada com sucesso!
              </p>
            )}
          </form>
        </div>

        {/* Feedback Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-2xl font-semibold text-green-700 text-center">
            Avaliação
          </h2>
          <p className="text-gray-700 text-center">
            Ajude-nos a melhorar! Por favor avalie sua experiência com o ViaVerde.
          </p>

          <form onSubmit={handleFeedbackSubmit} noValidate>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Qual é sua avaliação geral?
              </label>
              <div className="flex space-x-4 justify-center">
                {[1, 2, 3, 4, 5].map((ratingValue) => (
                  <label
                    key={ratingValue}
                    className="flex items-center cursor-pointer hover:scale-110 transition"
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      checked={Number(feedback.rating) === ratingValue}
                      onChange={(e) =>
                        setFeedback({ ...feedback, rating: e.target.value })
                      }
                      className="hidden"
                    />
                    <span
                      className={`text-4xl ${
                        Number(feedback.rating) >= ratingValue
                          ? "text-green-500"
                          : "text-gray-300"
                      } hover:text-green-400 transition`}
                    >
                      ★
                    </span>
                  </label>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-2 text-red-600 text-sm text-center">
                  {errors.rating}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Comentários
              </label>
              <textarea
                id="comments"
                value={feedback.comments}
                onChange={(e) =>
                  setFeedback({ ...feedback, comments: e.target.value })
                }
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition ${
                  errors.comments ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Compartilhe seus comentários..."
              />
              {errors.comments && (
                <p className="mt-1 text-red-600 text-sm">{errors.comments}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              Enviar Avaliação
            </button>
            {feedbackSent && (
              <p className="text-green-600 text-center mt-2 font-medium">
                Obrigado pela sua avaliação!
              </p>
            )}
          </form>
        </div>
      </section>
      </Container>
    </main>
  );
}
