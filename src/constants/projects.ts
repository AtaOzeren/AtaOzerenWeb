export interface ProjectDetail {
    id: string;
    name: string;
    company: string;
    technologies: string[];
    url: string;
    image: string;
    description?: string;
    type: 'corporate' | 'ecommerce' | 'crm';
}

export const PROJECT_DETAILS: ProjectDetail[] = [
    {
        id: 'sanercrm',
        name: 'Saner CRM',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: 'https://crm.sanerkonutlari.com/',
        image: '/project-images/project-web/SanerCRM.jpeg',
        description: 'Modern mimarlık hizmetleri sunan kurumsal web sitesi',
        type: 'crm'
    },
    {
        id: 'erdemli',
        name: 'Erdemli Mimarlık',
        company: 'SyconX',
        technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
        url: 'https://www.erdemlimimarlik.com/',
        image: '/project-images/project-web/ErdemliMimarlik.jpg',
        description: 'Modern mimarlık hizmetleri sunan kurumsal web sitesi',
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
        type: 'ecommerce'
    },
    {
        id: 'delta',
        name: 'Delta Fidancılık',
        company: 'SyconX',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        url: '#',
        image: '/project-images/project-web/DeltaFidancilik.jpg',
        description: 'Fidancılık ve peyzaj hizmetleri platformu',
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
        type: 'corporate'
    }
];
