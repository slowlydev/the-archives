type Ability = {
    name: string;
    staminaCoast: number;
    damage: number;
}

export const abilities: Ability[] = [
    {
        name: "Fire Ball",
        staminaCoast: 10,
        damage: 20,
    },
    {
        name: "Laser beam",
        staminaCoast: 100,
        damage: 100,
    },
    {
        name: 'Energy blast',
        staminaCoast: 200,
        damage: 320,
    },
    {
        name: 'Sonic scream',
        staminaCoast: 120,
        damage: 180,
    },
    {
        name: 'Wallcrawling',
        staminaCoast: 10,
        damage: 0,
    },
    {
        name: 'Power absorption',
        staminaCoast: 20,
        damage: 0,
    },
    {
        name: 'Matter manipulation',
        staminaCoast: 250,
        damage: 400,
    },
    {
        name: 'Ice blizzard',
        staminaCoast: 120,
        damage: 200,
    },
    {
        name: 'Fire strom',
        staminaCoast: 80,
        damage: 100,
    },
    {
        name: 'Power replication',
        staminaCoast: 140,
        damage: 160,
    }
]
