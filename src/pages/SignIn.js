import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import firebase from "../firebase";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const authMessages = {
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Please choose a stronger password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
};

const validators = {
  name: (v) => (v.trim().length < 2 ? "Please enter your full name." : ""),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email address."),
  password: (v) =>
    v.length < 8 || !/[A-Z]/.test(v) || !/[a-z]/.test(v) || !/\d/.test(v)
      ? "Use 8+ characters with upper-case, lower-case and a number."
      : "",
  phone: (v) => (/^(010|011|012|015)\d{8}$/.test(v) ? "" : "Enter an 11-digit Egyptian mobile number."),
};

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input className={`input ${error ? "!border-red-400 !ring-red-100" : ""}`} aria-invalid={!!error} {...props} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export default function SignIn() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useToast();
  const redirectTo = location.state?.from || "/";

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to={redirectTo} replace />;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const isSignup = mode === "signup";

  const validate = () => {
    const next = {};
    if (isSignup) {
      next.name = validators.name(form.name);
      next.phone = validators.phone(form.phone);
      next.password = validators.password(form.password);
      next.confirm = form.confirm !== form.password ? "Passwords don't match." : "";
    }
    next.email = validators.email(form.email);
    setErrors(next);
    return Object.values(next).every((m) => !m);
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setBusy(true);
    try {
      const auth = firebase.auth();
      if (isSignup) {
        const { user: created } = await auth.createUserWithEmailAndPassword(form.email.trim(), form.password);
        await created.updateProfile({ displayName: form.name.trim() });
        // Never store the password; only profile details.
        await firebase.firestore().collection("users").doc(created.uid).set({
          UserName: form.name.trim(),
          UserEmail: form.email.trim(),
          UserPhone: form.phone,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        created.sendEmailVerification().catch(() => {});
        notify("Welcome to BeeBuy!");
      } else {
        await auth.signInWithEmailAndPassword(form.email.trim(), form.password);
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(authMessages[err.code] || "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setErrors({});
    setFormError("");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 text-center">
          <img src={logo} alt="" className="mx-auto h-14 w-auto" />
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isSignup ? "Join BeeBuy and start shopping." : "Sign in to continue shopping."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold" role="tablist">
          {[["login", "Sign in"], ["signup", "Sign up"]].map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={mode === key}
              onClick={() => switchMode(key)}
              className={`rounded-lg py-2 transition ${mode === key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4" noValidate>
          {isSignup && <Field label="Full name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />}
          <Field label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
          {isSignup && <Field label="Phone" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" placeholder="01XXXXXXXXX" />}
          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
          {isSignup && <Field label="Confirm password" type="password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} autoComplete="new-password" />}

          {formError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{formError}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
