"use client"
import React from "react";
import styles from "./styles.module.scss";

const HttpHistory: React.FC = () => {
  return (
    <div className={`${styles.container}`}>
      <h1 className={styles.title}>История и эволюция HTTP</h1>

      <section>
        <h2 className={styles.subtitle}>Что такое HTTP?</h2>
        <p className={styles.text}>
          HTTP — это протокол прикладного уровня, основанный на TCP/IP, который
          стандартизирует способ общения клиентов и серверов. Он определяет,
          как запрашивается и передается контент через интернет.
        </p>
      </section>

      <section>
        <h2 className={styles.subtitle}>HTTP/0.9 — The One Liner (1991)</h2>
        <p className={styles.text}>
          Первая версия HTTP была очень простой: только метод <code>GET</code>.
          Сервер отправлял HTML и закрывал соединение.
        </p>
        <pre className={styles.pre}>
          GET /index.html
          {"\n"}
          (response body)
          {"\n"}
          (connection closed)
        </pre>
      </section>

      <section>
        <h2 className={styles.subtitle}>HTTP/1.0 — 1996</h2>
        <p className={styles.text}>
          В HTTP/1.0 появились заголовки, новые методы (<code>POST</code>,
          <code>HEAD</code>), статус-коды, поддержка разных форматов данных,
          авторизация и кэширование.
        </p>
        <pre className={styles.pre}>
          GET / HTTP/1.0{"\n"}
          Host: cs.fyi{"\n"}
          User-Agent: Mozilla/5.0{"\n"}
          Accept: */*{"\n"}
        </pre>
        <p className={styles.text}>Ответ сервера:</p>
        <pre className={styles.pre}>
          HTTP/1.0 200 OK{"\n"}
          Content-Type: text/plain{"\n"}
          Content-Length: 137582{"\n"}
          (response body) {"\n"}
        </pre>
      </section>

      <section>
        <h2 className={styles.subtitle}>HTTP/1.1 — 1997</h2>
        <p className={styles.text}>
          Основные улучшения: новые методы (<code>PUT</code>, <code>PATCH</code>),
          обязательный заголовок <code>Host</code>, постоянные соединения,
          поддержка pipelining и chunked transfer для динамического контента.
        </p>
      </section>

      <section>
        <h2 className={styles.subtitle}>SPDY — 2009</h2>
        <p className={styles.text}>
          Эксперимент Google для ускорения интернета: мультиплексирование,
          сжатие, приоритизация, безопасность. Лег в основу HTTP/2.
        </p>
      </section>

      <section>
        <h2 className={styles.subtitle}>HTTP/2 — 2015</h2>
        <p className={styles.text}>
          Основные отличия от HTTP/1.1:
        </p>
        <ul className={styles.list}>
          <li>Бинарный протокол</li>
          <li>Мультиплексирование: несколько запросов в одном соединении</li>
          <li>Сжатие заголовков (HPACK)</li>
          <li>Server Push — сервер отправляет ресурсы заранее</li>
          <li>Приоритизация запросов</li>
          <li>Поддержка TLS (рекомендована)</li>
        </ul>
      </section>
    </div>
  );
};

export default HttpHistory;
