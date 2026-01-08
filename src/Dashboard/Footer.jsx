export default function Footer() {
  return (
    <footer className="w-full py-6 flex items-center justify-center bg-[#0b1020] border-t border-white/5">
      <span className="flex items-center gap-2 text-sm text-gray-400">
        Made with
        <a
          href="https://portfolio-2-0-three-indol.vercel.app/"
          target="_blank"
          className="text-purple-500 inline-block transition-transform duration-300 hover:scale-125"
        >
          ❤️ 
        </a>
        by 
        <span className="text-purple-400 font-medium hover:text-purple-300 transition">
          Aryan Bansal
        </span>
        <span className="mx-2 text-gray-600">|</span>
        UI Design by
        <span className="text-purple-400 font-medium hover:text-purple-300 transition">
          Google Stitch
        </span>
      </span>
    </footer>
  )
}
