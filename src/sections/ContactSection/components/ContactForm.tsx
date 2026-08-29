import { useState, type FormEvent } from "react";

export const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString() ?? "visitor";
    const email = data.get("email")?.toString() ?? "";
    const message = data.get("message")?.toString() ?? "";

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

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      setSent(true);
      setError("");
      event.currentTarget.reset();
    } catch {
      setSent(false);
      setError(
        "Something went wrong while sending your message. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm transition-colors dark:bg-neutral-900 dark:shadow-none md:p-8"
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Name
          <input
            name="name"
            required
            placeholder="John Doe"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project..."
            className="resize-y rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-white"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
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
