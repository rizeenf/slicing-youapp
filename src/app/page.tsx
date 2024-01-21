import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col font-bold items-center justify-between p-24">
      <h2>DASHBOARD</h2>
      <Link href={"/login"}>KE PAGE LOGIN</Link>
    </section>
  );
}
