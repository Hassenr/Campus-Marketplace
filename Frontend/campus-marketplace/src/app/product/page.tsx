import Card from "@/src/components/product/Card";


export default function Page() {
    return (
        <>
            <p>Products Page</p>
            <Card
                title="Sample Product"
                description="This is a sample product description."
                price={19.99}
                imageUrl="https://via.placeholder.com/300x180"
            />
        </>
    );
}