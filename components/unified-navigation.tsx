'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export function UnifiedNavigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const mainNavItems = [
    { label: 'الرئيسية', href: '/' },
    {
      label: 'عن الشركة',
      href: '#',
      submenu: [
        { label: 'نبذة عنا', href: '/' },
        { label: 'الموظفين', href: '/job-descriptions' },
        { label: 'الشركاء', href: '/' },
      ],
    },
    {
      label: 'المشاريع',
      href: '#',
      submenu: [
        { label: 'المناطق', href: '/areas' },
        { label: 'العملاء', href: '/contacts' },
        { label: 'المراحل', href: '/phases' },
      ],
    },
    {
      label: 'الخدمات',
      href: '#',
      submenu: [
        { label: 'الحزم', href: '/packages' },
        { label: 'المواصفات', href: '/specifications' },
        { label: 'التعديلات', href: '/modifications' },
      ],
    },
    {
      label: 'الإدارة',
      href: '#',
      submenu: [
        { label: 'جودة التنفيذ', href: '/quality' },
        { label: 'الغرامات', href: '/penalties' },
        { label: 'الدفعات', href: '/payment' },
        { label: 'المقاولون', href: '/contractors' },
        { label: 'المركبات', href: '/vehicles' },
      ],
    },
    { label: 'المكتب الفني', href: '/technical-office' },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ش</span>
            </div>
            <span className="text-primary font-bold text-lg">شوقي جروب</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-1"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </button>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute right-0 mt-0 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-foreground">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
