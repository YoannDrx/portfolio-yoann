/**
 * CVDocument
 * Document PDF principal pour le CV — Dark Sidebar Split Layout
 */

import {
  Document,
  Page,
  View,
  Text,
  Image as PdfImage,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import type { Locale } from '@/i18n/locales';
import {
  getEducation,
  getWorkExperiences,
  getProfile,
  getSoftSkills,
  getTechnicalSkills,
  type Education,
  type WorkExperience,
  type NarrativeSkillCard,
  type Profile,
  type SoftSkillCard,
} from '@/data';
import { pdfColors } from './styles/pdfTheme';

// ── Types ──

type CvLanguage = {
  id: string;
  name: string;
  level: string;
};

type CvInterest = {
  id: string;
  title: string;
  detail?: string;
};

type CvLabels = {
  present: string;
  sectionTitles: {
    experiences: string;
    skills: string;
    education: string;
    languages: string;
    interests: string;
    softSkills: string;
  };
  availability: string;
  document: {
    title: string;
    subject: string;
  };
  employmentTypes: Record<string, string>;
  languages: CvLanguage[];
  interests: CvInterest[];
  contact: string;
};

const cvLabelsByLocale: Record<Locale, CvLabels> = {
  fr: {
    present: 'Présent',
    sectionTitles: {
      experiences: 'Expériences',
      skills: 'Compétences',
      education: 'Formation',
      languages: 'Langues',
      interests: 'Centres d\'intérêt',
      softSkills: 'Soft Skills',
    },
    availability: 'Disponible',
    contact: 'Contact',
    document: {
      title: 'CV Yoann Andrieux - Dev React Native',
      subject: 'CV Développeur React Native',
    },
    employmentTypes: {
      cdi: 'CDI',
      freelance: 'Freelance',
      independant: 'Indep.',
      cdd: 'CDD',
      intermittent: 'Intermittent',
    },
    languages: [
      { id: 'fr', name: 'Français', level: 'Natif' },
      { id: 'en', name: 'Anglais', level: 'Professionnel' },
    ],
    interests: [
      { id: 'music', title: 'Musique', detail: 'Bassiste pro' },
      { id: 'running', title: 'Running' },
      { id: 'nature', title: 'Nature & randonnée' },
      { id: 'travel', title: 'Voyage & culture' },
    ],
  },
  en: {
    present: 'Present',
    sectionTitles: {
      experiences: 'Experience',
      skills: 'Skills',
      education: 'Education',
      languages: 'Languages',
      interests: 'Interests',
      softSkills: 'Soft Skills',
    },
    availability: 'Available',
    contact: 'Contact',
    document: {
      title: 'Resume Yoann Andrieux - React Native Developer',
      subject: 'Resume — React Native Developer',
    },
    employmentTypes: {
      cdi: 'Full-time',
      freelance: 'Freelance',
      independant: 'Self-employed',
      cdd: 'Fixed-term',
      intermittent: 'Intermittent',
    },
    languages: [
      { id: 'fr', name: 'French', level: 'Native' },
      { id: 'en', name: 'English', level: 'Professional' },
    ],
    interests: [
      { id: 'music', title: 'Music', detail: 'Professional bassist' },
      { id: 'running', title: 'Running' },
      { id: 'nature', title: 'Nature & hiking' },
      { id: 'travel', title: 'Travel & culture' },
    ],
  },
};

function getCvLabels(locale: Locale): CvLabels {
  return cvLabelsByLocale[locale] ?? cvLabelsByLocale.fr;
}

const getEmploymentTypeLabel = (type: string, locale: Locale) => {
  const { employmentTypes } = getCvLabels(locale);
  return employmentTypes[type] || type;
};

const getBadgeColors = (type: string) => {
  if (type === 'cdi') return { bg: '#D1FAE5', text: '#059669' };
  if (type === 'freelance') return { bg: '#DBEAFE', text: '#2563EB' };
  return { bg: '#E5E5EA', text: '#8E8E93' };
};

const getLevelStars = (level: string, skillId?: string) => {
  const baseLevel: Record<string, number> = {
    Expert: 5,
    Avance: 4,
    Avancé: 4,
    Confirme: 3,
    Confirmé: 3,
    Intermediaire: 2,
    Intermédiaire: 2,
    Advanced: 4,
    Proficient: 3,
    Intermediate: 2,
  };
  const stars = baseLevel[level] || 3;
  if (skillId === 'react-native') return Math.min(stars + 1, 5);
  return stars;
};

const getAccentColor = (type: string) => {
  return type === 'cdi' ? pdfColors.experience.cdi : pdfColors.experience.freelance;
};

// ── Styles ──

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    backgroundColor: '#FFFFFF',
  },
  accentLine: {
    height: 3,
    backgroundColor: pdfColors.sidebar.accentLine,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },

  // ── SIDEBAR ──
  sidebar: {
    width: 185,
    backgroundColor: pdfColors.sidebar.bg,
    padding: 18,
    paddingTop: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    objectFit: 'cover',
  },
  sidebarName: {
    fontSize: 16,
    fontWeight: 700,
    color: pdfColors.sidebar.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  sidebarTitle: {
    fontSize: 10,
    color: pdfColors.sidebar.accent,
    textAlign: 'center',
    marginBottom: 4,
  },
  sidebarSubtitle: {
    fontSize: 7,
    color: pdfColors.sidebar.muted,
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: pdfColors.sidebar.divider,
    marginVertical: 10,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: pdfColors.sidebar.text,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sidebarLabel: {
    fontSize: 7,
    color: pdfColors.sidebar.muted,
    marginBottom: 2,
  },
  sidebarValue: {
    fontSize: 7,
    color: pdfColors.sidebar.text,
    marginBottom: 6,
  },
  // Progress bars
  progressContainer: {
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 7,
    color: pdfColors.sidebar.text,
    marginBottom: 3,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    flexDirection: 'row',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: pdfColors.sidebar.accent,
    borderRadius: 2,
  },
  // Education
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 7,
    fontWeight: 700,
    color: pdfColors.sidebar.text,
  },
  eduSchool: {
    fontSize: 6.5,
    color: pdfColors.sidebar.muted,
  },
  eduYear: {
    fontSize: 6.5,
    color: pdfColors.sidebar.accent,
  },
  // Languages
  langItem: {
    marginBottom: 4,
  },
  langName: {
    fontSize: 7,
    fontWeight: 700,
    color: pdfColors.sidebar.text,
  },
  langLevel: {
    fontSize: 7,
    color: pdfColors.sidebar.muted,
  },
  // Interests
  interestItem: {
    marginBottom: 3,
  },
  interestTitle: {
    fontSize: 7,
    color: pdfColors.sidebar.text,
  },
  interestDetail: {
    fontSize: 6.5,
    color: pdfColors.sidebar.muted,
  },
  // Available badge
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
    paddingTop: 10,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  availableText: {
    fontSize: 7,
    fontWeight: 700,
    color: '#10B981',
  },

  // ── MAIN CONTENT ──
  main: {
    flex: 1,
    padding: 18,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0F172A',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sectionTitleBar: {
    width: 30,
    height: 2,
    backgroundColor: pdfColors.sidebar.accentLine,
    marginBottom: 10,
    borderRadius: 1,
  },
  // Experience cards
  expCard: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  expAccentBar: {
    width: 2,
    borderRadius: 1,
    marginRight: 8,
  },
  expContent: {
    flex: 1,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 8.5,
    fontWeight: 700,
    color: '#0F172A',
  },
  expBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  expBadgeText: {
    fontSize: 5.5,
    fontWeight: 700,
  },
  expDate: {
    fontSize: 6.5,
    color: '#64748B',
  },
  expRole: {
    fontSize: 7.5,
    color: pdfColors.sidebar.accentLine,
    fontWeight: 700,
    marginBottom: 1,
  },
  expMeta: {
    fontSize: 6.5,
    color: '#94A3B8',
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 6.5,
    color: '#475569',
    marginBottom: 1,
    lineHeight: 1.3,
  },
  expSkillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 2,
  },
  expSkillPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  expSkillPillText: {
    fontSize: 5.5,
    color: '#475569',
  },
  // Soft skills
  softGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  softCard: {
    width: '47%',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  softTitle: {
    fontSize: 7,
    fontWeight: 700,
    color: '#0F172A',
    marginBottom: 3,
  },
  softNarrative: {
    fontSize: 5.5,
    color: '#64748B',
    lineHeight: 1.3,
  },
  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#E2E8F0',
  },
  footerLink: {
    fontSize: 7,
    color: pdfColors.sidebar.accentLine,
  },
});

