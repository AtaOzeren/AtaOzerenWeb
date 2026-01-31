export type ProjectCategory = 'backend' | 'frontend' | 'mobile' | 'crm' | 'mcp';

export interface ProjectDetail {
    id: string;
    name: string;
    company: string;
    technologies: string[];
    url: string;
    image: string;
    description?: string;
    category: ProjectCategory | ProjectCategory[];
    type: 'corporate' | 'crm' | 'ecommerce' | 'mcp';
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
        description: 'projects.descriptions.erdemli',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'ege',
        name: 'Ege Mimarlık',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/EgeMimarlik.jpg',
        description: 'projects.descriptions.ege',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'eje',
        name: 'Eje Studio',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/EjeStudio.jpg',
        description: 'projects.descriptions.eje',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'delta',
        name: 'Delta Fidancılık',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/DeltaFidancilik.jpg',
        description: 'projects.descriptions.delta',
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
        description: 'projects.descriptions.saner',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'savuncell',
        name: 'Savuncell',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/Savuncell.jpg',
        description: 'projects.descriptions.savuncell',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'turanlar',
        name: 'Turanlar Holding',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/TuranlarHolding.jpg',
        description: 'projects.descriptions.turanlar',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'ykt',
        name: 'YKT Global',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/YKTGlobal.jpg',
        description: 'projects.descriptions.ykt',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'meetlyme',
        name: 'MeetlyMe',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/MeetlyMe.png',
        description: 'projects.descriptions.meetlyme',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'mehves',
        name: 'Mehves',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/Mehves.png',
        description: 'projects.descriptions.mehves',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'perlei',
        name: 'Perlei',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/Perlei.png',
        description: 'projects.descriptions.perlei',
        category: 'frontend',
        type: 'corporate'
    },
    {
        id: 'chargecrafter',
        name: 'CHARGECRAFTER',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/CHARGECRAFTER.png',
        description: 'projects.descriptions.chargecrafter',
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
        description: 'projects.descriptions.sanercrm',
        category: 'crm',
        type: 'crm'
    },
    // MCP Projects
    {
        id: 'meetlyme_mcp',
        name: 'MeetlyMe MCP',
        company: 'SyconX',
        technologies: ['Node.js', 'MCP Server'],
        url: '#',
        image: '/project-images/project-web/MeetlyMeMCP.png',
        description: 'projects.descriptions.meetlyme_mcp',
        category: ['mcp', 'backend'],
        type: 'mcp'
    },
    // Backend Projects
    {
        id: 'trivia_game_backend',
        name: 'Trivia Game Backend',
        company: 'SyconX',
        technologies: ['TypeScript', 'Cloudflare SQL', 'Node.js'],
        url: '#',
        image: '/project-images/project-web/trivia-game-backend.png',
        description: 'projects.descriptions.trivia_game_backend',
        category: 'backend',
        type: 'corporate'
    },
    // Mobile Projects - Placeholder (user will add)
    // MCP Projects - Placeholder (user will add)
];

// Helper function to get projects by category
export const getProjectsByCategory = (category: ProjectCategory): ProjectDetail[] => {
    return PROJECT_DETAILS.filter(project => {
        if (Array.isArray(project.category)) {
            return project.category.includes(category);
        }
        return project.category === category;
    });
};
