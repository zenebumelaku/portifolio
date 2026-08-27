import { useState, type FormEvent } from "react";

export const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio message from ${data.get("name") ?? "visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name") ?? ""}\nEmail: ${data.get("email") ?? ""}\n\n${data.get("message") ?? ""}`,
    );
    window.location.href = `mailto:melakuzenebu3@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input
            name="name"
            required
            placeholder="John Doe"
            className="rounded-lg border border-neutral-200 px-4 py-3 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-950"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="rounded-lg border border-neutral-200 px-4 py-3 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Message
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project..."
            className="resize-y rounded-lg border border-neutral-200 px-4 py-3 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Send Message
        </button>

        {sent && (
          <p className="text-sm text-neutral-500">
            Your email client should open now. If it didn&apos;t, email
            melakuzenebu3@gmail.com directly.
          </p>
        )}
      </div>
    </form>
  );
};