// ── Components ──

type SidebarProps = {
  profile: Profile;
  skills: NarrativeSkillCard[];
  education: Education[];
  labels: CvLabels;
};

const Sidebar = ({ profile, skills, education, labels }: SidebarProps) => (
  <View style={s.sidebar}>
    {/* Avatar */}
    <View style={s.avatarContainer}>
      <PdfImage src="/images/avatar.jpg" style={s.avatar} />
    </View>

    {/* Name */}
    <Text style={s.sidebarName}>{profile.firstName}</Text>
    <Text style={s.sidebarName}>{profile.lastName}</Text>
    <Text style={s.sidebarTitle}>{profile.title}</Text>
    <Text style={s.sidebarSubtitle}>{profile.subtitle}</Text>

    {/* Contact */}
    <View style={s.divider} />
    <Text style={s.sidebarSectionTitle}>{labels.contact}</Text>
    <Text style={s.sidebarLabel}>Email</Text>
    <Text style={s.sidebarValue}>yoann.andrieux@gmail.com</Text>
    <Text style={s.sidebarLabel}>Tel</Text>
    <Text style={s.sidebarValue}>+33 6 63 43 46 65</Text>

    {/* Skills with progress bars */}
    <View style={s.divider} />
    <Text style={s.sidebarSectionTitle}>{labels.sectionTitles.skills}</Text>
    {skills.map((skill) => {
      const stars = getLevelStars(skill.level, skill.id);
      const percentage = (stars / 5) * 100;
      return (
        <View key={skill.id} style={s.progressContainer}>
          <Text style={s.progressLabel}>{skill.title}</Text>
          <View style={s.progressBarBg}>
            <View style={[s.progressBarFill, { width: `${percentage}%` }]} />
          </View>
        </View>
      );
    })}

    {/* Education */}
    <View style={s.divider} />
    <Text style={s.sidebarSectionTitle}>{labels.sectionTitles.education}</Text>
    {education.map((edu) => (
      <View key={edu.id} style={s.eduItem}>
        <Text style={s.eduDegree}>{edu.degree}</Text>
        <Text style={s.eduSchool}>{edu.school}</Text>
        <Text style={s.eduYear}>{edu.year}</Text>
      </View>
    ))}

    {/* Languages */}
    <View style={s.divider} />
    <Text style={s.sidebarSectionTitle}>{labels.sectionTitles.languages}</Text>
    {labels.languages.map((lang) => (
      <View key={lang.id} style={s.langItem}>
        <Text style={s.langName}>
          {lang.name} <Text style={s.langLevel}>{lang.level}</Text>
        </Text>
      </View>
    ))}

    {/* Interests */}
    <View style={s.divider} />
    <Text style={s.sidebarSectionTitle}>{labels.sectionTitles.interests}</Text>
    {labels.interests.map((interest) => (
      <View key={interest.id} style={s.interestItem}>
        <Text style={s.interestTitle}>{interest.title}</Text>
        {interest.detail && <Text style={s.interestDetail}>{interest.detail}</Text>}
      </View>
    ))}

    {/* Available badge */}
    <View style={s.availableBadge}>
      <View style={s.greenDot} />
      <Text style={s.availableText}>{labels.availability}</Text>
    </View>
  </View>
);

