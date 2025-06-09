const companyColors = {
    'Alvo Segurança': {
        textColor: 'text-orange-700 dark:text-orange-400',
        bgColor: 'bg-orange-50 dark:bg-orange-900/30'
    },
    'Anjos da Guarda': {
        textColor: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-900/30'
    },
    'default': {
        textColor: 'text-gray-600 dark:text-gray-400',
        bgColor: 'bg-gray-50 dark:bg-gray-900/30'
    }
};
export function getCompanyColor(companyName) {
    return companyColors[companyName] || companyColors.default;
}
//# sourceMappingURL=companyColors.js.map