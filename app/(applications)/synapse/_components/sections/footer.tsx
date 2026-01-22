"use client";

import { motion } from "framer-motion";
import {
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  Command,
  NotePencilIcon,
} from "@phosphor-icons/react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Security", "Desktop App", "Mobile"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Community", "Templates"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press Kit"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Settings"],
    },
  ];

  return (
    <footer className="relative w-full bg-white/40 backdrop-blur-md border-t border-gray-200/50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl p-3 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <NotePencilIcon className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Synapse
              </span>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              The workspace that thinks like you do. Unified, fast, and
              beautifully simple.
            </p>
            <div className="flex gap-4 mt-6">
              <SocialIcon icon={<TwitterLogo weight="fill" />} />
              <SocialIcon icon={<GithubLogo weight="fill" />} />
              <SocialIcon icon={<LinkedinLogo weight="fill" />} />
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2024 Synapse Technologies Inc. Built for macOS.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
            <span className="flex items-center gap-1.5 cursor-default">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <motion.a
    href="#"
    whileHover={{ y: -2 }}
    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all"
  >
    {icon}
  </motion.a>
);

export default Footer;
