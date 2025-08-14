"use client"

import Link from "next/link";

export default function Navbar({
  show = true,
}: {
  show: boolean;
}) {

  const routers = [
    { path: "/internet", name: "Интернет" },
    { path: "/http-history", name: "История HTTP" },
    { path: "/domain", name: "DNS" },
  ];

  return (
    <>
      {show && <div className={`sticky top-0 h-screen border border-blue-950 bg-gradient-to-br from-blue-50 to-blue-100 p-6  w-[200px]}`}>
        <h1
          className={`
          text-sm font-extrabold text-blue-900 mb-5 cursor-pointer w-[140px] 
          select-none transition-all duration-300 transform 
          hover:text-blue-700 hover:scale-105
          `}
        >
          My Roadmap 🚀
        </h1>


        {show && (<nav>
          <ul className="flex flex-col">
            {routers.map((router) => (
              <li key={router.path} className="mb-2 hover:scale-105 transition transform duration-300 hover:bg-blue-100 text-gray-600">
                <Link
                  href={router.path}
                >
                  {router.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>)}
      </div>}
    </>
  );
}
