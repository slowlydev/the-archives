import styles from "./ProductsPage.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

import products from "../../lib/products.json";

import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";

export default function Page() {
	return (
		<div className={layoutStyles.main}>
			<h1>Products</h1>
			<p>{products.length} Produkte verfügbar</p>

			<div className={styles.productContainer}>
				{products.map((product) => (
					<ProductCard key={`page.product.${product.id}`} product={product} />
				))}
			</div>

			<Footer />
		</div>
	);
}
