import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import firebase from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import RequireAuth from "../layout/RequireAuth";
import { PageHeader, Spinner } from "../ui";

function ProfileContent() {
  const { user } = useAuth();
  const notify = useToast();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(
    () =>
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .onSnapshot((snap) => setProfile(snap.data() || {})),
    [user.uid]
  );

  if (!profile) return <Spinner />;

  const startEdit = () => {
    setForm({ name: profile.UserName || "", phone: profile.UserPhone || "" });
    setEditing(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ UserName: form.name.trim(), UserPhone: form.phone.trim() }, { merge: true });
      notify("Profile updated.");
      setEditing(false);
    } catch (err) {
      notify("Couldn't save your changes.", { type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const resetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(user.email);
      notify(`Password reset email sent to ${user.email}.`);
    } catch (err) {
      notify("Couldn't send the reset email.", { type: "error" });
    }
  };

  const initial = (profile.UserName || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <PageHeader title="My profile" />
      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-400 text-3xl font-extrabold text-slate-900">
            {initial}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{profile.UserName || "BeeBuy customer"}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={save} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Phone</span>
              <input className="input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setEditing(false)} className="btn-ghost flex-1">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? "Saving..." : "Save changes"}</button>
            </div>
          </form>
        ) : (
          <>
            <dl className="mt-8 divide-y divide-slate-100 text-sm">
              {[
                [FaUser, "Name", profile.UserName],
                [FaPhone, "Phone", profile.UserPhone],
                [FaEnvelope, "Email", user.email],
              ].map(([Icon, label, value]) => (
                <div key={label} className="flex items-center gap-4 py-4">
                  <Icon className="text-brand-500" />
                  <dt className="w-16 text-slate-500">{label}</dt>
                  <dd className="font-medium text-slate-900">{value || "—"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={startEdit} className="btn-primary">Edit profile</button>
              <button onClick={resetPassword} className="btn-ghost">Reset password</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <RequireAuth message="Sign in to manage your profile.">
      <ProfileContent />
    </RequireAuth>
  );
}
