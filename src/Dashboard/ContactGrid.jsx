import { useEffect, useState } from "react"
import ContactCard from "./ContactCard"

export default function ContactGrid() {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("recent")
    const [open, setOpen] = useState(false)
    const [view, setView] = useState(null)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/contacts`)
            .then(res => res.json())
            .then(data => setContacts(data))
    }, [])

    const submitHandler = async e => {
        e.preventDefault()

        const url = editingId
            ? `${import.meta.env.VITE_API_URL}/api/contacts/${editingId}`
            : `${import.meta.env.VITE_API_URL}/api/contacts`

        const method = editingId ? "PUT" : "POST"

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if (editingId) {
            setContacts(prev =>
                prev.map(c => (c._id === data._id ? data : c))
            )
        } else {
            setContacts(prev => [data, ...prev])
        }

        setForm({ name: "", email: "", phone: "", message: "" })
        setEditingId(null)
        setOpen(false)
    }

    const editHandler = contact => {
        setForm(contact)
        setEditingId(contact._id)
        setOpen(true)
    }

    const deleteHandler = async id => {
        const ok = window.confirm("Are you sure you want to delete this contact?")
        if (!ok) return

        await fetch(
            `${import.meta.env.VITE_API_URL}/api/contacts/${id}`,
            { method: "DELETE" }
        )

        setContacts(prev => prev.filter(c => c._id !== id))
    }

    const filtered = contacts
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "az") return a.name.localeCompare(b.name)
            if (sort === "za") return b.name.localeCompare(a.name)
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

    return (
        <div className="min-h-screen w-full bg-[#0b0f17] px-10 py-10">
            <div className="flex items-center justify-between mb-10">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search contacts..."
                    className="w-full max-w-xl bg-[#141b2d] text-white px-6 py-3 rounded-full outline-none"
                />

                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="ml-6 px-5 py-3 bg-[#141b2d] rounded-xl text-gray-300"
                >
                    <option value="recent">Sort by: Recent</option>
                    <option value="az">Sort by: A to Z</option>
                    <option value="za">Sort by: Z to A</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map(c => (
                    <ContactCard
                        key={c._id}
                        contact={c}
                        onEdit={editHandler}
                        onDelete={deleteHandler}
                        onView={setView}
                    />
                ))}

                <div
                    onClick={() => {
                        setOpen(true)
                        setEditingId(null)
                        setForm({ name: "", email: "", phone: "", message: "" })
                    }}
                    className="rounded-3xl border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-400 transition cursor-pointer"
                >
                    <div className="w-14 h-14 rounded-full bg-[#1f2937] flex items-center justify-center text-2xl mb-3">
                        +
                    </div>
                    <p className="font-medium">Add New Contact</p>
                    <p className="text-sm text-gray-500 mt-1 text-center px-6">
                        Click here to create a new entry in your list.
                    </p>
                </div>
            </div>

            {view && (
                <div
                    onClick={() => setView(null)}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className="bg-[#141b2d] rounded-3xl p-8 w-full max-w-lg flex flex-col gap-6 relative"
                    >
                        <button
                            onClick={() => setView(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl"
                        >
                            ×
                        </button>

                        <div className="w-24 h-24 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-3xl font-semibold shadow-lg">
                            {view.name[0]}
                        </div>

                        <div className="text-center">
                            <h2 className="text-white text-2xl font-semibold">
                                {view.name}
                            </h2>

                            <p className="mt-2 text-purple-400">
                                {view.email || "No email provided"}
                            </p>

                            <p className="mt-1 text-gray-400">
                                {view.phone}
                            </p>
                        </div>

                        {view.message && (
                            <div>
                                <p className="text-gray-400 text-xs tracking-widest mb-2">
                                    NOTES
                                </p>
                                <div className="bg-[#1c2745] rounded-xl p-4 text-gray-300 text-sm leading-relaxed break-words">
                                    {view.message}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setView(null)}
                            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            {open && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                    <div
                        className="bg-[#141b2d] rounded-3xl p-8 w-full max-w-lg flex flex-col gap-6 relative"
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl"
                        >
                            ×
                        </button>

                        <div className="w-24 h-24 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-3xl font-semibold shadow-lg">
                            {form.name ? form.name[0] : "?"}
                        </div>

                        <div className="text-center">
                            <input
                                required
                                placeholder="Name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="bg-transparent text-white text-2xl font-semibold text-center outline-none w-full"
                            />

                            <input
                                placeholder="Email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="mt-2 bg-transparent text-purple-400 text-center outline-none w-full"
                            />

                            <input
                                required
                                placeholder="Phone"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                className="mt-1 bg-transparent text-gray-400 text-center outline-none w-full"
                            />
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs tracking-widest mb-2">
                                NOTES
                            </p>
                            <div className="relative">
                                <textarea
                                    placeholder="Add notes..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-[#1c2745] text-white p-4 rounded-xl resize-none min-h-[120px]"
                                />
                                <span className="absolute bottom-3 right-3 text-gray-400">
                                    ✎
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex-1 bg-[#1f2937] hover:bg-[#2b3647] text-white py-2.5 rounded-xl transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitHandler}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
