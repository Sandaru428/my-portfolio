"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import MagicButton from "./MagicButton";
import emailjs from "emailjs-com";

export function ContactForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration");
      alert("Email service is not configured properly.");
      return;
    }

    emailjs.sendForm(
      serviceId,    // e.g. service_xxx
      templateId,   // e.g. template_yyy
      e.currentTarget,      // HTML form element
      publicKey     // e.g. nNQpXlIh_abc123
    )
    .then((result) => {
      console.log("Email sent!", result.text);
      alert("Message sent successfully!");
    })
    .catch((error) => {
      console.error("Error:", error.text);
      alert("Something went wrong.");
    });

    // Optional: reset form
    e.currentTarget.reset();
  };


  return (
    <>
      <h1 id="contactme" className="uppercase text-center text-blue-100 text-[40px] md:text-5xl lg:text-6xl mt-20">Contact Me</h1>
      <p className="mt-2 w-full flex justify-center text-center text-lg text-neutral-600 dark:text-neutral-300 p-2">
          Fill out the form below and we'll get back to you as soon as possible
      </p>

      <div className="shadow-input mx-auto w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-white md:rounded-2xl p-2 sm:p-6 md:p-8 dark:bg-customblack-100 border border-neutral-200 dark:border-white/[0.2] rounded-3xl mt-10 mb-15">

        <form className="mb-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="First Name" type="text" name="firstname" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Last Name" type="text" name="lastname" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="you@gmail.com" type="email" name="email" required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here" name="message" required />
          </LabelInputContainer>

          <div className="flex justify-center mb-4">
            <MagicButton
              title={'Send Message'}
              type='submit'
          />
          </div>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-row justify-center items-center space-x-10 mb-4">
            <button onClick={() => window.open("https://wa.me/+94703185152", "_blank")}>
              <IconBrandWhatsapp className="h-8 w-10 text-neutral-800 dark:text-neutral-300 cursor-pointer hover:scale-150 hover:animate-bounce transition-transform duration-200" />
            </button>
            <button onClick={() => window.open("https://www.linkedin.com/in/sandaruwan-s-w-c-b7141a24b/", "_blank")}>
              <IconBrandLinkedin className="h-8 w-10 text-neutral-800 dark:text-neutral-300 cursor-pointer hover:scale-150 hover:animate-bounce transition-transform duration-200" />
            </button>
            <button onClick={() => window.open("https://t.me/Sandaruwan_SWC", "_blank")}>
              <IconBrandTelegram className="h-8 w-10 text-neutral-800 dark:text-neutral-300 cursor-pointer hover:scale-150 hover:animate-bounce transition-transform duration-200" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
