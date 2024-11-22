export const guestTypes = [
    {
        type: 'adults',
        title: 'Adults',
        description: 'Ages 13 or above',
        max: 16,
        min: 0,
    },
    {
        type: 'children',
        title: 'Children',
        description: 'Ages 2-12',
        max: 8,
        min: 0,
    },
    {
        type: 'infants',
        title: 'Infants',
        description: 'Under 2',
        max: 5,
        min: 0,
    },
    {
        type: 'pets',
        title: 'Pets',
        description: 'Service animals welcome',
        max: 5,
        min: 0,
    },
] as const;