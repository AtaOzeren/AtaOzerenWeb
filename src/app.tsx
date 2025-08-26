import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { I18nProvider } from "~/contexts/I18nContext";
import Navbar from "~/components/Navbar";
import "./app.css";

export default function App() {
  return (
    <I18nProvider>
      <Router
        root={props => (
          <MetaProvider>
            <Title>Ata Özeren - Personal Website</Title>
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