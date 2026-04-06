export default function DatenschutzPage() {
  return (
    <section className="bg-white pb-24 pt-40 lg:pb-32 lg:pt-48">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="mb-3 font-body text-[12px] font-medium uppercase tracking-[3px] text-accent">
          Rechtliches
        </p>
        <h1 className="font-heading text-[36px] text-dark">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-8 font-body text-[15px] leading-relaxed text-text">
          {/* 1 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              1. Verantwortlicher
            </h2>
            <p>
              Obitko Innenausbau
              <br />
              Dawid Obitko
              <br />
              Eichenstraße 45, 55246 Mainz Kostheim
              <br />
              E-Mail:{" "}
              <a href="mailto:info@o-innenausbau.de" className="text-accent hover:underline">
                info@o-innenausbau.de
              </a>
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              2. Hosting &amp; Betrieb der Website
            </h2>
            <p>
              Diese Website wird auf einem eigenen Server bei Hetzner Online GmbH
              (Gunzenhausen, Deutschland) betrieben. Beim Aufruf der Seiten
              erfasst der Server automatisch sogenannte Server-Logfiles (z.&nbsp;B.
              IP-Adresse in gekürzter Form, Datum/Uhrzeit, abgerufene URL,
              Referrer, User-Agent).
            </p>
            <p className="mt-2">
              <strong>Zweck &amp; Rechtsgrundlage:</strong> Technische
              Bereitstellung, Stabilität und Sicherheit der Website (Art.&nbsp;6
              Abs.&nbsp;1 lit.&nbsp;f DSGVO – berechtigtes Interesse).
            </p>
            <p className="mt-2">
              <strong>Speicherdauer:</strong> Logdaten werden in der Regel
              kurzzeitig gespeichert und anschließend gelöscht oder anonymisiert.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              3. Webanalyse (Umami)
            </h2>
            <p>
              Zur statistischen Auswertung der Websitenutzung setzen wir Umami
              ein – eine selbst gehostete, cookielose Analysesoftware. Umami läuft
              auf unserem eigenen Server, es werden keine Daten an Dritte
              übermittelt. Es werden keine Cookies gesetzt und keine
              personenbezogenen Nutzerprofile erstellt. Die Erfassung erfolgt
              vollständig anonymisiert.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f
              DSGVO (berechtigtes Interesse an einer wirtschaftlichen und sicheren
              Website).
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              4. Kontaktaufnahme (Kontaktformular / E-Mail / Telefon)
            </h2>
            <p>
              Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren,
              verarbeiten wir die von Ihnen angegebenen Daten (z.&nbsp;B. Name,
              E-Mail, Telefonnummer, Nachricht) zur Bearbeitung Ihres Anliegens.
            </p>
            <p className="mt-2">
              Die Formulardaten werden direkt auf unserem eigenen Server
              gespeichert und per E-Mail an uns weitergeleitet. Es werden keine
              externen Formular-Dienste verwendet.
            </p>
            <p className="mt-2">
              <strong>Zweck:</strong> Bearbeitung von Anfragen,
              Angebotserstellung, vorvertragliche Kommunikation.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlagen:</strong>
            </p>
            <ul className="mt-1 list-disc pl-6 space-y-1">
              <li>
                Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (vorvertragliche/vertragliche
                Kommunikation)
              </li>
              <li>
                Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO (Einwilligung), wenn Sie
                uns z.&nbsp;B. freiwillig weitere Angaben geben
              </li>
              <li>
                Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an
                effizienter Kommunikation)
              </li>
            </ul>
            <p className="mt-2">
              <strong>Speicherdauer:</strong> Wir löschen Anfragen, sobald sie
              erledigt sind und keine gesetzlichen Aufbewahrungsfristen
              entgegenstehen.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              5. Cookies
            </h2>
            <p>
              Diese Website verwendet keine Marketing- oder Tracking-Cookies. Es
              kommen ausschließlich technisch notwendige Cookies zum Einsatz
              (z.&nbsp;B. für den internen Verwaltungsbereich). Besucher der
              Website werden nicht durch Cookies getrackt.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              6. Google Fonts
            </h2>
            <p>
              Alle auf dieser Website verwendeten Schriftarten werden lokal auf
              unserem eigenen Server gehostet. Es wird keine Verbindung zu
              Servern von Google (fonts.googleapis.com oder fonts.gstatic.com)
              hergestellt.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              7. SSL-/TLS-Verschlüsselung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo; auf
              &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist,
              können die Daten, die Sie an uns übermitteln (z.&nbsp;B. über das
              Kontaktformular), nicht von Dritten mitgelesen werden.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              8. Pflichtangaben &amp; Minderjährige
            </h2>
            <p>
              Die Nutzung unseres Kontaktformulars ist freiwillig. Bitte
              übermitteln Sie keine sensiblen Informationen. Unser Angebot richtet
              sich nicht an Kinder unter 16 Jahren.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              9. Ihre Rechte
            </h2>
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
              betreffenden personenbezogenen Daten:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Auskunft (Art.&nbsp;15 DSGVO)</li>
              <li>Berichtigung (Art.&nbsp;16 DSGVO)</li>
              <li>Löschung (Art.&nbsp;17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art.&nbsp;20 DSGVO)</li>
              <li>
                Widerspruch gegen bestimmte Verarbeitungen (Art.&nbsp;21 DSGVO)
              </li>
              <li>
                Widerruf erteilter Einwilligungen (Art.&nbsp;7 Abs.&nbsp;3 DSGVO)
                mit Wirkung für die Zukunft
              </li>
            </ul>
            <p className="mt-2">
              Zur Ausübung Ihrer Rechte genügt eine Nachricht an{" "}
              <a href="mailto:info@o-innenausbau.de" className="text-accent hover:underline">
                info@o-innenausbau.de
              </a>
              .
            </p>
            <p className="mt-2">
              Außerdem haben Sie das Recht auf Beschwerde bei einer
              Datenschutzaufsichtsbehörde, insbesondere an Ihrem Aufenthaltsort,
              Arbeitsplatz oder am Ort des mutmaßlichen Verstoßes.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              10. Empfänger &amp; Kategorien von Daten
            </h2>
            <p>
              Im Rahmen von Betrieb und Support können Dienstleister
              (Auftragsverarbeiter) Zugriff auf personenbezogene Daten erhalten,
              etwa:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                Hetzner Online GmbH (Hosting, Server-Logfiles)
              </li>
              <li>
                Strato AG (E-Mail-Versand bei Kontaktanfragen)
              </li>
            </ul>
            <p className="mt-2">
              Eine Weitergabe zu Werbezwecken findet nicht statt.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              11. Aufbewahrungsfristen
            </h2>
            <p>
              Wir verarbeiten personenbezogene Daten nur so lange, wie es für die
              genannten Zwecke erforderlich ist. Gesetzliche
              Aufbewahrungsfristen (z.&nbsp;B. Handels-/Steuerrecht) bleiben
              unberührt.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="mb-2 font-heading text-[20px] text-dark">
              12. Aktualisierungen
            </h2>
            <p>
              Wir können diese Datenschutzerklärung bei Bedarf anpassen,
              z.&nbsp;B. wenn Dienste hinzukommen oder sich Rechtslagen ändern.
              Die jeweils aktuelle Version finden Sie auf dieser Seite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
