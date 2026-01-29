export type ProjectCategory = 'backend' | 'frontend' | 'mobile' | 'crm' | 'mcp';

export interface ProjectDetail {
    id: string;
    name: string;
    company: string;
    technologies: string[];
    url: string;
    image: string;
    description?: string;
    category: ProjectCategory;
    type: 'corporate' | 'crm' | 'ecommerce';
}

// Category configuration with icons and colors
export const PROJECT_CATEGORIES = [
    { id: 'frontend', icon: 'layout', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'backend', icon: 'server', gradient: 'from-purple-500 to-pink-500' },
    { id: 'mobile', icon: 'smartphone', gradient: 'from-green-500 to-emerald-500' },
    { id: 'crm', icon: 'users', gradient: 'from-orange-500 to-amber-500' },
    { id: 'mcp', icon: 'cpu', gradient: 'from-rose-500 to-red-500' },
] as const;

export const PROJECT_DETAILS: ProjectDetail[] = [
    // Frontend Projects
    {
        id: 'erdemli',
        name: 'Erdemli Mimarlık',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: 'https://www.erdemlimimarlik.com/',
        image: '/project-images/project-web/ErdemliMimarlik.jpg',
        description: 'Modern mimarlık hizmetleri sunan kurumsal web sitesi',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'ege',
        name: 'Ege Mimarlık',
        company: 'SyconX',
        technologies: ['React', 'Next.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/EgeMimarlik.jpg',
        description: 'Profesyonel mimarlık ve tasarım hizmetleri',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'eje',
        name: 'Eje Studio',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'SCSS'],
        url: '#',
        image: '/project-images/project-web/EjeStudio.jpg',
        description: 'Kreatif tasarım stüdyosu web sitesi',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'delta',
        name: 'Delta Fidancılık',
        company: 'SyconX',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/DeltaFidancilik.jpg',
        description: 'Fidancılık ve peyzaj hizmetleri platformu',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'saner',
        name: 'Saner Konutları',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/SanerKonutlari.jpg',
        description: 'Gayrimenkul ve konut projeleri sitesi',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'savuncell',
        name: 'Savuncell',
        company: 'SyconX',
        technologies: ['React', 'Next.js', 'Styled Components'],
        url: '#',
        image: '/project-images/project-web/Savuncell.jpg',
        description: 'Teknoloji ve inovasyon odaklı platform',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'turanlar',
        name: 'Turanlar Holding',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Bootstrap'],
        url: '#',
        image: '/project-images/project-web/TuranlarHolding.jpg',
        description: 'Holding şirketi kurumsal web sitesi',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'ykt',
        name: 'YKT Global',
        company: 'SyconX',
        technologies: ['React', 'TypeScript', 'Material-UI'],
        url: '#',
        image: '/project-images/project-web/YKTGlobal.jpg',
        description: 'Global ticaret ve lojistik platformu',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'meetlyme',
        name: 'MeetlyMe',
        company: 'SyconX',
        technologies: ['Vue.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/MeetlyMe.png',
        description: 'New web project', // Placeholder description
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'mehves',
        name: 'Mehves',
        company: 'SyconX',
        technologies: ['Vue.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/Mehves.png',
        description: 'New web project', // Placeholder description
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'perlei',
        name: 'Perlei',
        company: 'SyconX',
        technologies: ['Vue.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/Perlei.png',
        description: 'New web project', // Placeholder description
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'chargecrafter',
        name: 'CHARGECRAFTER',
        company: 'SyconX',
        technologies: ['Vue.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/CHARGECRAFTER.png',
        description: 'New web project', // Placeholder description
        category: 'frontend',
        type: 'corporate'
    },
    // CRM Projects
    {
        id: 'sanercrm',
        name: 'Saner CRM',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: 'https://crm.sanerkonutlari.com/',
        image: '/project-images/project-web/SanerCRM.jpeg',
        description: 'Müşteri ilişkileri yönetim sistemi',
        category: 'crm',
        type: 'crm'
    },
    // Backend Projects - Placeholder (user will add)
    // Mobile Projects - Placeholder (user will add)
    // MCP Projects - Placeholder (user will add)
];

// Helper function to get projects by category
export const getProjectsByCategory = (category: ProjectCategory): ProjectDetail[] => {
    return PROJECT_DETAILS.filter(project => project.category === category);
};
