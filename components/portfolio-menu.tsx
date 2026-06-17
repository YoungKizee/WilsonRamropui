"use client";

import { ArrowLeftIcon, BookText, Layers3, PlusIcon } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export type PortfolioConfig = {
    image?: string;
    firstName: string;
    experience: number;
    domain: string;
    role: string;

    bioText: {
        prefix: string;
        emphasis1: string;
        midText: string;
        emphasis2: string;
        suffix: string;
    };

    colors: {
        bioButton: string;
        menuButton: string;
        plusButton: string;
    };

    cvLink: string;
    twitterUrl: string;
    layersLink: string;
    githubLink: string;
};

export const defaultPortfolioConfig: PortfolioConfig = {
    firstName: 'Wilson',
    experience: 5,
    domain: 'development',
    role: 'developers',

    bioText: {
        prefix: "It's been",
        emphasis1: 'years',
        midText: 'since I got into development. I now have clear principles, the main one being',
        emphasis2: 'value instead of mindless execution',
        suffix: ". It's easy to print generic solutions, but what we developers are hired for is our unique point of view and creative thinking. Usability combined with clean architecture is the key to memorable and enjoyable products.",
    },

    colors: {
        bioButton: 'bg-orange-600',
        menuButton: 'bg-blue-600',
        plusButton: 'bg-green-600',
    },
    cvLink: '#',
    twitterUrl: '#',
    layersLink: '#',
    githubLink: '#',
};

export type Props = {
    config?: PortfolioConfig;
};

