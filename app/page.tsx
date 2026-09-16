"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import StarBackground from "@/components/StarBackground";
import CustomCursor from "@/components/CustomCursor";

const WhatsappIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
  </svg>
);

const LineIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/>
  </svg>
);

const EmailCardIcon = () => (
  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const FigmaIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#FF7262"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#1ABCFE"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const VSCodeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.12a.999.999 0 0 0-1.276.064L.346 7.377a.999.999 0 0 0 .07 1.488l3.96 3.135-3.96 3.135a.999.999 0 0 0-.07 1.488l1.303 1.303a.999.999 0 0 0 1.276.064l4.12-3.12 9.46 8.63c.47.43 1.157.54 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.25V3.75a1.5 1.5 0 0 0-.85-1.163zM18 16.5l-6-4.5 6-4.5v9z"/>
  </svg>
);

const VercelIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12 1L24 22H0L12 1Z"/>
  </svg>
);

const AndroidStudioIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.552 0 .9997.4482.9997.9993s-.4477.9997-.9997.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.552 0 .9997.4482.9997.9993s-.4477.9997-.9997.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508c-1.8533 0-3.5902.3931-5.1367 1.0989L4.841 5.4466a.416.416 0 0 0-.5676-.1521.416.416 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589.043 18.784h23.914c-.3002-4.1251-2.6459-7.5973-6.0754-9.4626"/>
  </svg>
);

const AntigravityIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const BackendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.775 0-6.387-1.162T3 17V7q0-1.65 2.638-2.825T12 3t6.363 1.175T21 7v10q0 1.675-2.613 2.838T12 21m0-11.975q2.225 0 4.475-.638T19 7.025q-.275-.725-2.512-1.375T12 5q-2.275 0-4.462.638T5 7.025q.35.75 2.538 1.375T12 9.025M12 14q1.05 0 2.025-.1t1.863-.288t1.675-.462T19 12.525v-3q-.65.35-1.437.625t-1.675.463t-1.863.287T12 11t-2.05-.1t-1.888-.288T6.4 10.15T5 9.525v3q.625.35 1.4.625t1.663.463t1.887.287T12 14m0 5q1.15 0 2.338-.175t2.187-.462t1.675-.65t.8-.738v-2.45q-.65.35-1.437.625t-1.675.463t-1.863.287T12 16t-2.05-.1t-1.888-.288T6.4 15.15T5 14.525V17q.125.375.788.725t1.662.638t2.2.462T12 19"/></svg>
);

const CodeHobbyIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 1024 1024">
    <path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32m-40 728H184V184h656z"/>
  </svg>
);

const GameHobbyIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M15 9v3m-1.5-1.5h3M7 5c1 0 3 1 5 1s4-1 5-1c3 0 7 14 3 14c-3 0-4.5-4-8-4s-5 4-8 4C0 19 4 5 7 5Zm3 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"/>
  </svg>
);

const MusicHobbyIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M11.634 14.085a1.25 1.25 0 1 1-1.768-1.768a1.25 1.25 0 0 1 1.768 1.768m6.512-11.37a1.75 1.75 0 0 1 2.475 0l.707.708a1.75 1.75 0 0 1 0 2.475l-5.1 5.1a2.752 2.752 0 0 1-1.052 3.999l-.832.416a.61.61 0 0 0-.325.663l.015.073a4.71 4.71 0 0 1-1.792 4.69a6.03 6.03 0 0 1-7.878-.56l-.599-.6a6.03 6.03 0 0 1-.56-7.877a4.71 4.71 0 0 1 4.69-1.792l.072.015a.61.61 0 0 0 .664-.325l.416-.833a2.752 2.752 0 0 1 3.998-1.05zm1.414 1.061a.25.25 0 0 0-.353 0l-1.185 1.185l1.06 1.06l1.185-1.184a.25.25 0 0 0 0-.354zm-1.538 3.306l-1.06-1.06l-3.351 3.35a.75.75 0 0 1-1.061 0l-.16-.159a1.25 1.25 0 0 0-2.001.325l-.417.833a2.11 2.11 0 0 1-2.299 1.124l-.072-.014a3.21 3.21 0 0 0-3.196 1.22a4.53 4.53 0 0 0 .421 5.918l.599.599a4.53 4.53 0 0 0 5.917.42a3.21 3.21 0 0 0 1.22-3.195l-.014-.072a2.11 2.11 0 0 1 1.125-2.3l.833-.416a1.25 1.25 0 0 0 .324-2.002l-.159-.16a.75.75 0 0 1 0-1.06z"/>
  </svg>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeSection, setActiveSection] = useState("about");

  const { scrollY, scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const xLeft = useTransform(scrollY, [0, 800], [0, -250]);
  const xRight = useTransform(scrollY, [0, 800], [0, 250]);
  const contactX = useTransform(scrollY, [2000, 3200], [-200, 100]);

  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const interestsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "skills", ref: skillsRef },
        { id: "projects", ref: projectsRef },
        { id: "interests", ref: interestsRef },
        { id: "contact", ref: contactRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const top = section.ref.current.offsetTop;
          const height = section.ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const words = useMemo(() => ["Web Developer", "App Developer"], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const targetWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetWord.substring(0, currentText.length + 1));
        if (currentText === targetWord) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(targetWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, isLoading, words]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "60bf7cad-cfd7-4973-9290-272df46510a8");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "Instagram", label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/bubbunbu/" },
    { name: "GitHub", label: "GitHub", icon: GithubIcon, href: "https://github.com/Hendryann" },
    { name: "WhatsApp", label: "WhatsApp", icon: WhatsappIcon, href: "https://wa.me/6281364908105" },
    { name: "Line", label: "Line", icon: LineIcon, href: "https://line.me/ti/p/kT8pyukdze" },
    { name: "LinkedIn", label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/hendri-yanto-024288326" },
  ];

  const educationData = [
    {
      period: "2024 – Present",
      title: "Bina Nusantara University",
      subtitle: "Computer Science",
    },
    {
      period: "2021 – 2024",
      title: "SMA Negeri 1 Rengat",
      subtitle: "",
    },
    {
      period: "2018 – 2021",
      title: "SMP Buddhis Paramita Rengat",
      subtitle: "",
    },
  ];

  const softSkills = [
    "Communication",
    "Problem Solving",
    "Team Work",
    "Creativity",
    "Adaptability",
  ];

  const toolsList = [
    { name: "Figma", icon: FigmaIcon, color: "hover:bg-pink-500/10 hover:border-pink-500" },
    { name: "VSCode", icon: VSCodeIcon, color: "hover:bg-blue-500/10 hover:border-blue-500" },
    { name: "Git", icon: GithubIcon, color: "hover:bg-orange-500/10 hover:border-orange-500" },
    { name: "Vercel", icon: VercelIcon, color: "hover:bg-black/10 hover:border-black" },
    { name: "Android Studio", icon: AndroidStudioIcon, color: "hover:bg-green-500/10 hover:border-green-500" },
    { name: "Antigravity", icon: AntigravityIcon, color: "hover:bg-purple-500/10 hover:border-purple-500" },
  ];

  const codeLanguages = [
    "HTML/CSS",
    "Java",
    "Flutter/Dart",
    "React/NextJS",
    "Javascript",
  ];

  const actualProjects = [
    {
      id: 1,
      title: "BrainUP",
      number: "#001",
      category: "GAMIFIED E-LEARNING PLATFORM",
      description: "An e-learning platform featuring gamification to make learning engaging and enjoyable for users.",
      image: "/Project 1.webp",
      tech: ["Flutter", "Dart", "Node.js"],
      feRepo: "https://github.com/PokerTick/BrainUp",
      beRepo: "https://github.com/Giovan-pemula/MobileHybridSolution-BE",
    },
    {
      id: 2,
      title: "Honkai Retail",
      number: "#002",
      category: "INGAME E-COMMERCE MOBILE APP",
      description: "A specialized mobile e-commerce application designed specifically for trading in-game items securely.",
      image: "/Project 2.webp",
      tech: ["Flutter", "Dart", "Firebase"],
      feRepo: "https://github.com/Hendryann/mobile-honkia-retail",
      beRepo: "https://github.com/Hendryann/mobile-honkia-retail",
    },
    {
      id: 3,
      title: "SunibEvent",
      number: "#003",
      category: "CAMPUS EVENT DISCOVERY",
      description: "A web platform enabling Binusian students to effortlessly discover and register for campus organization events.",
      image: "/Project 3.webp",
      tech: ["Next.js", "Tailwind CSS", "Node.js"],
      feRepo: "https://github.com/GerasimosAlpen/SunibEvent-FE",
      beRepo: "https://github.com/GerasimosAlpen/SunibEvent-BE",
    },
  ];

  const languagesData = [
    { title: "Indonesia", level: "Native" },
    { title: "English", level: "Intermediate" },
    { title: "中文", level: "Basic" },
  ];

  const hobbiesData = [
    { title: "Coding", icon: CodeHobbyIcon },
    { title: "Gaming", icon: GameHobbyIcon },
    { title: "Music", icon: MusicHobbyIcon },
  ];

  return (
    <main className="min-h-screen bg-white text-black relative overflow-x-hidden font-sans selection:bg-blue-600 selection:text-white">
      <style jsx global>{`
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@900&f[]=satoshi@400,500,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@500;600;700&display=swap');

        html {
          scroll-behavior: smooth;
        }
        .brand-font {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        .mono-role {
          font-family: 'Martian Mono', monospace;
          font-weight: 600;
          color: #2563eb;
        }
        .card-desc {
          font-family: 'Satoshi', sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }
        .mono-badge {
          font-family: 'Martian Mono', monospace;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
        }
        .text-outline-black {
          -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.15);
          color: transparent;
        }
        .text-outline-white {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9);
          color: transparent;
        }
      `}</style>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 origin-left z-[70]"
          />

          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md text-black border-b border-zinc-200/80 shadow-sm py-4 px-4 md:px-16 transition-all duration-300">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <a href="#" onClick={(e) => handleNavClick(e, "about")} className="brand-font text-lg md:text-xl tracking-tighter hover:opacity-80 transition-opacity">
                HENDRI<span className="text-blue-600">.</span>
              </a>

              <div className="hidden md:flex gap-2 text-sm font-medium text-zinc-800">
                <a href="#about" onClick={(e) => handleNavClick(e, "about")} className={`transition-all px-4 py-1.5 rounded-full ${activeSection === "about" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}>About</a>
                <a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className={`transition-all px-4 py-1.5 rounded-full ${activeSection === "skills" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}>Skills</a>
                <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className={`transition-all px-4 py-1.5 rounded-full ${activeSection === "projects" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}>Projects</a>
                <a href="#interests" onClick={(e) => handleNavClick(e, "interests")} className={`transition-all px-4 py-1.5 rounded-full ${activeSection === "interests" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}>Interests</a>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-50"
                aria-label="Toggle Menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-black block transition-transform"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-black block transition-opacity"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-black block transition-transform"
                />
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-white/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-6 text-lg font-semibold text-zinc-900 md:hidden"
              >
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "about")}
                  className={`transition-all px-6 py-2 rounded-full ${activeSection === "about" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={(e) => handleNavClick(e, "skills")}
                  className={`transition-all px-6 py-2 rounded-full ${activeSection === "skills" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "projects")}
                  className={`transition-all px-6 py-2 rounded-full ${activeSection === "projects" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}
                >
                  Projects
                </a>
                <a
                  href="#interests"
                  onClick={(e) => handleNavClick(e, "interests")}
                  className={`transition-all px-6 py-2 rounded-full ${activeSection === "interests" ? "text-white bg-black font-bold shadow-sm" : "hover:text-blue-600"}`}
                >
                  Interests
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <section ref={aboutRef} id="about" className="relative min-h-screen pt-20 md:pt-24 flex flex-col justify-between px-4 md:px-16 py-8 overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none z-0" />
            
            <div 
              className="absolute inset-0 pointer-events-none opacity-40 z-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.15) 2px, transparent 2px)',
                backgroundSize: '28px 28px',
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 opacity-80 overflow-hidden">
              <motion.span 
                style={{ x: xLeft }}
                className="brand-font text-[18vw] md:text-[12vw] leading-none tracking-tighter uppercase text-outline-black whitespace-nowrap"
              >
                PORTFOLIO
              </motion.span>
              <motion.span 
                style={{ x: xRight }}
                className="brand-font text-[18vw] md:text-[12vw] leading-none tracking-tighter uppercase text-outline-black my-[-3vw] md:my-[-2vw] whitespace-nowrap"
              >
                PORTFOLIO
              </motion.span>
              <motion.span 
                style={{ x: xLeft }}
                className="brand-font text-[18vw] md:text-[12vw] leading-none tracking-tighter uppercase text-outline-black whitespace-nowrap"
              >
                PORTFOLIO
              </motion.span>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto my-auto w-full py-8 md:py-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-64 md:w-80 flex-shrink-0"
              >
                <div className="relative border-2 border-black rounded-lg overflow-hidden bg-zinc-200 shadow-xl">
                  <Image
                    src="/profile.png"
                    alt="Profile Photo"
                    width={800}
                    height={1000}
                    className="w-full h-[320px] md:h-[400px] object-cover"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -bottom-5 -left-4 md:-bottom-6 md:-left-6 max-w-[200px] md:max-w-[220px] p-3 md:p-4 rounded-2xl shadow-lg border border-[#024586]/20"
                  style={{ backgroundColor: "#C9DEEC", color: "#024586" }}
                >
                  <p className="text-[11px] md:text-xs font-semibold leading-relaxed">
                    &quot;If you trully want it, you&apos;ll find a way&quot;
                  </p>
                  <div 
                    className="absolute -top-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px]"
                    style={{ borderBottomColor: "#C9DEEC" }}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-start max-w-md w-full"
              >
                <h1 className="brand-font text-4xl md:text-6xl tracking-tighter uppercase text-black mb-1">
                  PORTFOLIO
                </h1>

                <div className="flex items-center gap-2 text-base md:text-xl mono-role mb-6 md:mb-8 min-h-[32px]">
                  <span>&gt;</span>
                  <span>{currentText}</span>
                  <span className="w-[2px] h-5 md:h-6 bg-blue-600 animate-pulse inline-block" />
                </div>

                <div className="flex flex-col gap-2.5 w-full">
                  {socialLinks.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between px-4 py-2 rounded-full border border-zinc-200 md:border-transparent hover:border-black transition-all duration-300 ease-in-out text-zinc-700 hover:text-black bg-white/50 md:bg-transparent"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-zinc-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors duration-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-xs md:text-sm group-hover:font-semibold transition-all">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-xs font-mono opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          ↗
                        </span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="relative bg-black text-white px-4 md:px-16 py-16 md:py-24 flex flex-col justify-center items-center border-b border-zinc-900 overflow-hidden">
            <StarBackground />

            <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 mb-16 md:mb-24">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 max-w-xl text-center md:text-left"
              >
                <h2 className="brand-font text-3xl md:text-6xl tracking-tight leading-tight mb-6 md:mb-8">
                  <span className="text-outline-white">Hi there, I&apos;m </span>
                  <span className="text-white">Hendri</span>
                </h2>

                <p className="text-zinc-300 text-sm md:text-lg leading-relaxed font-normal">
                  I am a Computer Science student at Bina Nusantara University (BINUS) with hands-on experience in building web applications, Android apps, and UI/UX designs. I am passionate about creating functional, modern, and user-friendly digital solutions while continuously expanding my skills through various projects and technology experiences.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex-shrink-0"
              >
                <div className="relative w-64 md:w-80 h-[320px] md:h-[400px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
                  <Image
                    src="/profile.png"
                    alt="Hendri - Profile"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-5xl mx-auto w-full border-t border-zinc-900 pt-12 md:pt-16 mb-16 md:mb-20"
            >
              <div className="mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Education</h3>
                <div className="w-12 h-1 bg-white rounded-full" />
              </div>

              <div className="relative w-full">
                <div className="hidden md:block absolute top-[7px] left-0 right-0 h-[2px] bg-zinc-800 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative z-10">
                  {educationData.map((edu, idx) => (
                    <div key={idx} className="flex flex-col items-start relative pl-6 md:pl-0 border-l border-zinc-800 md:border-l-0">
                      <div className="md:hidden absolute -left-[6.5px] top-1 w-3 h-3 rounded-full bg-white ring-2 ring-white ring-offset-2 ring-offset-black" />
                      <div className="hidden md:block w-4 h-4 rounded-full bg-white ring-2 ring-white ring-offset-4 ring-offset-black mb-6" />

                      <span className="text-xs font-mono font-bold text-white mb-1">
                        {edu.period}
                      </span>

                      <h4 className="text-base md:text-lg font-bold text-white mb-0.5">
                        {edu.title}
                      </h4>

                      {edu.subtitle && (
                        <p className="text-xs md:text-sm text-zinc-400 font-medium">
                          {edu.subtitle}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-5xl mx-auto w-full border-t border-zinc-900 pt-12 md:pt-16"
            >
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Soft Skills</h3>
                <div className="w-12 h-1 bg-white rounded-full" />
              </div>

              <div className="flex flex-wrap gap-2.5 md:gap-4 items-center">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-white text-white text-xs md:text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black cursor-default select-none shadow-sm"
                  >
                    #{skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section ref={skillsRef} id="skills" className="relative bg-white text-black px-4 md:px-16 py-16 md:py-28 flex flex-col justify-center items-center border-b border-zinc-200">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto w-full"
            >
              <div className="text-center mb-12 md:mb-16">
                <h2 className="brand-font text-3xl md:text-5xl tracking-tight uppercase mb-2 md:mb-3 text-black">
                  Technical Skills
                </h2>
                <p className="text-zinc-500 font-mono text-xs md:text-sm">
                  Tools and programming languages I regularly use
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                <div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mb-4 md:mb-6 flex items-center gap-2">
                    <span>Software &amp; Tools</span>
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {toolsList.map((tool, idx) => {
                      const Icon = tool.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.08, y: -4 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`p-3 md:p-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex flex-col items-center justify-center gap-2 md:gap-3 transition-colors duration-300 shadow-sm ${tool.color} cursor-pointer`}
                        >
                          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-zinc-800">
                            <Icon />
                          </div>
                          <span className="text-[11px] md:text-xs font-mono font-semibold text-zinc-700">
                            {tool.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mb-4 md:mb-6 flex items-center gap-2">
                    <span>Programming Languages</span>
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  </h3>

                  <div className="flex flex-wrap gap-2.5 md:gap-3">
                    {codeLanguages.map((lang, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-black text-black font-mono text-xs md:text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white cursor-default select-none"
                      >
                        {lang}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section ref={projectsRef} id="projects" className="relative bg-white text-black px-4 md:px-16 py-16 md:py-28 flex flex-col justify-center items-center border-b border-zinc-200">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto w-full"
            >
              <div className="text-left mb-12 md:mb-16">
                <h2 className="brand-font text-3xl md:text-5xl tracking-tight uppercase mb-2 md:mb-3 text-black">
                  PROJECTS
                </h2>
                <div className="flex items-center gap-2 text-sm mono-role">
                  <span>&gt;</span>
                  <span>Featured Repositories &amp; Deployments</span>
                  <span className="w-2 h-2 bg-blue-600 inline-block" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {actualProjects.slice(0, 2).map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    className="group relative rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={900}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white mono-badge">
                        {project.number}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow justify-between bg-white">
                      <div>
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 mono-badge">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="brand-font text-xl md:text-2xl tracking-tight mb-2 text-black">
                          {project.title}
                        </h3>

                        <p className="card-desc mb-6">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[11px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100">
                          <a
                            href={project.feRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-black hover:text-white hover:border-black transition-all duration-300 mono-badge text-zinc-800"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>Frontend Repo</span>
                          </a>
                          <a
                            href={project.beRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-black hover:text-white hover:border-black transition-all duration-300 mono-badge text-zinc-800"
                          >
                            <BackendIcon />
                            <span>Backend Repo</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 mt-6 md:mt-8 max-w-xl mx-auto w-full">
                {actualProjects.slice(2, 3).map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    className="group relative rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={900}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white mono-badge">
                        {project.number}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow justify-between bg-white">
                      <div>
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 mono-badge">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="brand-font text-xl md:text-2xl tracking-tight mb-2 text-black">
                          {project.title}
                        </h3>

                        <p className="card-desc mb-6">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[11px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100">
                          <a
                            href={project.feRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-black hover:text-white hover:border-black transition-all duration-300 mono-badge text-zinc-800"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>Frontend Repo</span>
                          </a>
                          <a
                            href={project.beRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-black hover:text-white hover:border-black transition-all duration-300 mono-badge text-zinc-800"
                          >
                            <BackendIcon />
                            <span>Backend Repo</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section ref={interestsRef} id="interests" className="relative bg-black text-white px-4 md:px-16 py-16 md:py-24 flex flex-col justify-center items-center overflow-hidden">
            <StarBackground />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start"
            >
              <div>
                <div className="mb-6 md:mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Language</h3>
                  <div className="w-12 h-1 bg-white rounded-full" />
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {languagesData.map((lang, idx) => (
                    <div key={idx} className="flex flex-col items-start">
                      <span className="text-lg md:text-2xl font-bold text-white mb-1">
                        {lang.title}
                      </span>
                      <span className="text-xs md:text-sm font-mono text-zinc-400">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6 md:mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Hobbies &amp; Interests</h3>
                  <div className="w-12 h-1 bg-white rounded-full" />
                </div>

                <div className="flex gap-6 md:gap-10 items-center">
                  {hobbiesData.map((hobby, idx) => {
                    const Icon = hobby.icon;
                    return (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="group flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-default"
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-sm">
                          <Icon />
                        </div>
                        <span className="text-xs font-mono font-medium">
                          {hobby.title}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </section>

          <section ref={contactRef} id="contact" className="relative bg-white text-black px-4 md:px-16 py-20 md:py-28 overflow-hidden flex flex-col justify-center items-center">
            <div className="absolute -bottom-10 right-0 pointer-events-none select-none z-0 opacity-20 overflow-hidden">
              <motion.span 
                style={{ x: contactX }}
                className="brand-font text-[20vw] md:text-[18vw] leading-none tracking-tighter uppercase text-outline-black whitespace-nowrap block"
              >
                CONTACT
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center"
            >
              <div className="md:col-span-5 flex flex-col justify-between h-full space-y-8">
                <div>
                  <h2 className="brand-font text-3xl md:text-5xl tracking-tight uppercase mb-3 text-black">
                    Get In Touch
                  </h2>
                  <p className="text-zinc-500 font-mono text-xs md:text-sm">
                    Feel free to reach out for collaborations or inquiries
                  </p>
                </div>

                <div className="p-5 md:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <EmailCardIcon />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</span>
                    <a href="mailto:hendryan2410@gmail.com" className="text-sm md:text-base font-semibold text-black hover:text-blue-600 transition-colors">
                      hendryan2410@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-mono text-zinc-400 mb-3">Connect with me:</span>
                  <div className="flex flex-wrap gap-3 items-center">
                    {socialLinks.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item.name}
                          className="w-10 h-10 rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-700 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-zinc-50 p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Your email"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Subject"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message →"}
                  </button>

                  {submitStatus === "success" && (
                    <p className="text-xs font-mono text-green-600 menu-badge mt-2">
                      ✓ Message sent successfully! Thank you for reaching out.
                    </p>
                  )}
                  {submitStatus === "error" /* eslint-disable-line no-constant-condition */ && (
                    <p className="text-xs font-mono text-red-500 mt-2">
                      ✕ Failed to send message. Please ensure your Web3Forms Access Key is valid.
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </section>

          <footer className="bg-black border-t border-zinc-900 text-center text-xs text-zinc-500 py-6">
            <p suppressHydrationWarning>© {new Date().getFullYear()} Hendri Yanto. All rights reserved.</p>
          </footer>
        </>
      )}
    </main>
  );
}