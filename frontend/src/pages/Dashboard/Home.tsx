import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
    Calendar,
    Truck,
    Users,
    CreditCard,
    BookOpen,
    Clock,
    MapPin,
    Megaphone,
    Sparkles,
    ArrowRight
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Separator } from "../../components/ui/separator";

import { useDashboardData } from "../../hooks/useDashboardData";

// --- LOCAL DUMMY INTERFACES ---
interface Booking { id: string | number; type?: string; item?: string; date?: string; time?: string; location?: string; }
interface Event { id: number; title?: string; date?: string; time?: string; volunteers?: number; maxVolunteers?: number; }
interface Announcement { id: number; title?: string; message?: string; date?: string; }



interface HomeProps {
    userId: string | undefined;
    userName: string;
    onNavigate: (page: string) => void;
}

export function Home({ userId, userName, onNavigate }: HomeProps) {
    const { upcomingBookings, upcomingEvents, announcements, isLoading, error } = useDashboardData(
        userId
    );

    const quickActions = [
        { icon: Truck, label: "Book a Trailer or Space", page: "bookings" },
        { icon: Users, label: "Volunteer for an Event", page: "volunteer" },
        { icon: BookOpen, label: "View Workshops & Events", page: "events" },
        { icon: CreditCard, label: "Membership Info", page: "membership" }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-xl text-muted-foreground">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <h2 className="text-destructive font-semibold">Data Load Error</h2>
                <p className="text-muted-foreground">{error}</p>
                <p className="text-sm text-muted-foreground mt-2">
                    This usually means the API client needs implementation in lib/api.ts.
                </p>
                <Button onClick={() => window.location.reload()} className="mt-4">Try Reloading</Button>
            </div>
        );
    }

    return (
        <div>
            {/* Quick Actions - Compact Row */}
            <section className="mb-6">
                <h3 className="mb-3 font-normal">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="flex items-center gap-2 bg-transparent border border-border text-foreground hover:bg-accent shadow-none"
                            onClick={() => onNavigate(action.page)}
                        >
                            <action.icon className="h-4 w-4" />
                            {action.label}
                        </Button>
                    ))}
                </div>
            </section>

            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* Upcoming Bookings */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 font-normal">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    Upcoming Bookings
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8"
                                    onClick={() => onNavigate("bookings")}
                                >
                                    View All
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingBookings.length > 0 ? (
                                upcomingBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border"
                                    >
                                        <div className="flex-shrink-0 p-2 bg-card rounded border border-border">
                                            <Truck className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="truncate">{booking.item}</p>
                                                <Badge variant="secondary" className="text-xs shrink-0">{booking.type}</Badge>
                                            </div>
                                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {booking.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {booking.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {booking.location}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="shrink-0">Manage</Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    You have no upcoming bookings.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upcoming Volunteer Shifts */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 font-normal">
                                    <Users className="h-4 w-4 text-primary" />
                                    Upcoming Volunteer Shifts
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8"
                                    onClick={() => onNavigate("volunteer")}
                                >
                                    View All
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event) => {
                                    const currentVolunteers = event.volunteers || 0;
                                    const maxVolunteers = event.maxVolunteers || 0;
                                    const progress = maxVolunteers > 0
                                        ? (currentVolunteers / maxVolunteers) * 100
                                        : 0;

                                    return (
                                        <div
                                            key={event.id}
                                            className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border"
                                        >
                                            <div className="flex-shrink-0 p-2 bg-card rounded border border-border">
                                                <Users className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="mb-1 truncate">{event.title}</p>
                                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-2">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {event.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {event.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                        {currentVolunteers}/{maxVolunteers}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="shrink-0">Details</Button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    You have no upcoming volunteer shifts.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Explore / Discover - Compact */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="font-normal">Explore & Discover</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="group cursor-pointer" onClick={() => onNavigate("volunteer")}>
                                    <div className="h-24 overflow-hidden bg-muted rounded-lg mb-2"></div>
                                    <p className="text-sm">Volunteer Opportunities</p>
                                </div>

                                <div className="group cursor-pointer" onClick={() => onNavigate("events")}>
                                    <div className="h-24 overflow-hidden bg-muted rounded-lg mb-2"></div>
                                    <p className="text-sm">Upcoming Workshops</p>
                                </div>

                                <div className="group cursor-pointer" onClick={() => onNavigate("events")}>
                                    <div className="h-24 overflow-hidden bg-muted rounded-lg mb-2"></div>
                                    <p className="text-sm">Community Events</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - More Compact */}
                <aside className="space-y-4">
                    {/* Membership Status */}
                    <Card className="bg-secondary">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base font-normal">
                                <CreditCard className="h-4 w-4 text-primary" />
                                Membership
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Badge className="mb-1.5">Family Plan</Badge>
                                <p className="text-xs text-muted-foreground">Active since June 2025</p>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground text-xs">Next renewal</span>
                                <span className="text-xs">Nov 15, 2025</span>
                            </div>
                            <Button
                                className="w-full"
                                size="sm"
                                variant="outline"
                                onClick={() => onNavigate("membership")}
                            >
                                Manage
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Announcements */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base font-normal">
                                <Megaphone className="h-4 w-4 text-primary" />
                                Community Updates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <div key={announcement.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                                        <p className="mb-1 text-sm">{announcement.title}</p>
                                        <p className="text-xs text-muted-foreground mb-1.5 leading-relaxed line-clamp-2">
                                            {announcement.message}
                                        </p>
                                        <span className="text-xs text-muted-foreground">{announcement.date}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No community updates right now.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}