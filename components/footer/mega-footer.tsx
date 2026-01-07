import { DefaultProps } from "@/lib/default-props";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function MegaFooter({ lang, dictionary }: DefaultProps) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-background pt-16 pb-8 border-t border-border" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start">

            {/* Column 1: Contact and Logo */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center text-primary font-bold text-3xl mb-6">
                <img src="/favicon.ico" alt="DAMA Logo"
                  className="w-10 h-10 mx-3 mb-3" />
                <span>DAMA</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4 text-center md:text-start">
                {dictionary.footer.address}
              </p>
              <p className="text-muted-foreground text-sm mb-2 font-medium">
                {dictionary.footer.email}: info@damaproductions.com
              </p>
              <p className="text-muted-foreground text-sm font-medium" dir="ltr" lang="en">
                {dictionary.footer.phone}: (+964) 771 234 5678
              </p>
            </div>

            {/* Column 2: Map Placeholder */}
            <div className="rounded-2xl overflow-hidden
            shadow-inner border border-border aspect-video
             md:aspect-auto
              w-full md:w-full
              md:h-164 lg:h-72
                           h-48 bg-muted-foreground">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1766.110197039839!2d44.445272026685785!3d33.31955095116054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2siq!4v1767555786912!5m2!1sen!2siq"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            {/* Column 3: Subscription Section */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <h3 className="text-2xl font-bold mb-4">{dictionary.footer.subscribeTitle}</h3>
              <p className="text-muted-foreground text-sm mb-6">{dictionary.footer.subscribeDesc}</p>
              <div className="flex w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
                <ButtonGroup dir="ltr" className="w-full">
                  <Input
                    type="email"
                    placeholder={dictionary.footer.emailPlaceholder}
                    className="grow p-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary0"
                  />
                  <Button className="px-6 py-3 font-bold transition-colors">
                    {dictionary.footer.subscribeButton}
                  </Button>
                </ButtonGroup>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; {currentYear} {dictionary.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Sticky Button */}
      <a
        href="https://wa.me/9647712345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all z-40 hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.405.836 2.708 1.255 4.927 1.256 5.565 0 10.101-4.519 10.104-10.082.002-2.697-1.047-5.232-2.955-7.143-1.907-1.913-4.44-2.964-7.14-2.965-5.564 0-10.1 4.52-10.103 10.083-.001 2.028.52 3.35 1.448 4.828l-.966 3.523 3.585-.94zm10.511-7.108c-.287-.144-1.696-.838-1.958-.934-.262-.096-.453-.144-.644.144-.191.288-.74.934-.907 1.126-.167.192-.334.216-.621.072-.287-.144-1.21-.447-2.306-1.424-.853-.761-1.428-1.7-1.595-1.988-.167-.288-.018-.444.126-.587.13-.13.287-.336.43-.504.143-.168.191-.288.287-.48.096-.192.048-.36-.024-.504-.072-.144-.644-1.556-.883-2.128-.233-.561-.47-.484-.644-.492-.167-.008-.358-.01-.55-.01s-.501.072-.764.36c-.262.288-1.002.984-1.002 2.399s1.026 2.784 1.17 2.976c.143.192 2.02 3.084 4.893 4.327.683.296 1.216.474 1.632.606.688.219 1.312.188 1.807.115.552-.081 1.696-.692 1.935-1.363.239-.672.239-1.248.167-1.363-.072-.115-.262-.216-.549-.36z" />
        </svg>
      </a>
    </>
  );
}
