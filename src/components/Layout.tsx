import type React from "react";
import { Heading } from "@/components/Heading";
import { Navbar } from "@/components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <section className="h-screen w-screen flex flex-col">
      <Heading></Heading>
      <section className="flex-1 flex flex-row">
        <Navbar></Navbar>
        <section className="flex-1 overflow-auto">{children}</section>
      </section>
    </section>
  );
}
