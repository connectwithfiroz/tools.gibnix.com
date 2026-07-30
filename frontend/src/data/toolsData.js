// src/data/toolsData.js
export const ALL_TOOLS = [
    {
    id: 'quote-estimate-builder',
    title: 'Client Quote & Estimate Builder',
    description: 'Create itemized client estimates, service quotes, and billing previews instantly without cloud uploads.',
    category: 'Finance',
    path: '/invoice/quote-estimate-builder',
    keywords: ['quote', 'estimate', 'invoice', 'billing', 'freelance', 'proposal', 'pdf', 'contractor'],
    isPopular: true
  },
  {
    id: 'attendance-gen',
    title: 'Attendance Sheet Generator',
    description: 'Quickly create and export attendance sheets for teams, employees, or classes.',
    category: 'HR & Work',
    path: '/attendance/generator',
    keywords: ['attendance', 'hr', 'sheet', 'work', 'log', 'employee'],
    isPopular: true
  },
  {
    id: 'electrical-invoice-gen',
    title: 'Electrical Invoice Generator',
    description: 'Generate itemized electrical estimates, job cards, and tax invoices.',
    category: 'Finance',
    path: '/invoice/electrical-invoice',
    keywords: ['invoice', 'electrical', 'billing', 'finance', 'estimate', 'tax'],
    isPopular: true
  },
  {
    id: 'pdf-merge',
    title: 'Merge PDF Files',
    description: 'Combine multiple PDF documents into a single organized file client-side.',
    category: 'PDF Tools',
    path: '/pdf/merge-pdf',
    keywords: ['pdf', 'merge', 'combine', 'documents'],
    isComingSoon: true
  },
  {
    id: 'pdf-arrange',
    title: 'Organize PDF Pages',
    description: 'Rotate, reorder, or delete specific pages from your PDF documents.',
    category: 'PDF Tools',
    path: '/pdf/arrange-pdf-page',
    keywords: ['pdf', 'arrange', 'reorder', 'rotate', 'delete'],
    isComingSoon: true
  }
];

export const CATEGORIES = ['All', 'HR & Work', 'Finance', 'PDF Tools'];