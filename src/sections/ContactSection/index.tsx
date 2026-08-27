import { MapPin } from "lucide-react";
import { ContactCard } from "@/sections/ContactSection/components/ContactCard";
import { ContactForm } from "@/sections/ContactSection/components/ContactForm";

const icon = (name: string) =>
  `https://dummyimage.com/96x96/f5f5f5/111827&text=${encodeURIComponent(name)}`;

export const ContactSection = () => {
  return (
    <section id="contact" className="site-section border-t border-neutral-100">
      <div className="section-inner">
        <div className="mb-12 text-center">
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Contact Me
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard
              href="mailto:melakuzenebu3@gmail.com"
              iconSrc={icon("MAIL")}
              title="Email"
              value="melakuzenebu3@gmail.com"
            />
            <ContactCard
              href="https://github.com/zenebumelaku"
              iconSrc={icon("GH")}
              title="GitHub"
              value="zenebumelaku"
            />
            <ContactCard
              href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
              iconSrc={icon("IN")}
              title="LinkedIn"
              value="Zenebu Melaku"
            />
            <ContactCard
              href="tel:0945712016"
              iconSrc={icon("TEL")}
              title="Phone"
              value="0945712016"
            />
            <ContactCard
              href="https://t.me/teninen"
              iconSrc={icon("TG")}
              title="Telegram"
              value="@teninen"
            />
            <ContactCard
              href="https://leetcode.com/zeni_mel"
              iconSrc={icon("LC")}
              title="LeetCode"
              value="zeni_mel"
            />
            <ContactCard
              href="https://t.me/zenicore"
              iconSrc={icon("X")}
              title="Telegram channel"
              value="@zenicore"
            />
            <div className="flex items-center gap-4 rounded-xl border-2 border-black bg-neutral-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-700">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Location
                </p>
                <p className="text-sm font-semibold">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};
