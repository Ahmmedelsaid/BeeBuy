import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import firebase from "../firebase";
import { useToast } from "../context/ToastContext";
import { PageHeader } from "../ui";

const empty = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const notify = useToast();
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await firebase
        .firestore()
        .collection("contactMessages")
        .add({ ...form, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      notify("Thanks! We received your message.");
      setForm(empty);
    } catch (err) {
      notify("Couldn't send your message right now. Please try again later.", { type: "error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <PageHeader title="Contact us" subtitle="Questions, feedback or a problem with an order? We're here to help." />
      <form onSubmit={submit} className="card space-y-4 p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
            <input className="input" required value={form.name} onChange={set("name")} autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input className="input" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Subject</span>
          <input className="input" value={form.subject} onChange={set("subject")} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Message</span>
          <textarea className="input min-h-[8rem]" required value={form.message} onChange={set("message")} />
        </label>
        <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
          <FaPaperPlane /> {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
