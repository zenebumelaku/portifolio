import { useState, type FormEvent } from "react";

export const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") ?? "visitor").toString().trim();
    const email = (data.get("email") ?? "").toString().trim();
    const message = (data.get("message") ?? "").toString().trim();

    if (!name || !email || !message) {
      setSent(false);
      setError("Please complete all fields before sending your message.");
      return;
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/melakuzenebu3@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio message from ${name}`,
            _captcha: "false",
            _template: "table",
          }),
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Message could not be sent.");
      }

      setSent(true);
      setError("");
      form.reset();
    } catch {
      setSent(false);
      setError(
        "The message could not be sent right now. Please email melakuzenebu3@gmail.com directly.",
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-none md:p-8"
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Name
          <input
            name="name"
            required
            placeholder="John Doe"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-300"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-300"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project..."
            className="resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-300"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
        >
          Send Message
        </button>

        {sent && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Your message has been sent successfully. I&apos;ll get back to you
            soon.
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </form>
  );
};
