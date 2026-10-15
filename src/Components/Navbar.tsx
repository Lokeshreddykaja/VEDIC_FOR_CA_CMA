import { useState, type FormEvent } from "react";

type NavbarProps = { cartCount: number; query: string; onQueryChange: (value: string) => void; onSearch: (value: string) => void };
const menus = [
  { label: "CA Courses", href: "/courses/ca", links: [["CA Final", "/product/ca-final"], ["CA Foundation", "/product/ca-foundation"]] },
  { label: "CMA Courses", href: "/courses/cma", links: [["CMA Final", "/product/cma-final"]] },
  { label: "Text Series", href: "/text-series", links: [["All Text Series", "/text-series"], ["Accounting Essentials", "/product/accounting-text"], ["Business Law Text Series", "/product/law-text"], ["Exam Revision Kit", "/product/revision-kit"]] },
];

export default function Navbar({ cartCount, query, onQueryChange, onSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSearch(query.trim()); setMobileOpen(false); };
  const toggleTheme = () => { document.documentElement.classList.toggle("dark-theme"); };

  return <header className="site-header"><div className="header-inner">
    <a className="brand-lockup" href="/"><img src="/logo.png" alt="VEDIC" /><span><b>VEDIC</b><small>CA · CMA · CS EDUCATION</small></span></a>
    <nav className={`main-nav ${mobileOpen ? "nav-open" : ""}`} aria-label="Main navigation" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setMobileOpen(false); }}>
      <a className="nav-link" href="/">Home</a>
      {menus.map((menu) => <details className="nav-dropdown" key={menu.label} onMouseEnter={(event) => { event.currentTarget.open = true; }} onMouseLeave={(event) => { event.currentTarget.open = false; }}><summary>{menu.label}<span>⌄</span></summary><div className={`dropdown-panel ${menu.label === "CA Courses" || menu.label === "CMA Courses" ? "ca-dropdown-panel" : ""}`}>{menu.label !== "CA Courses" && menu.label !== "CMA Courses" && <a className="dropdown-title" href={menu.href}>Explore {menu.label}{menu.label === "Text Series" ? "" : " courses"} <span>↗</span></a>}{(menu.label === "CA Courses" || menu.label === "CMA Courses") && <div className="dropdown-submenu"><a href={menu.label === "CA Courses" ? "/courses/ca" : "/courses/cma"} className="dropdown-submenu-trigger"><span>{menu.label === "CA Courses" ? "CA Inter" : "CMA Inter"}</span><span aria-hidden="true">›</span></a><div className="dropdown-subpanel">{(menu.label === "CA Courses" ? [["Face to Face", "/product/ca-intermediate"], ["34th Strategy", "/product/ca-intermediate"], ["Exam Oriented", "/product/ca-inter-group1"], ["Regular", "/product/ca-inter-group1-regular"], ["Subject Wise", "/courses/ca"], ["MCQ discussion", "/courses/ca"], ["Marathon", "/courses/ca"]] : [["34th Strategy", "/product/cma-intermediate"], ["Exam Oriented", "/product/cma-inter-group1-exam"], ["Regular", "/product/cma-inter-group1-regular"], ["Subject Wise", "/courses/cma"], ["Marathon", "/courses/cma"]]).map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div></div>}{menu.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div></details>)}
      <a className="nav-link" href="/books">Books</a><a className="nav-link" href="/resources">Free Resources</a><a className="nav-link" href="/about">About Us</a><a className="nav-link" href="/contact">Contact Us</a>
      <form className="mobile-search" role="search" onSubmit={submit}><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search courses & books" aria-label="Search courses and books" /><button aria-label="Search">⌕</button></form>
    </nav>
    <form className="header-search" role="search" onSubmit={submit}><button aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></svg></button><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search products..." aria-label="Search courses and books" /></form>
    <div className="header-actions"><button className="icon-button theme-button" onClick={toggleTheme} aria-label="Toggle dark theme"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8a8.5 8.5 0 1 0 11.5 11.5Z" /></svg></button><a className="icon-button account-button" href="/account" aria-label="Account"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4" /><path d="M4 20v-1.5a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5V20H4Z" /></svg></a><a className="icon-button cart-button" href="/cart" aria-label={`Cart, ${cartCount} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.4L22 8H6" /><circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></svg>{cartCount > 0 && <span className="cart-count">{cartCount}</span>}</a></div>
    <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen}>{mobileOpen ? "×" : "☰"}</button>
  </div></header>;
}
