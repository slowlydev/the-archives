import layoutStyles from "../../styles/layout.module.scss";

export default function Page() {
	return (
		<div className={layoutStyles.main}>
			<h1>Besitzer</h1>
			<p>Joel Scheffmann</p>
			<p>slowly.developers@gmail.com</p>

			<h2>Haftungsausschluss</h2>
			<p>
				Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit
				der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung
				bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden
				ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne
				besondere Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
			</p>

			<h2>Haftungsausschluss für Links</h2>
			<p>
				Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten
				abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.
			</p>

			<h2>Urheberrechte</h2>
			<p>
				Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, gehören Sony oder Unsplash. Für die
				Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.
			</p>
			<p>Quelle: SwissAnwalt</p>
		</div>
	);
}