type ExperienceCardProps = {
  exp: WorkExperience;
  locale: Locale;
  presentLabel: string;
};

const ExperienceCard = ({ exp, locale, presentLabel }: ExperienceCardProps) => {
  const badgeColors = getBadgeColors(exp.type);
  const accentColor = getAccentColor(exp.type);
  const isCdi = exp.type === 'cdi';
  const remoteLabel =
    exp.remote === 'remote' ? ' · Remote' : exp.remote === 'hybrid' ? ' · Hybride' : '';

  return (
    <View style={s.expCard} wrap={false}>
      {/* Accent bar */}
      <View style={[s.expAccentBar, { backgroundColor: accentColor }]} />

      <View style={s.expContent}>
        {/* Header: company + badge */}
        <View style={s.expHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={s.expCompany}>{exp.company}</Text>
            <View style={[s.expBadge, { backgroundColor: badgeColors.bg }]}>
              <Text style={[s.expBadgeText, { color: badgeColors.text }]}>
                {getEmploymentTypeLabel(exp.type, locale)}
              </Text>
            </View>
          </View>
          <Text style={s.expDate}>
            {exp.startDate} - {exp.endDate || presentLabel}
          </Text>
        </View>

        {/* Role */}
        <Text style={s.expRole}>{exp.role}</Text>

        {/* Meta */}
        <Text style={s.expMeta}>
          {exp.location}{remoteLabel}
        </Text>

        {/* Descriptions for CDI only (up to 2) */}
        {isCdi &&
          exp.description.slice(0, 2).map((desc, i) => (
            <Text key={i} style={s.expDesc}>
              {'• '}{desc}
            </Text>
          ))}

        {/* Tech pills */}
        <View style={s.expSkillsRow}>
          {exp.skills.slice(0, 5).map((skill) => (
            <View key={skill} style={s.expSkillPill}>
              <Text style={s.expSkillPillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

type SoftSkillsGridProps = {
  softSkills: SoftSkillCard[];
  title: string;
};

const SoftSkillsGrid = ({ softSkills, title }: SoftSkillsGridProps) => (
  <View>
    <Text style={s.sectionTitle}>{title}</Text>
    <View style={s.sectionTitleBar} />
    <View style={s.softGrid}>
      {softSkills.map((skill) => {
        const shortNarrative = skill.narrative.split('.')[0] + '.';
        return (
          <View key={skill.id} style={s.softCard}>
            <Text style={s.softTitle}>{skill.title}</Text>
            <Text style={s.softNarrative}>{shortNarrative}</Text>
          </View>
        );
      })}
    </View>
  </View>
);

const MainFooter = () => (
  <View style={s.footer}>
    <Link src="https://www.linkedin.com/in/yoann-andrieux/" style={s.footerLink}>
      LinkedIn
    </Link>
    <Link src="https://github.com/YoannDrx" style={s.footerLink}>
      GitHub
    </Link>
    <Link src="https://www.malt.fr/profile/yoannandrieux" style={s.footerLink}>
      Malt
    </Link>
  </View>
);

// ── Main Document ──

type CVDocumentProps = {
  locale?: Locale;
};

const CVDocument = ({ locale = 'fr' }: CVDocumentProps) => {
  const labels = getCvLabels(locale);
  const profile = getProfile(locale);
  const experiences = getWorkExperiences(locale);
  const education = getEducation(locale);
  const technicalSkills = getTechnicalSkills(locale);
  const softSkills = getSoftSkills(locale);

  return (
    <Document
      title={labels.document.title}
      author="Yoann Andrieux"
      subject={labels.document.subject}
      keywords="React Native, React, Next.js, TypeScript, Mobile, Web"
    >
      <Page size="A4" style={s.page}>
        {/* Accent line top */}
        <View style={s.accentLine} />

        <View style={s.container}>
          {/* Left sidebar */}
          <Sidebar
            profile={profile}
            skills={technicalSkills}
            education={education}
            labels={labels}
          />

          {/* Right main content */}
          <View style={s.main}>
            {/* Experiences */}
            <Text style={s.sectionTitle}>{labels.sectionTitles.experiences}</Text>
            <View style={s.sectionTitleBar} />
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                locale={locale}
                presentLabel={labels.present}
              />
            ))}

            {/* Soft Skills */}
            <SoftSkillsGrid softSkills={softSkills} title={labels.sectionTitles.softSkills} />

            {/* Footer */}
            <MainFooter />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
