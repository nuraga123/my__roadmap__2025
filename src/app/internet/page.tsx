"use client"

import React from "react";

export default function Internet() {
  return (
    <div className=" bg-gray-50 text-gray-800 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl bg-white shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          🌐 How does the Internet work?
        </h1>

        <p className="text-lg leading-relaxed">
          📡 <span className="font-semibold">Фундаментальное объяснение:</span> Интернет — это
          <span className="font-semibold"> глобальная децентрализованная сеть</span> компьютерных сетей,
          соединённых стандартными протоколами передачи данных <code>TCP/IP</code>.
          Чтобы понять, как он работает, разберём всё по уровням — от физической инфраструктуры до приложений.
        </p>

        {/* 1 */}
        <section className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-xl font-semibold text-blue-500">
            {`1. Физическая основа — "железо" интернета`}
          </h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Оптоволоконные кабели — передают данные с помощью света.</li>
            <li>Медные кабели — передают электрические импульсы.</li>
            <li>Спутниковая и радиосвязь — для труднодоступных мест.</li>
            <li>Маршрутизаторы и коммутаторы — направляют трафик.</li>
          </ul>
          <p className="mt-2 italic text-gray-600">
            📌 На этом уровне интернет похож на транспортную систему: кабели — это дороги, а маршрутизаторы — перекрёстки.
          </p>
        </section>

        {/* 2 */}
        <section className="border-l-4 border-green-500 pl-4">
          <h2 className="text-xl font-semibold text-green-500">
            2. Адресация — как устройства находят друг друга
          </h2>
          <p>
            Каждый компьютер имеет <span className="font-semibold">IP-адрес</span> (например, <code>142.250.190.78</code>).
            IPv4 — старый формат, IPv6 — новый, более вместительный.
          </p>
          <p className="mt-1">
            DNS (Domain Name System) переводит доменные имена (google.com) в IP-адреса.
          </p>
        </section>

        {/* 3 */}
        <section className="border-l-4 border-yellow-500 pl-4">
          <h2 className="text-xl font-semibold text-yellow-500">
            {`3. Протоколы — "язык" интернета`}
          </h2>
          <p>
            <code>IP</code> отвечает за адресацию и доставку, а <code>TCP</code> — за
            корректность и порядок передачи пакетов.
          </p>
        </section>

        {/* 4 */}
        <section className="border-l-4 border-purple-500 pl-4">
          <h2 className="text-xl font-semibold text-purple-500">
            4. Пакетная передача данных
          </h2>
          <p>
            Информация разбивается на пакеты (до 1500 байт), которые могут идти разными маршрутами.
            В конце они собираются обратно в файл.
          </p>
          <p className="italic text-gray-600">
            📌 Как отправка книги по страницам в разных конвертах.
          </p>
        </section>

        {/* 5 */}
        <section className="border-l-4 border-pink-500 pl-4">
          <h2 className="text-xl font-semibold text-pink-500">
            5. Маршрутизация — как пакеты находят путь
          </h2>
          <p>
            Пакеты проходят через множество маршрутизаторов. Маршрут меняется динамически при поломке или перегрузке.
          </p>
        </section>

        {/* 6 */}
        <section className="border-l-4 border-indigo-500 pl-4">
          <h2 className="text-xl font-semibold text-indigo-500">
            6. Прикладной уровень
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>HTTP/HTTPS — веб-страницы</li>
            <li>SMTP/IMAP — почта</li>
            <li>FTP/SFTP — файлы</li>
            <li>WebRTC — видеосвязь</li>
          </ul>
        </section>

        {/* 7 */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-500">
            7. Безопасность
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>SSL/TLS — шифрование трафика (HTTPS)</li>
            <li>VPN — защищённый туннель</li>
          </ul>
        </section>

        <p className="mt-6 text-center text-lg font-semibold text-gray-700">
          💡 В итоге: Интернет — это сочетание инфраструктуры, адресации, маршрутизации и протоколов,
          позволяющее компьютерам по всему миру обмениваться данными.
        </p>
      </div>
    </div>
  );
}
