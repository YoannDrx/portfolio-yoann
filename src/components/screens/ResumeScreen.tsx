/**
 * ResumeScreen
 * Écran affichant le CV avec expériences et formations
 */

'use client';

import dynamic from 'next/dynamic';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSBadge, IOSNavigationBar, IOSButton } from '../ios';
import { getEducation, getWorkExperiences, getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import { Briefcase, GraduationCap, MapPin, ExternalLink, Download } from 'lucide-react';

// Lazy loading du bouton PDF
const PDFDownloadButton = dynamic(() => import('../pdf/PDFDownloadButton'), {
  ssr: false,
  loading: () => (
    <IOSButton variant="ghost" size="sm" disabled>
      <Download className="w-4 h-4" />
      PDF
    </IOSButton>
  ),
});

const getEmploymentTypeLabel = (type: string, locale: string) => {
  const labels: Record<string, { fr: string; en: string }> = {
    cdi: { fr: 'CDI', en: 'Full-time' },
    freelance: { fr: 'Freelance', en: 'Freelance' },
    independant: { fr: 'Indépendant', en: 'Independent' },
    cdd: { fr: 'CDD', en: 'Fixed-term' },
    intermittent: { fr: 'Intermittent', en: 'Intermittent' },
  };
  const fallback = labels[type] ? (locale === 'en' ? labels[type].en : labels[type].fr) : type;
  return fallback;
};

const getEmploymentTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    cdi: 'bg-green-500/20 text-green-600',
    freelance: 'bg-blue-500/20 text-blue-600',
    independant: 'bg-purple-500/20 text-purple-600',
    cdd: 'bg-orange-500/20 text-orange-600',
    intermittent: 'bg-pink-500/20 text-pink-600',
  };
  return colors[type] || 'bg-gray-500/20 text-gray-600';
};

interface ResumeScreenProps {
  hideStatusBar?: boolean;
}

const ResumeScreen = ({ hideStatusBar = false }: ResumeScreenProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const experiences = getWorkExperiences(locale);
  const education = getEducation(locale);

  // Filtrer les expériences de développement (les 9 premières, sans Cyclofix)
  const devExperiences = experiences.slice(0, 9);

  return (
    <div className="h-full bg-background flex flex-col">
      {!hideStatusBar && <StatusBar />}

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
	        <IOSNavigationBar
	          title={uiTexts.nav.resume}
	          subtitle={uiTexts.sections.experienceAndEducation}
	          rightAction={<PDFDownloadButton />}
        />

        {/* Experience Section */}
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
	            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
	              <Briefcase className="w-4 h-4 text-white" />
	            </div>
	            <h2 className="text-lg font-semibold text-foreground">
	              {uiTexts.sections.experience}
	            </h2>
          </div>

          {/* Timeline */}
          <div className="relative stagger-children">
            {/* Timeline line */}
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent" />

            <div className="space-y-4">
              {devExperiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white shadow-sm" />

                  <IOSCard variant="glass" padding="sm">
                    <div className="space-y-2">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm">
                            {exp.company}
                          </h3>
                          <p className="text-xs text-primary font-medium">
                            {exp.role}
                          </p>
                        </div>
	                        <IOSBadge
	                          variant="default"
	                          size="sm"
	                          className={getEmploymentTypeColor(exp.type)}
	                        >
	                          {getEmploymentTypeLabel(exp.type, locale)}
	                        </IOSBadge>
                      </div>

                      {/* Date & Location */}
	                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
	                        <span className="font-medium">
	                          {exp.startDate} → {exp.endDate || uiTexts.labels.present}
	                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[10px] font-medium bg-muted rounded-full text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                        {exp.skills.length > 4 && (
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-muted rounded-full text-muted-foreground">
                            +{exp.skills.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Link */}
	                      {exp.url && (
	                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
	                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
	                        >
	                          <ExternalLink className="w-3 h-3" />
	                          {uiTexts.buttons.viewWebsite}
	                        </a>
	                      )}
                    </div>
                  </IOSCard>
                </div>
              ))}
            </div>
          </div>
        </div>

	        {/* Formation Section */}
	        <div className="px-5 mb-6">
	          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
	            <h2 className="text-lg font-semibold text-foreground">
	              {uiTexts.sections.education}
	            </h2>
          </div>

          <div className="space-y-3 stagger-children">
            {education.map((edu) => (
              <IOSCard key={edu.id} variant="glass" padding="sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {edu.degree}
                      </h3>
                      <IOSBadge variant="default" size="sm" className="bg-muted text-muted-foreground flex-shrink-0">
                        {edu.year}
                      </IOSBadge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      @{edu.school}
                    </p>
                  </div>
                </div>
              </IOSCard>
            ))}
          </div>
        </div>

	        {/* Availability Badge */}
	        <div className="px-5 mt-6 mb-4">
	          <IOSCard variant="elevated" padding="sm">
	            <div className="flex items-center gap-3">
	              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
	              <span className="text-sm font-medium text-foreground">
	                {uiTexts.labels.availableForProjects}
	              </span>
	            </div>
	          </IOSCard>
	        </div>
      </div>
    </div>
  );
};

export default ResumeScreen;
