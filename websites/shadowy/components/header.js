import Head from "next/head";

export default function Header(props) {
    return (
        <Head>
            <meta charSet="UTF-8" key="charset" />
            <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />

            <title>Shadowy | {props.pageName}</title>

            <meta name="description" content="Create an Account and be the fastest Player through the level"></meta>

            <meta name="apple-mobile-web-app-title" content="Shadowy" key="apple-title" />

            <meta name="robots" content="index, follow" />

            <meta property="og:title" content="Shadowy" />
            <meta property="og:site_name" content="Shadowy" />
            <meta property="og:description" content="Create an Account and be the fastest Player through the level" />
            <meta property="og:image" content="/logo_nobg.png" />
            <meta property="og:url" content="https://shadowy.vercel.app/" />
            <meta property="og:type" content="website" />

            <meta name="twitter:title" content="Shadowy" />
            <meta name="twitter:description" content="Create an Account and be the fastest Player through the level" />
            <meta name="twitter:image" content="/logo_nobg.png" />
            <meta name="twitter:site" content="@Slowlydev1" />
            <meta name="twitter:creator" content="@Slowlydev1" />

            <meta name="theme-color" content="#027fff" key="theme-color" />
            <meta name="apple-mobile-web-app-capable" content="yes" key="apple-web-app-capable" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" key="apple-status-bar" />

            <link rel="shortcut icon" type="image/x-icon" href="/logo_nobg.png" key="shurtcut-icon" />
            <link rel="apple-touch-icon" href="/logo.png" key="apple-touch-icon" />

            <link rel="canonical" href="https://shadowy.vercel.app"></link>

            <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
    )
}