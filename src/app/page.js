import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/grupos">GRUPOS</Link>
      <Link href="/asignaturas">ASIGNATURAS</Link>
      <Link href="/estudiantes">ESTUDIANTES</Link>
    </div>
  );
}
