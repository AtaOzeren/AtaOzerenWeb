import { APP_CONFIG } from "~/constants";

const generateSitemap = () => {
    const routes = [
        "",
        "/about",
        "/contact",
        "/projects",
    ];

    const currentDate = new Date().toISOString().split("T")[0];
    const baseUrl = APP_CONFIG.siteUrl;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
            .map((route) => {
                return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`;
            })
            .join("")}
</urlset>`;

    return xml.trim();
};

export function GET() {
    const sitemap = generateSitemap();

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
