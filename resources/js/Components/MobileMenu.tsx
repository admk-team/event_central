"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import { Button } from "../Components/ui/button"
import { Menu, X } from "lucide-react"

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsOpen(true)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black">
                    <div className="flex h-16 items-center justify-between px-4">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-amber-500">
                                <span className="sr-only">Fokus Network</span>
                            </div>
                            <span className="text-lg font-bold">Fokus Network</span>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </div>
                    <nav className="mt-8 px-4">
                        <ul className="space-y-4">
                            <li>
                                <Link href="#features" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#testimonials" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#faq" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="block py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                                    Login
                                </Link>
                            </li>
                            <li className="pt-4">
                                <Button className="w-full bg-amber-500 text-black hover:bg-amber-600" onClick={() => setIsOpen(false)}>
                                    Get Started
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    )
}

