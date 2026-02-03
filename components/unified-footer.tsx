import React from 'react';
import Link from 'next/link';

export function UnifiedFooter() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-primary font-bold mb-4">شوقي جروب</h3>
            <p className="text-muted-foreground text-sm mb-4">
              متخصصون في التشطيبات والديكور للمشاريع السكنية في القاهرة الجديدة والتجمع الخامس وأكتوبر.
            </p>
            <div className="flex gap-4">
              {/* Social Links */}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                <span className="text-sm">Facebook</span>
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/areas"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  المناطق
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  العملاء
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  الحزم
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">الخدمات</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/specifications"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  المواصفات
                </Link>
              </li>
              <li>
                <Link
                  href="/modifications"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  التعديلات
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  شروط الدفع
                </Link>
              </li>
              <li>
                <Link
                  href="/job-descriptions"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  الوظائف
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">تواصل معنا</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">الهاتف:</span>
                <br />
                +20 100 000 0000
              </li>
              <li>
                <span className="font-medium text-foreground">البريد الإلكتروني:</span>
                <br />
                info@shawkigroup.com
              </li>
              <li>
                <span className="font-medium text-foreground">المكتب:</span>
                <br />
                القاهرة الجديدة، مصر
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              جميع الحقوق محفوظة © 2024 شوقي جروب
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
