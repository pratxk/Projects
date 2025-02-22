import { CloseButton, Flex, Link } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { CartProductMeta } from "./CartProductMeta";
import { PriceTag } from "./PriceTag";
import Quantity from "./Quantity";
import { deleteProduct, getProducts } from "../../Redux/Cart/action";


export const CartItem = props => {
	const { title, original_price, discounted_price, image_url, items, id } =
		props;

	const dispatch = useDispatch();

	const handleDelete = id => {
		dispatch(deleteProduct(id)).then(() => {
			dispatch(getProducts);
		});
	};

	return (
		<Flex
			direction={{
				base: "column",
				md: "row",
			}}
			align="center"
			w="100%"
			borderBottom={"1px solid lightgray"}
			pb={3}
		>
			<CartProductMeta
				name={title}
				image={image_url}
				original_price={original_price}
				discounted_price={discounted_price}
			/>

			{/* Desktop */}
			<Flex
				width="40%"
				gap={4}
				display={{
					base: "none",
					md: "flex",
				}}
			>
				<Quantity id={id} items={items} />
				<PriceTag price={discounted_price} />
				<CloseButton
					aria-label={`Delete ${title} from cart`}
					onClick={() => handleDelete(id)}
				/>
			</Flex>

			{/* Mobile */}
			<Flex
				mt="4"
				align="center"
				width="full"
				justify="space-between"
				display={{
					base: "flex",
					md: "none",
				}}
			>
				<Link fontSize="sm" textDecor="underline">
					Delete
				</Link>
				<PriceTag price={discounted_price} />
			</Flex>
		</Flex>
	);
};
