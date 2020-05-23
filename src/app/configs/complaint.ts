interface DimBuckets {
    min: number;
    max: number;
    label: string
}

export const Mis: Array<DimBuckets> = [
    {
        min: 0,
        max: 3,
        label: '3 MIS'
    },
    {
        min: 4,
        max: 12,
        label: '12 MIS'
    },
    {
        min: 13,
        max: 24,
        label: '24 MIS'
    },
    {
        min: 24,
        max: 36,
        label: '36 MIS'
    }
]

export const KmBuckets: Array<DimBuckets> = [
    {
        min: 0,
        max: 10000,
        label: '0-10,000 Km'
    },
    {
        min: 10000,
        max: 20000,
        label: '10,000-20,000 Km'
    },
    {
        min: 20000,
        max: 30000,
        label: '20,000-30,000 Km'
    },
    {
        min: 30000,
        max: 40000,
        label: '30,000-40,000 Km'
    },
    {
        min: 40000,
        max: 50000,
        label: '40,000-50,000 Km'
    },
    {
        min: 50000,
        max: 60000,
        label: '50,000-60,000 Km'
    },
    {
        min: 60000,
        max: 70000,
        label: '60,000-70,000 Km'
    },
    {
        min: 70000,
        max: 80000,
        label: '70,000-80,000 Km'
    },
    {
        min: 80000,
        max: 90000,
        label: '80,000-90,000 Km'
    },
    {
        min: 90000,
        max: 100000,
        label: '90,000-1,00,000 Km'
    }
];