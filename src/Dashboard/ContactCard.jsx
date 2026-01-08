export default function ContactCard({ contact, onEdit, onDelete, onView }) {
  return (
    <div
      onClick={() => onView(contact)}
      className="bg-[#151a25] rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-700/30 text-purple-400 flex items-center justify-center font-semibold">
          {contact.name.slice(0, 2).toUpperCase()}
        </div>

        <div>
          <h3 className="text-white text-2xl font-semibold leading-tight">
            {contact.name}
          </h3>
          <p className="text-purple-400 text-sm mt-0.5">
            Contact
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-gray-400 text-sm mt-6">
        <div className="flex items-center gap-2">
          <span>📞</span>
          <span>{contact.phone}</span>
        </div>

        {contact.email && (
          <div className="flex items-center gap-2">
            <span>✉️</span>
            <span className="truncate">{contact.email}</span>
          </div>
        )}
      </div>

      <div
        onClick={e => e.stopPropagation()}
        className="flex gap-3 mt-6"
      >
        <button
          onClick={() => onEdit(contact)}
          className="flex-1 py-2 rounded-lg bg-[#1f2937] text-sm text-gray-300 hover:bg-[#2b3647] transition"
        >
           Edit
        </button>

        <button
          onClick={() => onDelete(contact._id)}
          className="flex-1 py-2 rounded-lg bg-[#2a1f23] text-sm text-red-400 hover:bg-[#3a2428] transition"
        >
           Delete
        </button>
      </div>
    </div>
  )
}
