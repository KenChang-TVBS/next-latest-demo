import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="cars">
        <ul className="flex">
          <li className="px-5 ">
            <Link href="/car/2024-toyota-corolla-altis">
              2024-toyota-corolla-altis
            </Link>
          </li>
          <li className="px-5">
            <Link href="/car/2024-koda-scala">2024-koda-scala</Link>
          </li>
          <li className="px-5">
            <Link href="/car/2024-lexus-nx">2024-lexus-nx</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
