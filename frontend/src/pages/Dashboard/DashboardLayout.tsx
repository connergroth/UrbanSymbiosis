import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'; // REMOVED
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Bell, Settings, LogOut, ChevronDown, CreditCard, Sparkles } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

// --- Imports for all pages ---
import { Home } from "./Home";
import { BookingsPage } from "./BookingsPage";
import { VolunteerPage } from "./VolunteerPage";
import { EventsPage } from "./EventsPage";
import { MembershipPage } from "./MembershipPage";
import { MarketplacePage } from "./MarketplacePage";

// import { useAuth } from '../../contexts/AuthContext'; // REMOVED

export function DashboardLayout() {
    // --- AUTH BYPASS ---
    const displayName = "User";
    const userId = "TEST_ID_123";

    const [hasNotifications, setHasNotifications] = useState(false);

    const [currentPage, setCurrentPage] = useState<string>("dashboard");

    const navItems = [
        { id: "dashboard", label: "Dashboard" },
        { id: "events", label: "Events" },
        { id: "bookings", label: "Bookings" },
        { id: "volunteer", label: "Volunteer" },
        { id: "membership", label: "Membership" },
        { id: "shop", label: "Shop" }
    ];

    const renderPage = () => {
        switch (currentPage) {
            case "dashboard":
                return <Home userId={userId} userName={displayName} onNavigate={setCurrentPage} />;
            case "bookings":
                return <BookingsPage />;
            case "volunteer":
                return <VolunteerPage />;
            case "events":
                return <EventsPage />;
            case "membership":
                return <MembershipPage />;
            case "shop":
                return <MarketplacePage />;
            default:
                return <Home userId={userId} userName={displayName} onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h1 className="mb-0">Welcome back, {displayName}</h1>
                            <p className="text-sm text-muted-foreground">Friday, November 7, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {hasNotifications && (
                                    <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
                                )}
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {displayName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden sm:inline">{displayName}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setCurrentPage("membership")}>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        My Membership
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex gap-1 overflow-x-auto">
                        {navItems.map((item) => (
                            <Button
                                key={item.id}
                                variant={currentPage === item.id ? "default" : "ghost"}
                                className="whitespace-nowrap"
                                onClick={() => setCurrentPage(item.id)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {renderPage()}
            </main>

            {/* Footer */}
            <footer className="bg-card border-t border-border mt-8">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="h-8">Discord</Button>
                            <Button variant="ghost" size="sm" className="h-8">Email</Button>
                            <Button variant="ghost" size="sm" className="h-8">Main Site</Button>
                            <Button variant="ghost" size="sm" className="h-8">Privacy</Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Sparkles className="h-3 w-3" />
                            <span>Built by Blueprint Boulder</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}