import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { EmptyState, Spinner } from "../ui";

/** Renders children only for signed-in users; otherwise shows a sign-in prompt. */
export default function RequireAuth({ children, message = "Sign in to see this page." }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (!user) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          icon={FaLock}
          title="You need to sign in"
          text={message}
          action={
            <Link to="/sign-in" state={{ from: location.pathname }} className="btn-primary">
              Sign in
            </Link>
          }
        />
      </div>
    );
  }
  return children;
}
