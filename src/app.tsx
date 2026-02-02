import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { I18nProvider } from "~/contexts/I18nContext";
import { APP_CONFIG } from "~/constants";
import Navbar from "~/components/Navbar";
import "./app.css";

export default function App() {
  return (
    <I18nProvider>
      <Router
        root={props => (
          <MetaProvider>
            <Title>Ata Özeren - Personal Website</Title>
            <Meta name="description" content={APP_CONFIG.description || "Ata Özeren's personal website containing his portfolio, blog and contact information."} />
            <Meta property="og:type" content="website" />
            <Meta property="og:title" content="Ata Özeren - Personal Website" />
            <Meta property="og:description" content={APP_CONFIG.description} />
            <Meta property="og:url" content={APP_CONFIG.siteUrl} />
            <Meta property="og:image" content={`${APP_CONFIG.siteUrl}/ata-icon.png`} />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:image" content={`${APP_CONFIG.siteUrl}/ata-icon.png`} />
            <Meta name="twitter:title" content={APP_CONFIG.title} />
            <Meta name="twitter:description" content={APP_CONFIG.description} />
            <Navbar />
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </I18nProvider>
  );
}