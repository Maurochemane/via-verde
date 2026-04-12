"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-800 py-6 mt-10">
      <div className="w-full px-4 md:px-8 lg:px-[180px] mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
        
        <p className="text-gray-600">
          © 2026 ViaVerde. Todos os direitos reservados.
        </p>

        <p className="text-gray-600 mt-2 md:mt-0">
          Desenvolvido por{" "}
          <a
            href="https://www.synctechx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 font-semibold"
          >
            SyncTechX
          </a>
        </p>

      </div>
    </footer>
  );
}