export default function Portfolio({ config = defaultPortfolioConfig }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isBio, setIsBio] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const isAnimatingRef = useRef(false);

    const controls = useAnimation();
    const imageControls = useAnimation();
    const plusControls = useAnimation();
    const iconsControls = useAnimation();
    const profileControls = useAnimation();
    const aboutControls = useAnimation();
    const menuControls = useAnimation();

    const containerVariants = {
        closed: { width: '3.75rem', height: '2rem', minWidth: '3.75rem' },
        open: { width: '16rem', height: '3.5rem', minWidth: '16rem' },
        bio: { width: '22.8rem', height: '11.9rem', minWidth: '22rem' },
        menu: { width: '10.25rem', height: '2rem', minWidth: '10.25rem' },
    };

    const aboutVariants = {
        closed: { opacity: 0, scale: 0.5 },
        bio: { opacity: 1, scale: 1 },
    };

    const imageVariants = {
        closed: {
            width: '24px',
            height: '24px',
            translateX: 0,
            opacity: 1,
        },
        open: {
            width: '2.2rem',
            height: '2.2rem',
            translateX: '4px',
            opacity: 1,
        },
        bio: { opacity: 0, translateX: '-3px' },
    };

    const plusVariants = {
        closed: { opacity: 1 },
        open: { opacity: 0 },
    };

    const iconsVariants = {
        closed: { opacity: 0, gap: '2px' },
        open: { opacity: 1, gap: '4px' },
    };

    const profileVariants = {
        closed: {
            scale: 0.5,
            left: '40px',
            opacity: 0,
            filter: 'blur(4px)',
            y: '-50%',
        },
        open: {
            scale: 1,
            left: '3.25rem',
            opacity: 1,
            filter: 'blur(0)',
            y: '-50%',
        },
    };

    const menuVariants = {
        closed: { opacity: 0, scale: 0, y: '-50%' },
        menu: { opacity: 1, scale: 1, y: '-50%' },
    };

    useEffect(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        const sequence = async () => {
            const state =
                isOpen && !isBio
                    ? 'openButBioClosed'
                    : isOpen && isBio
                      ? 'openButBioOpen'
                      : isMenu && !isOpen && !isBio
                        ? 'menuOpened'
                        : !isOpen && !isBio
                          ? 'closedButBioClosed'
                          : !isOpen && isBio
                            ? 'closedButBioOpen'
                            : null;

            switch (state) {
                case 'openButBioClosed': {
                    aboutControls.start('closed');
                    plusControls.start('open');
                    imageControls.start('open');
                    menuControls.start('closed');
                    await controls.start('open');
                    await Promise.all([iconsControls.start('open'), profileControls.start('open')]);
                    break;
                }
                case 'closedButBioClosed': {
                    await aboutControls.start('closed');
                    menuControls.start('closed');
                    await Promise.all([profileControls.start('closed'), iconsControls.start('closed')]);
                    await Promise.all([
                        controls.start('closed'),
                        imageControls.start('closed'),
                        plusControls.start('closed'),
                    ]);
                    break;
                }
                case 'openButBioOpen': {
                    imageControls.start('bio');
                    menuControls.start('closed');
                    await Promise.all([
                        plusControls.start('open'),
                        profileControls.start('closed'),
                        iconsControls.start('closed'),
                    ]);
                    await Promise.all([controls.start('bio'), aboutControls.start('bio')]);
                    break;
                }
                case 'menuOpened': {
                    await Promise.all([
                        imageControls.start('bio'),
                        profileControls.start('closed'),
                        iconsControls.start('closed'),
                    ]);
                    await Promise.all([controls.start('menu'), menuControls.start('menu')]);
                    break;
                }
            }
            isAnimatingRef.current = false;
        };

        sequence();
    }, [
        isOpen,
        controls,
        imageControls,
        plusControls,
        iconsControls,
        profileControls,
        aboutControls,
        isBio,
        isMenu,
        menuControls,
    ]);

    return (
        <div className={cn('fixed bottom-8 right-8 z-[9999] flex justify-end items-center bg-transparent', inter.className)}>
            <motion.div
                variants={containerVariants}
                initial="closed"
                animate={controls}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative flex justify-center items-center bg-zinc-900 border border-white/10 p-3 rounded-[30px] w-[3.75rem] h-8 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
                <div className="top-1/2 left-1 z-[9999] absolute flex justify-center items-center origin-left transition-all -translate-y-1/2 duration-350 ease-out">
                    <motion.div
                        variants={imageVariants}
                        initial="closed"
                        animate={imageControls}
                        onClick={() => {
                            if (!isAnimatingRef.current) {
                                setIsOpen((prev) => !prev);
                            }
                        }}
                    >
                        {config?.image ? (
                            <Image
                                alt="me"
                                src={config?.image}
                                width={42}
                                height={42}
                                className="m-0 rounded-full w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex justify-center items-center bg-white rounded-full w-full h-full">
                                <h1 className="m-0 text-black text-sm select-none">
                                    {config?.firstName?.substring(0, 1)}
                                </h1>
                            </div>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    variants={plusVariants}
                    initial="closed"
                    animate={plusControls}
                    className="top-1/2 right-1 z-[9999] absolute flex justify-center items-center bg-green-600 opacity-1 rounded-full w-6 h-6 transition-all -translate-y-1/2 duration-350 ease-out hover:rotate-[720deg]"
                >
                    <PlusIcon className="text-white" size={16} />
                </motion.div>

                <motion.div
                    variants={iconsVariants}
                    initial="closed"
                    animate={iconsControls}
                    className="top-1/2 right-[0.685rem] z-[999] absolute flex items-center gap-1 -translate-y-1/2"
                >
                    <div
                        onClick={() => {
                            if (!isAnimatingRef.current) {
                                setIsBio(true);
                            }
                        }}
                        className="flex justify-center items-center gap-[2px] bg-orange-600 rounded-full size-[36px]"
                    >
                        <div className="bg-white rounded-full w-[1.5px] h-[4px]" />
                        <div className="bg-white rounded-full w-[1.5px] h-[8px]" />
                        <div className="bg-white rounded-full w-[1.5px] h-[14px]" />
                        <div className="bg-white rounded-full w-[1.5px] h-[5px]" />
                        <div className="bg-white rounded-full w-[1.5px] h-[10px]" />
                        <div className="bg-white rounded-full w-[1.5px] h-[5px]" />
                    </div>
                    <div
                        onClick={() => {
                            if (!isAnimatingRef.current) {
                                setIsMenu(true);
                                setIsBio(false);
                                setIsOpen(false);
                            }
                        }}
                        className="flex justify-center items-center gap-[3px] bg-blue-600 rounded-full size-[36px]"
                    >
                        <div className="bg-white rounded-full size-[2.5px]" />
                        <div className="bg-white rounded-full size-[2.5px]" />
                        <div className="bg-white rounded-full size-[2.5px]" />
                    </div>
                </motion.div>

                <AnimatePresence>
                    <motion.div
                        key="profile"
                        variants={profileVariants}
                        initial="closed"
                        animate={profileControls}
                        exit="closed"
                        transition={{
                            duration: 0.35,
                            ease: 'easeOut',
                        }}
                        className="top-1/2 z-[50] absolute flex flex-col origin-left"
                    >
                        <span className="text-gray-400 text-sm select-none">{"Hello, I'm"}</span>
                        <h1 className="m-0 font-normal text-base text-white leading-[16px] select-none">
                            {config?.firstName}
                        </h1>
                    </motion.div>
                </AnimatePresence>
                <motion.div
                    variants={aboutVariants}
                    initial="closed"
                    animate={aboutControls}
                    onClick={() => {
                        if (!isAnimatingRef.current) {
                            setIsBio(false);
                        }
                    }}
                    className="relative flex min-w-[372px] max-sm:min-w-calc max-w-[372px] max-sm:max-w-calc h-[100%] origin-center transition-all duration-350 overflow-hidden ease-out"
                >
                    <div className="px-4 w-full h-full overflow-hidden">
                        <p className="relative m-0 text-base text-zinc-400 select-none">
                            It&apos;s been <span className="text-white">{config?.experience} years</span> since I got
                            into {config?.domain}. I&nbsp;now have clear principles, the main one being{' '}
                            <span className="text-white">“value instead of mindless execution”</span>. It&apos;s easy to
                            print generic solutions, but what we {config?.role} are hired for is our unique point of
                            view and creative thinking. Usability combined with clean architecture is the key to memorable
                            and&nbsp;enjoyable products.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    variants={menuVariants}
                    initial="closed"
                    animate={menuControls}
                    className="top-1/2 left-[0.7rem] z-[9999] absolute origin-center"
                >
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => {
                                if (!isAnimatingRef.current) {
                                    setIsMenu(false);
                                    setIsOpen(true);
                                }
                            }}
                            className="cursor-pointer"
                        >
                            <ArrowLeftIcon size={16} color="white" />
                        </div>
                        <Link href={config?.cvLink || '#'}>
                            <BookText size={16} color="white" className="rotate-[30deg] hover:text-orange-400 transition-colors" />
                        </Link>
                        <Link href={config?.twitterUrl || '#'}>
                            <FaTwitter size={16} color="white" className="hover:text-blue-400 transition-colors" />
                        </Link>
                        <Link href={config?.layersLink || '#'}>
                            <Layers3 size={16} className="rotate-[30deg] hover:text-green-400 transition-colors" color="white" />
                        </Link>
                        <Link href={config?.githubLink || '#'}>
                            <FaGithub size={16} color="white" className="hover:text-purple-400 transition-colors" />
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
