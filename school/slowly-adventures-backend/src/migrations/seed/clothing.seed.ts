type Clothing = {
    name: string;
    description: string,
    protection: number,
    rarityID: number;
}

export const clothings: Clothing[] = [
    {
        name: "Armour",
        description: "very basic armour wont protect u at all",
        protection: 10,
        rarityID: 1,
    },
    {
        name: "Robe",
        description: "Ware at all times because it looks good",
        protection: 50,
        rarityID: 3,
    },
    {
        name: "Legendary Garment",
        description: "its worn by the legendary hearo",
        protection: 100,
        rarityID: 5,
    },
    {
        name: "AIR FORCE 1",
        description: "its worn by every mf on earth",
        protection: 20,
        rarityID: 1,
    },
    {
        name: "Infinity Gauntlet",
        description: "only worn by the best of the best",
        protection: 200,
        rarityID: 10,
    },
    {
        name: "ApoRed Hoodie",
        description: "der aller echte",
        protection: 110,
        rarityID: 6,
    },
    {
        name: "Carlo Colucci knit sweater",
        description: "you have too much money",
        protection: 20,
        rarityID: 8,
    },
    {
        name: "Jordan 1",
        description: "you drippy",
        protection: 90,
        rarityID: 4,
    },
    {
        name: "Tommy Hilfiger sweatshirt",
        description: "ok, I guess",
        protection: 40,
        rarityID: 2,
    },
    {
        name: "Versace Jeans",
        description: "have you lost your mind, you have too much money",
        protection: 80,
        rarityID: 8,
    }
]
