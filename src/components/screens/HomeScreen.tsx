/**
 * HomeScreen
 * Écran d'accueil du portfolio avec présentation et navigation
 */

import { Sparkles } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSAvatar, IOSListItem, IOSBadge } from '../ios';
import { profile, navigationItems } from '@/data';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="h-full bg-background flex flex-col">
      <StatusBar />

      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {/* Hero Section */}
        <div className="pt-4 animate-ios-spring">
          <div className="relative">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse-soft" />
                <IOSAvatar
                  initials={profile.initials}
                  src={profile.avatar}
                  size="2xl"
                  status="online"
                  statusIcon={<Sparkles className="w-4 h-4 text-white" />}
                />
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center space-y-2">
              <h1 className="ios-nav-title-large">
                {profile.firstName} {profile.lastName}
              </h1>
              <h2 className="text-xl font-semibold text-primary">{profile.title}</h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8 stagger-children">
          {profile.stats.map((stat) => (
            <IOSCard key={stat.label} variant="glass" padding="md" className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </IOSCard>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-8 space-y-3 stagger-children">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Explorer
          </h3>

          {navigationItems.map((item) => (
            <IOSCard
              key={item.id}
              variant="glass"
              padding="md"
              interactive
              onPress={() => onNavigate(item.id)}
            >
              <IOSListItem
                title={item.label}
                subtitle={item.subtitle}
                leftIcon={
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </div>
                }
                showChevron
                className="p-0 bg-transparent"
              />
            </IOSCard>
          ))}
        </div>

        {/* Availability Badge */}
        {profile.isAvailable && (
          <div className="mt-8 flex justify-center">
            <IOSBadge variant="success" size="lg" dot className="px-4 py-2">
              {profile.availabilityText}
            </IOSBadge>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
