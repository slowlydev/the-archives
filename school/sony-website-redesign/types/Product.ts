export interface ProductType {
	id: number;
	slug: string;
	name: string;
	price: number;
	marketingProductName: string;
	topFeatures: string[];
	image: ImageType;
}

export interface ImageType {
	src: string;
	alt: string;
}
