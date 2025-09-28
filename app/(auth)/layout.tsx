import Image from "next/image"
import Link from "next/link"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrolbar-hide-default">
                <Link href='/' className="auth-logo">
                    <Image src='/assets/icons/logo.svg' alt='infoske logo'
                        width={140} height={32} className="h-8 w-auto" />
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">
                    {children}
                </div>
            </section>

            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote">
                        Infoske transforms market data into clear real-time insights and smart analysis. It feels like having a personal market expert guiding every decision I make.
                    </blockquote>

                    <div className="flex items-center justify-between">
                        <cite className="auth-testimonial-author">Yu Jaoxi,
                            <span className="font-normal text-gray-500"> CFO Zinance Capital</span>
                        </cite>
                        <div className="flex items-center gap-0.5 mt-2 mx-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image src='/assets/icons/star.svg'
                                    width={20}
                                    key={star}
                                    height={20}
                                    alt="star ratings" 
                                    className="size-5"/>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image src='/assets/images/dashboard.png' alt='Dashboard Preview'
                    width={1440} height={1150} className="auth-dashboard-preview absolute top-0"
                    />
                </div>
            </section>
        </main>
    );
};

export default Layout;