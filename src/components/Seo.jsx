import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PERSONAL_INFO } from "../data/portfolioData";

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://portfolio-r12.vercel.app';

const routeSeo = {
  "/": {
    title: "Rahul Vishwakarma — Full Stack Developer",
    description: "Rahul Vishwakarma is a fresher Full Stack Developer specializing in React, JavaScript, REST APIs, MERN stack applications, and responsive web development.",
  },
  "/work": {
    title: "Projects — Rahul Vishwakarma",
    description: "Explore Rahul Vishwakarma's deployed web applications, including Todo, Wikipedia Search, and Countries Search REST API projects.",
  },
  "/stack": {
    title: "Tech Stack — Rahul Vishwakarma",
    description: "View Rahul Vishwakarma's frontend, backend, database, REST API, React, JavaScript, and software development skills.",
  },
  "/about": {
    title: "About — Rahul Vishwakarma",
    description: "Learn about Rahul Vishwakarma's Computer Science background, full-stack development approach, and continuous engineering growth.",
  },
  "/education": {
    title: "Education — Rahul Vishwakarma",
    description: "Read about Rahul Vishwakarma's B.Tech in Computer Science and Engineering and NxtWave CCBP 4.0 full-stack training.",
  },
  "/contact": {
    title: "Contact — Rahul Vishwakarma",
    description: "Contact Rahul Vishwakarma for full-stack developer, frontend developer, and entry-level software engineering opportunities.",
  },
};

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const match = selector.match(/(name|property)="([^"]+)"/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = routeSeo[pathname] || routeSeo["/"];
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = seo.title;
    document.documentElement.lang = "en";
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('meta[property="og:title"]', "content", seo.title);
    setMeta('meta[property="og:description"]', "content", seo.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", `${SITE_URL}/favicon.svg`);
    setMeta('meta[name="twitter:title"]', "content", seo.title);
    setMeta('meta[name="twitter:description"]', "content", seo.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let data = document.getElementById("portfolio-structured-data");
    if (!data) {
      data = document.createElement("script");
      data.id = "portfolio-structured-data";
      data.type = "application/ld+json";
      document.head.appendChild(data);
    }
    data.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: PERSONAL_INFO.name,
          url: `${SITE_URL}/`,
          image: `${SITE_URL}/favicon.svg`,
          email: `mailto:${PERSONAL_INFO.email}`,
          jobTitle: PERSONAL_INFO.role,
          description: "Fresher full-stack developer specializing in React, JavaScript, REST APIs, and responsive web applications.",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
          sameAs: [PERSONAL_INFO.linkedin, PERSONAL_INFO.github],
        },
        {
          "@type": "WebSite",
          name: "Rahul Vishwakarma Portfolio",
          url: `${SITE_URL}/`,
          inLanguage: "en",
          about: { "@type": "Person", name: PERSONAL_INFO.name },
        },
      ],
    });
  }, [pathname]);

  return null;
}
