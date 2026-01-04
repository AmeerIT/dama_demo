"use client";

import Link from "next/link";
import { DefaultProps } from "@/lib/default-props";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection({ dictionary, lang }: DefaultProps) {
  return (
    <section className="relative bg-white overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Column */}
          <motion.div
            className="md:w-1/2 text-center md:text-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              {dictionary.hero.title} <br />
              <span className="text-primary">{dictionary.hero.subtitle}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mr-0">
              {dictionary.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href={`/${lang}/services`}>
                <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-lg shadow-primary">
                  {dictionary.hero.startJourney}
                </button>
              </Link>
              <Link href={`/${lang}/blog`}>
                <button className="bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
                  {dictionary.hero.viewWork}
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <div className="aspect-square bg-primary rounded-3xl overflow-hidden shadow-2xl relative group">
              <Image
                src="https://api.center-phone.com/v1/storage/buckets/media/files/694dba93003ad04c3fdd/view?project=694beec300098b09a52c"
                alt="Digital Success"
                width={800}
                height={800}
                className="w-full h-full object-cover grayscale-20 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-20"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary rounded-full blur-3xl opacity-50 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
