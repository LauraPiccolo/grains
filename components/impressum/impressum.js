const Impressum = ({ content }) => {

  const closeImpressum = () => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: document.querySelector('.container > footer').offsetTop - window.innerHeight + document.querySelector('.container > footer').clientHeight,
    });
    setTimeout(() => { document.querySelector('.impressum').style.display = 'none'; }, 500);
  }

  // let impressumText = Storyblok.richTextResolver.render(content.impressum)

  return (
      <section className="impressum">
          <button className="impressum__close" onClick={closeImpressum}>Close</button>
          <p>
            {/* {impressumText} */}
          Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:
          <br/><br/>
          Lisa Merk & Mark von Wardenburg<br/>
          Sanderstr. 29-30<br/>
          12047 Berlin, Germany<br/>
          <br/><br/><br/>
          studio@merkundmark.com<br/>
          +49 (0)30 89 56 69 41<br/>
          +49 (0)178 188 95 38<br/><br/>
          @merkundmark_fotografie<br/>

          Erfassung allgemeiner Informationen

          Wenn Sie auf unsere Webseite zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet Service Providers und Ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen. Diese Informationen sind technisch notwendig, um von Ihnen angeforderte Inhalte von Webseiten korrekt auszuliefern und fallen bei Nutzung des Internets zwingend an. Anonyme Informationen dieser Art werden von uns statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.

          SSL-Verschlüsselung

          Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (z. B. SSL) über HTTPS.

          Kontakt

          Treten Sie per E-Mail mit uns in Kontakt, werden die von Ihnen gemachten Angaben zum Zwecke der Bearbeitung der Anfrage sowie für mögliche Anschlussfragen gespeichert.

          Einbindung von Diensten und Inhalten Dritter

          Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von Drittanbietern ein, um deren Inhalte und Services, wie z.B. Videos oder Schriftarten einzubinden (nachfolgend einheitlich bezeichnet als “Inhalte”).

          Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte verwenden. Drittanbieter können ferner so genannte Pixel-Tags (unsichtbare Grafiken, auch als „Web Beacons“ bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die „Pixel-Tags“ können Informationen, wie der Besucherverkehr auf den Seiten dieser Website ausgewertet werden. Die pseudonymen Informationen können ferner in Cookies auf dem Gerät der Nutzer gespeichert werden und unter anderem technische Informationen zum Browser und Betriebssystem, verweisende Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes enthalten, als auch mit solchen Informationen aus anderen Quellen verbunden werden.

          Wir binden die JavaScript-Bibliothek jQuery der Plattform “jQuery” des Anbieters The jQuery Foundation, 1 Letterman Drive, Suite D4700, San Francisco, CA 94129 ein. Kontakt-Adresse für Anfragen zu Datenschutzthemen: legal@js.foundation.

          Löschung bzw. Sperrung der Daten

          Wir halten uns an die Grundsätze der Datenvermeidung und Datensparsamkeit. Wir speichern Ihre personenbezogenen Daten daher nur so lange, wie dies zur Erreichung der hier genannten Zwecke erforderlich ist oder wie es die vom Gesetzgeber vorgesehenen vielfältigen Speicherfristen vorsehen. Nach Fortfall des jeweiligen Zweckes bzw. Ablauf dieser Fristen werden die entsprechenden Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.

          Ihre Rechte auf Auskunft, Berichtigung, Sperre, Löschung und Widerspruch

          Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten. Ebenso haben Sie das Recht auf Berichtigung, Sperrung oder, abgesehen von der vorgeschriebenen Datenspeicherung zur Geschäftsabwicklung, Löschung Ihrer personenbezogenen Daten. Bitte wenden Sie sich dazu an unseren Datenschutzbeauftragten. Die Kontaktdaten finden Sie ganz unten.

          Damit eine Sperre von Daten jederzeit berücksichtigt werden kann, müssen diese Daten zu Kontrollzwecken in einer Sperrdatei vorgehalten werden. Sie können auch die Löschung der Daten verlangen, soweit keine gesetzliche Archivierungsverpflichtung besteht. Soweit eine solche Verpflichtung besteht, sperren wir Ihre Daten auf Wunsch.
          Sie können Änderungen oder den Widerruf einer Einwilligung durch entsprechende Mitteilung an uns mit Wirkung für die Zukunft vornehmen.

          Änderung unserer Datenschutzbestimmungen

          Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.

          Fragen an die Datenschutzbeauftragte

          Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an unseren Datenschutzbeauftragten: studio@merkundmark.com

          Website: Enno Pötschke
          Text: Max Mustermann
          Development: Nikolai Sivertsen
          Consultant: Daniel Burchhard
          </p>
      </section>
  )
}

export default Impressum
