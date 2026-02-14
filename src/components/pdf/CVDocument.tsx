/**
 * CVDocument
 * Document PDF principal pour le CV
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
import { pdfColors, pdfFontSizes, pdfSpacing } from './styles/pdfTheme';

// Helpers
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
  };
  availability: string;
  document: {
    title: string;
    subject: string;
  };
  employmentTypes: Record<string, string>;
  languages: CvLanguage[];
  interests: CvInterest[];
};

const cvLabelsByLocale: Record<Locale, CvLabels> = {
  fr: {
    present: 'Présent',
    sectionTitles: {
      experiences: 'Expériences',
      skills: 'Compétences',
      education: 'Formation',
      languages: 'Langues',
      interests: 'Intérêts',
    },
    availability: 'Disponible',
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
    },
    availability: 'Available',
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
  return (
    pdfColors.badge[type as keyof typeof pdfColors.badge] || {
      bg: '#E5E5EA',
      text: '#8E8E93',
    }
  );
};

const getLevelStars = (level: string, skillId?: string) => {
  // Override pour React Native : +1 point
  const baseLevel: Record<string, number> = {
    Expert: 5,
    Avance: 4,
    Avancé: 4,
    Confirme: 3,
    Confirmé: 3,
    Intermediaire: 2,
    Intermédiaire: 2,
  };
  const stars = baseLevel[level] || 3;
  // React Native : ajouter 1 point
  if (skillId === 'react-native') return Math.min(stars + 1, 5);
  return stars;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: pdfFontSizes.base,
    backgroundColor: pdfColors.glass.background,
    padding: pdfSpacing['2xl'],
    paddingBottom: pdfSpacing.lg,
  },

  // Header
  header: {
    flexDirection: 'row',
    marginBottom: pdfSpacing.md,
    backgroundColor: pdfColors.glass.card,
    borderRadius: 12,
    padding: pdfSpacing.lg,
    borderWidth: 1,
    borderColor: pdfColors.glass.border,
  },
  avatarContainer: {
    width: 85,
    height: 85,
    marginRight: pdfSpacing.lg,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    objectFit: 'cover',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: pdfFontSizes['2xl'],
    fontWeight: 700,
    color: pdfColors.text.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: pdfFontSizes.lg,
    fontWeight: 600,
    color: pdfColors.iosBlue,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: pdfFontSizes.sm,
    color: pdfColors.text.secondary,
    marginBottom: pdfSpacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: pdfSpacing.md,
    marginBottom: pdfSpacing.sm,
  },
  contactItem: {
    fontSize: pdfFontSizes.xs,
    color: pdfColors.text.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: pdfSpacing.sm,
    marginTop: pdfSpacing.xs,
  },
  statBadge: {
    backgroundColor: pdfColors.iosBlue + '15',
    paddingHorizontal: pdfSpacing.sm,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statText: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 600,
    color: pdfColors.iosBlue,
  },
  bio: {
    fontSize: pdfFontSizes.xs,
    color: pdfColors.text.secondary,
    lineHeight: 1.4,
    marginTop: pdfSpacing.xs,
  },

  // Main layout
  mainContainer: {
    flexDirection: 'row',
    gap: pdfSpacing.lg,
  },
  mainColumn: {
    flex: 1,
  },
  sidebar: {
    width: 150,
  },

  // Section
  section: {
    marginBottom: pdfSpacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pdfSpacing.sm,
  },
  sectionIcon: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: pdfSpacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: pdfFontSizes.md,
    fontWeight: 700,
    color: pdfColors.text.primary,
  },

  // Experience
  experienceCard: {
    backgroundColor: pdfColors.glass.card,
    borderRadius: 8,
    padding: pdfSpacing.sm,
    marginBottom: pdfSpacing.xs,
    borderWidth: 1,
    borderColor: pdfColors.glass.border,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  companyName: {
    fontSize: pdfFontSizes.sm,
    fontWeight: 600,
    color: pdfColors.text.primary,
  },
  role: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 500,
    color: pdfColors.iosBlue,
    marginBottom: 2,
  },
  experienceMeta: {
    flexDirection: 'row',
    gap: pdfSpacing.md,
    marginBottom: 3,
  },
  metaText: {
    fontSize: pdfFontSizes.xs,
    color: pdfColors.text.secondary,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 6,
    fontWeight: 600,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  skillPill: {
    backgroundColor: pdfColors.glass.background,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  skillPillText: {
    fontSize: 6,
    color: pdfColors.text.secondary,
  },

  // Skills
  skillItem: {
    marginBottom: pdfSpacing.sm,
  },
  skillName: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 500,
    color: pdfColors.text.primary,
    marginBottom: 2,
  },
  skillLevel: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  starFilled: {
    backgroundColor: pdfColors.iosBlue,
  },
  starEmpty: {
    backgroundColor: pdfColors.glass.border,
  },

  // Education
  educationCard: {
    backgroundColor: pdfColors.glass.card,
    borderRadius: 6,
    padding: pdfSpacing.sm,
    marginBottom: pdfSpacing.xs,
    borderWidth: 1,
    borderColor: pdfColors.glass.border,
  },
  educationDegree: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 600,
    color: pdfColors.text.primary,
    marginBottom: 1,
  },
  educationSchool: {
    fontSize: 7,
    color: pdfColors.text.secondary,
  },
  educationYear: {
    fontSize: 7,
    fontWeight: 500,
    color: pdfColors.iosPurple,
  },

  // Soft Skills (cards dans colonne principale)
  softSkillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: pdfSpacing.sm,
  },
  softSkillCard: {
    width: '48%',
    backgroundColor: pdfColors.glass.card,
    borderRadius: 8,
    padding: pdfSpacing.sm,
    borderWidth: 1,
    borderColor: pdfColors.glass.border,
  },
  softSkillHeader: {
    marginBottom: 4,
  },
  softSkillTitle: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 600,
    color: pdfColors.text.primary,
  },
  softSkillNarrative: {
    fontSize: 6,
    color: pdfColors.text.secondary,
    lineHeight: 1.35,
  },

  // Languages
  languageItem: {
    marginBottom: 4,
  },
  languageName: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 600,
    color: pdfColors.text.primary,
  },
  languageLevel: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 400,
    color: pdfColors.text.secondary,
  },

  // Interests
  interestItem: {
    marginBottom: 4,
  },
  interestTitle: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 600,
    color: pdfColors.text.primary,
  },
  interestDetail: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 400,
    color: pdfColors.text.secondary,
    marginTop: 1,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: pdfSpacing.md,
    borderTopWidth: 1,
    borderTopColor: pdfColors.glass.border,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: pdfSpacing.lg,
  },
  footerLink: {
    fontSize: pdfFontSizes.xs,
    color: pdfColors.iosBlue,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: pdfColors.iosGreen + '20',
    paddingHorizontal: pdfSpacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: pdfColors.iosGreen,
  },
  availableText: {
    fontSize: pdfFontSizes.xs,
    fontWeight: 500,
    color: pdfColors.iosGreen,
  },
});

type CVDocumentProps = {
  locale?: Locale;
};

type HeaderProps = {
  profile: Profile;
};

const Header = ({ profile }: HeaderProps) => (
  <View style={styles.header}>
    <View style={styles.avatarContainer}>
      <PdfImage src="/images/avatar.jpg" style={styles.avatar} />
    </View>
    <View style={styles.headerInfo}>
      <Text style={styles.name}>
        {profile.firstName} {profile.lastName}
      </Text>
      <Text style={styles.title}>{profile.title}</Text>
      <Text style={styles.subtitle}>{profile.subtitle}</Text>

      <View style={styles.contactRow}>
        <Text style={styles.contactItem}>yoann.andrieux@gmail.com</Text>
        <Text style={styles.contactItem}>+33 6 63 43 46 65</Text>
      </View>

      <View style={styles.statsRow}>
        {profile.stats.map((stat) => (
          <View key={stat.label} style={styles.statBadge}>
            <Text style={styles.statText}>
              {stat.value} {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.bio}>{profile.bio}</Text>
    </View>
  </View>
);

type ExperienceItemProps = {
  exp: WorkExperience;
  locale: Locale;
  presentLabel: string;
};

const ExperienceItem = ({ exp, locale, presentLabel }: ExperienceItemProps) => {
  const badgeColors = getBadgeColors(exp.type);

  return (
    <View style={styles.experienceCard}>
      <View style={styles.experienceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.companyName}>{exp.company}</Text>
          <Text style={styles.role}>{exp.role}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
          <Text style={[styles.badgeText, { color: badgeColors.text }]}>
            {getEmploymentTypeLabel(exp.type, locale)}
          </Text>
        </View>
      </View>

      <View style={styles.experienceMeta}>
        <Text style={styles.metaText}>
          {exp.startDate} - {exp.endDate || presentLabel}
        </Text>
        <Text style={styles.metaText}>{exp.location}</Text>
      </View>

      <View style={styles.skillsRow}>
        {exp.skills.slice(0, 4).map((skill) => (
          <View key={skill} style={styles.skillPill}>
            <Text style={styles.skillPillText}>{skill}</Text>
          </View>
        ))}
        {exp.skills.length > 4 && (
          <View style={styles.skillPill}>
            <Text style={styles.skillPillText}>+{exp.skills.length - 4}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

type ExperiencesSectionProps = {
  experiences: WorkExperience[];
  locale: Locale;
  presentLabel: string;
  title: string;
};

const ExperiencesSection = ({
  experiences,
  locale,
  presentLabel,
  title,
}: ExperiencesSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: pdfColors.iosBlue }]}>
        <Text style={{ color: 'white', fontSize: 10 }}>E</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {experiences.map((exp) => (
      <ExperienceItem
        key={exp.id}
        exp={exp}
        locale={locale}
        presentLabel={presentLabel}
      />
    ))}
  </View>
);

type SoftSkillsSectionProps = {
  softSkills: SoftSkillCard[];
};

const SoftSkillsSection = ({ softSkills }: SoftSkillsSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: pdfColors.iosOrange }]}>
        <Text style={{ color: 'white', fontSize: 10 }}>S</Text>
      </View>
      <Text style={styles.sectionTitle}>Soft Skills</Text>
    </View>
    <View style={styles.softSkillsGrid}>
      {softSkills.map((skill) => (
        <View key={skill.id} style={styles.softSkillCard}>
          <View style={styles.softSkillHeader}>
            <Text style={styles.softSkillTitle}>{skill.title}</Text>
          </View>
          <Text style={styles.softSkillNarrative}>{skill.narrative}</Text>
        </View>
      ))}
    </View>
  </View>
);

type SkillsSectionProps = {
  skills: NarrativeSkillCard[];
  title: string;
};

const SkillsSection = ({ skills, title }: SkillsSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: pdfColors.iosTeal }]}>
        <Text style={{ color: 'white', fontSize: 10 }}>C</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {skills.map((skill) => {
      const stars = getLevelStars(skill.level, skill.id);
      return (
        <View key={skill.id} style={styles.skillItem}>
          <Text style={styles.skillName}>{skill.title}</Text>
          <View style={styles.skillLevel}>
            {[1, 2, 3, 4, 5].map((i) => (
              <View
                key={i}
                style={[
                  styles.star,
                  i <= stars ? styles.starFilled : styles.starEmpty,
                ]}
              />
            ))}
          </View>
        </View>
      );
    })}
  </View>
);

type EducationSectionProps = {
  education: Education[];
  title: string;
};

const EducationSection = ({ education, title }: EducationSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: pdfColors.iosPurple }]}>
        <Text style={{ color: 'white', fontSize: 10 }}>F</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {education.map((edu) => (
      <View key={edu.id} style={styles.educationCard}>
        <Text style={styles.educationDegree}>{edu.degree}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.educationSchool}>{edu.school}</Text>
          <Text style={styles.educationYear}>{edu.year}</Text>
        </View>
      </View>
    ))}
  </View>
);

type LanguagesSectionProps = {
  languages: CvLanguage[];
  title: string;
};

const LanguagesSection = ({ languages, title }: LanguagesSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: pdfColors.iosIndigo }]}>
        <Text style={{ color: 'white', fontSize: 10 }}>L</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {languages.map((lang) => (
      <View key={lang.id} style={styles.languageItem}>
        <Text style={styles.languageName}>
          {lang.name} <Text style={styles.languageLevel}>• {lang.level}</Text>
        </Text>
      </View>
    ))}
  </View>
);

type InterestsSectionProps = {
  interests: CvInterest[];
  title: string;
};

const InterestsSection = ({ interests, title }: InterestsSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: pdfColors.iosPink }]}>
        <Text style={{ color: 'white', fontSize: 10 }}>I</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {interests.map((interest) => (
      <View key={interest.id} style={styles.interestItem}>
        <Text style={styles.interestTitle}>{interest.title}</Text>
        {interest.detail && <Text style={styles.interestDetail}>{interest.detail}</Text>}
      </View>
    ))}
  </View>
);

type FooterProps = {
  availabilityLabel: string;
};

const Footer = ({ availabilityLabel }: FooterProps) => (
  <View style={styles.footer}>
    <View style={styles.footerLinks}>
      <Link src="https://www.linkedin.com/in/yoann-andrieux/" style={styles.footerLink}>
        LinkedIn
      </Link>
      <Link src="https://github.com/YoannDrx" style={styles.footerLink}>
        GitHub
      </Link>
      <Link src="https://www.malt.fr/profile/yoannandrieux" style={styles.footerLink}>
        Malt
      </Link>
    </View>
    <View style={styles.availableBadge}>
      <View style={styles.greenDot} />
      <Text style={styles.availableText}>{availabilityLabel}</Text>
    </View>
  </View>
);

// Document principal
const CVDocument = ({ locale = 'fr' }: CVDocumentProps) => {
  const labels = getCvLabels(locale);

  const profile = getProfile(locale);
  const experiences = getWorkExperiences(locale).slice(0, 7);
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
      <Page size="A4" style={styles.page}>
        <Header profile={profile} />

        <View style={styles.mainContainer}>
          {/* Colonne principale - Expériences + Soft Skills */}
          <View style={styles.mainColumn}>
            <ExperiencesSection
              experiences={experiences}
              locale={locale}
              presentLabel={labels.present}
              title={labels.sectionTitles.experiences}
            />
            <SoftSkillsSection softSkills={softSkills} />
          </View>

          {/* Sidebar - Compétences, Formation, Langues, Intérêts */}
          <View style={styles.sidebar}>
            <SkillsSection skills={technicalSkills} title={labels.sectionTitles.skills} />
            <EducationSection education={education} title={labels.sectionTitles.education} />
            <LanguagesSection languages={labels.languages} title={labels.sectionTitles.languages} />
            <InterestsSection interests={labels.interests} title={labels.sectionTitles.interests} />
          </View>
        </View>

        <Footer availabilityLabel={labels.availability} />
      </Page>
    </Document>
  );
};

export default CVDocument;
