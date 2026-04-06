import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Fixed navbar — sits above all page content */}
      <Navbar />

      {/*
        pt-[96px] pushes content below the fixed navbar.
        Topbar ~28px + Navbar ~68px = 96px total.
        The homepage hero uses -mt-[96px] to cancel this and bleed full-screen.
      */}
      <main className="flex-1 pt-[96px]">
        {children}
      </main>

      <Footer />

    </div>
  );
}